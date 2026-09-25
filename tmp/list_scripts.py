with open("./tmp/main_lock.html") as f:
    html = f.read()

import re
scripts = re.findall(r'<script[^>]*src=["\']([^"\']+)["\']', html)
for s in scripts:
    print("Script src:", s)
