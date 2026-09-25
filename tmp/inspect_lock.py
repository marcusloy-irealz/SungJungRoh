import urllib.request
import urllib.parse
import http.cookiejar

cj = http.cookiejar.CookieJar()
opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cj))

# First open talktoroh.com main password page
main_url = "https://www.talktoroh.com/autonomousaiagents2026september"
try:
    resp = opener.open(urllib.request.Request(main_url, headers={"User-Agent": "Mozilla/5.0"}))
    html = resp.read().decode("utf-8", errors="ignore")
except urllib.error.HTTPError as e:
    html = e.read().decode("utf-8", errors="ignore")

print("Main page length:", len(html))
with open("./tmp/main_lock.html", "w") as f:
    f.write(html)
