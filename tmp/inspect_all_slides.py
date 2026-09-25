with open("/tmp/_autonomousaiagents2026september-day1-lecture.html") as f:
    html = f.read()

import re

# Find all slides
slides = re.findall(r'<section class="slide([^"]*)"[^>]*>([\s\S]*?)</section>', html)
print(f"Total slides found in /tmp/_autonomousaiagents2026september-day1-lecture.html: {len(slides)}")

for i, (cls, s_html) in enumerate(slides):
    # Extract headers
    h = re.findall(r'<h[1-6][^>]*>(.*?)</h[1-6]>', s_html)
    clean_h = [re.sub(r'<[^>]+>', ' ', x).strip() for x in h]
    # Extract prompt
    prompts = re.findall(r'<pre[^>]*class="[^"]*prompt[^"]*"[^>]*>([\s\S]*?)</pre>', s_html)
    # Extract callouts
    callouts = re.findall(r'<div[^>]*class="[^"]*bm-callout[^"]*"[^>]*>([\s\S]*?)</div>', s_html)
    print(f"Slide {i+1}: {' | '.join(clean_h[:2])}")
    if prompts:
        print(f"   [Prompt]: {prompts[0][:80]}...")
    if callouts:
        clean_c = re.sub(r'<[^>]+>', ' ', callouts[0]).strip()
        print(f"   [Callout]: {clean_c[:80]}...")
