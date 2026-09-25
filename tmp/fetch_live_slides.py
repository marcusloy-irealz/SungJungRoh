import urllib.request
import json
import http.cookiejar
import re

cj = http.cookiejar.CookieJar()
opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cj))

url = "https://www.talktoroh.com/autonomousaiagents2026september-day1-lecture"
req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
try:
    resp = opener.open(req)
    html = resp.read().decode("utf-8", errors="ignore")
except urllib.error.HTTPError as e:
    html = e.read().decode("utf-8", errors="ignore")

body_id_m = re.search(r'<body[^>]*id="([^"]+)"', html)
body_id = body_id_m.group(1) if body_id_m else ""
print("Body ID:", body_id)

auth_url = f"https://www.talktoroh.com/api/auth/visitor/collection"
collection_id = body_id.split("collection-")[1]

# Step 1: get the crumb by making initial request or from cookie/resp
auth_req1 = urllib.request.Request(
    auth_url,
    data=json.dumps({"password": "build-with-agents", "collectionId": collection_id}).encode("utf-8"),
    headers={
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0",
        "Referer": url,
        "Origin": "https://www.talktoroh.com"
    }
)

auth_resp1 = opener.open(auth_req1)
auth_data1 = json.loads(auth_resp1.read().decode("utf-8", errors="ignore"))
print("First auth response:", auth_data1)

crumb = auth_data1.get("crumb")
print("Retrieved valid crumb:", crumb)

# Step 2: authenticate with the valid crumb
auth_req2 = urllib.request.Request(
    auth_url,
    data=json.dumps({"password": "build-with-agents", "collectionId": collection_id, "crumb": crumb}).encode("utf-8"),
    headers={
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0",
        "Referer": url,
        "Origin": "https://www.talktoroh.com",
        "Crumb": crumb
    }
)

auth_resp2 = opener.open(auth_req2)
auth_data2 = auth_resp2.read().decode("utf-8", errors="ignore")
print("Second auth response:", auth_data2)

# Step 3: Fetch the authenticated lecture page!
get_req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0", "Referer": url})
get_resp = opener.open(get_req)
fresh_html = get_resp.read().decode("utf-8", errors="ignore")
print("FRESH DOWNLOAD SUCCESS! Length:", len(fresh_html))

with open("/tmp/fresh_downloaded_lecture.html", "w") as out:
    out.write(fresh_html)

print("Saved to /tmp/fresh_downloaded_lecture.html")
print("Has 'deck'?:", 'class="deck"' in fresh_html)
print("Has 'password-form'?:", 'password-form' in fresh_html)
