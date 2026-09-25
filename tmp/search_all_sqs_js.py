import urllib.request
import re

scripts = [
    "https://assets.squarespace.com/universal/scripts-compressed/extract-css-runtime-c2446fcf212a3a59-min.en-US.js",
    "https://assets.squarespace.com/universal/scripts-compressed/common-vendors-stable-784b947826b4c445-min.en-US.js",
    "https://assets.squarespace.com/universal/scripts-compressed/common-vendors-dcb434e136ef2df4-min.en-US.js",
    "https://assets.squarespace.com/universal/scripts-compressed/common-7ceb7520c0c9006a-min.en-US.js",
    "https://assets.squarespace.com/universal/scripts-compressed/slides-d8af0b08b25b970a-min.en-US.js"
]

for s in scripts:
    try:
        resp = urllib.request.urlopen(s)
        js = resp.read().decode("utf-8", errors="ignore")
        if "password-form" in js:
            print("FOUND password-form in:", s)
            for m in re.findall(r'password-form[\s\S]{1,400}', js):
                print("Snippet:", m[:250])
    except Exception as e:
        print("Error on", s, e)
