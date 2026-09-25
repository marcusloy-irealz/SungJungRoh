with open("./tmp/main_lock.html") as f:
    html = f.read()

import re

# Look for JavaScript in lock page that handles form submission
scripts = re.findall(r'<script[^>]*>([\s\S]*?)</script>', html)
for s in scripts:
    if "password" in s.lower() and ("submit" in s.lower() or "fetch" in s.lower() or "xhr" in s.lower() or "post" in s.lower()):
        print("Found relevant script block:")
        print(s[:500])

# Look for form action
forms = re.findall(r'<form[^>]*>', html)
print("Forms found:", forms)
