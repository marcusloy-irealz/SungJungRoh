import urllib.request
import re

url = "https://assets.squarespace.com/universal/scripts-compressed/slides-d8af0b08b25b970a-min.en-US.js"
resp = urllib.request.urlopen(url)
js = resp.read().decode("utf-8", errors="ignore")

idx = js.find("_authenticate:function()")
if idx != -1:
    print(js[idx : idx + 1200])
