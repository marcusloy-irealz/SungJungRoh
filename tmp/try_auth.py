import urllib.request, json, http.cookiejar, re

cj = http.cookiejar.CookieJar()
opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cj))

url = "https://www.talktoroh.com/autonomousaiagents2026september-day1-lecture"
req1 = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
try: opener.open(req1)
except: pass

auth_url = "https://www.talktoroh.com/api/auth/visitor/collection"
payload = json.dumps({"password": "build-with-agents", "collectionId": "6ab4bb485b14c93f8cb42906"}).encode("utf-8")

# Attempt 1
auth_req1 = urllib.request.Request(
    auth_url,
    data=payload,
    headers={
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0",
        "Referer": url,
        "Origin": "https://www.talktoroh.com"
    }
)
resp1 = opener.open(auth_req1)
res1_data = json.loads(resp1.read().decode("utf-8"))
print("Res 1:", res1_data)

new_crumb = res1_data.get("crumb")
print("Using new crumb:", new_crumb)

# Update cookie jar crumb cookie
for c in cj:
    if c.name == "crumb":
        c.value = new_crumb

# Attempt 2 with new crumb in header and payload
auth_req2 = urllib.request.Request(
    auth_url,
    data=payload,
    headers={
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0",
        "Referer": url,
        "Origin": "https://www.talktoroh.com",
        "Crumb": new_crumb
    }
)
resp2 = opener.open(auth_req2)
res2_text = resp2.read().decode("utf-8")
print("Res 2:", resp2.status, res2_text)

# Check cookies
for c in cj:
    print("Cookie:", c.name, c.value[:20])

# Now fetch the lecture page
req_final = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0", "Referer": url})
resp_final = opener.open(req_final)
html = resp_final.read().decode("utf-8")
print("AUTHENTICATED PAGE LENGTH:", len(html))

with open("/tmp/fresh_downloaded_lecture.html", "w") as out:
    out.write(html)

print("Deck in fresh page?:", "class=\"deck\"" in html)
