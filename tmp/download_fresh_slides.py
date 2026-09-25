import urllib.request
import urllib.parse
import http.cookiejar
import re

cj = http.cookiejar.CookieJar()
opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cj))

lecture_url = "https://www.talktoroh.com/autonomousaiagents2026september-day1-lecture"
req = urllib.request.Request(lecture_url, headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"})

crumb = ""
try:
    resp = opener.open(req)
    html = resp.read().decode("utf-8", errors="ignore")
except urllib.error.HTTPError as e:
    html = e.read().decode("utf-8", errors="ignore")

m = re.search(r'name=["\']crumb["\'] value=["\']([^"\']+)["\']', html)
if m:
    crumb = m.group(1)
print("Found crumb:", crumb)

# Post password to unlock
data = urllib.parse.urlencode({"password": "build-with-agents", "crumb": crumb}).encode("utf-8")
post_req = urllib.request.Request(
    lecture_url,
    data=data,
    headers={
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Referer": lecture_url,
        "Origin": "https://www.talktoroh.com",
        "Content-Type": "application/x-www-form-urlencoded"
    }
)

resp2 = opener.open(post_req)
unlocked_html = resp2.read().decode("utf-8", errors="ignore")
print("Unlocked HTML status:", resp2.status, "Length:", len(unlocked_html))

with open("/tmp/fresh_lecture.html", "w") as f:
    f.write(unlocked_html)

print("Is password prompt in unlocked HTML?:", "password-form" in unlocked_html or "Enter Password" in unlocked_html)
