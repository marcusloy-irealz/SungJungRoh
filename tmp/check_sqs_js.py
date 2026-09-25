import urllib.request
import re

url = "https://assets.squarespace.com/universal/scripts-compressed/common-7ceb7520c0c9006a-min.en-US.js"
resp = urllib.request.urlopen(url)
js = resp.read().decode("utf-8", errors="ignore")

# Find password-form handlers
matches = re.findall(r'password-form[\s\S]{1,500}', js)
for m in matches[:5]:
    print("Match:", m[:300])
    print("---")
