with open("./tmp/main_lock.html") as f:
    html = f.read()

import re
import json

ctx = re.search(r'Static\.SQUARESPACE_CONTEXT\s*=\s*(\{[\s\S]*?\});', html)
if ctx:
    try:
        data = json.loads(ctx.group(1))
        print("Crumb in context:", data.get("crumb"))
        print("collection:", data.get("collection", {}).get("urlId"))
    except Exception as e:
        print("JSON parse error:", e)

# Search password form action or script
scripts = re.findall(r'<script[^>]*>([\s\S]*?)</script>', html)
for s in scripts:
    if "password-form" in s or "password" in s:
        print("Found password script snippet:", s[:300])
