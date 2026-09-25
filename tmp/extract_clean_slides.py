with open("/tmp/_autonomousaiagents2026september-day1-lecture.html") as f:
    html = f.read()

import re

# Match class with 'slide' as a full word, not followed by hyphen
pattern = r'<div[^>]*class=["\'](?:[^"\']*\s)?slide(?:\s[^"\']*)?["\'][^>]*>'
matches = list(re.finditer(pattern, html))
print("Matched slides count:", len(matches))

slides_list = []
for i, m in enumerate(matches):
    tag = m.group(0)
    title_m = re.search(r'data-title=["\']([^"\']+)["\']', tag)
    sec_m = re.search(r'data-section=["\']([^"\']+)["\']', tag)
    takeaway_m = re.search(r'data-takeaway=["\']([^"\']+)["\']', tag)
    
    t = title_m.group(1) if title_m else ("Cover Slide" if i == 0 else "End Slide")
    s = sec_m.group(1) if sec_m else ""
    tk = takeaway_m.group(1) if takeaway_m else ""
    
    # Get the slide content until next slide
    start_pos = m.start()
    end_pos = matches[i+1].start() if i+1 < len(matches) else html.find('</div>\n<!-- .deck -->', start_pos)
    if end_pos == -1:
        end_pos = start_pos + 10000
    chunk = html[start_pos:end_pos]
    
    # prompts
    prompts = re.findall(r'<pre[^>]*class="[^"]*prompt[^"]*"[^>]*>([\s\S]*?)</pre>', chunk)
    clean_prompts = [re.sub(r'<button[\s\S]*?</button>', '', p).strip() for p in prompts]
    clean_prompts = [re.sub(r'<[^>]+>', '', p).strip() for p in clean_prompts]
    
    # codes
    codes = re.findall(r'<pre[^>]*class="[^"]*bm-code[^"]*"[^>]*>([\s\S]*?)</pre>', chunk)
    clean_codes = [re.sub(r'<[^>]+>', '', c).strip() for c in codes]

    # callouts
    callouts = re.findall(r'<div[^>]*class="[^"]*bm-callout[^"]*"[^>]*>([\s\S]*?)</div>', chunk)
    clean_callouts = [re.sub(r'<[^>]+>', ' ', c).strip() for c in callouts]

    slides_list.append({
        "slideNumber": i + 1,
        "title": t,
        "section": s,
        "takeaway": tk,
        "prompts": clean_prompts,
        "codes": clean_codes,
        "callouts": clean_callouts,
        "rawChunk": chunk.strip()
    })
    print(f"Slide #{i+1}: {t} (takeaway len: {len(tk)}, prompts: {len(clean_prompts)}, codes: {len(clean_codes)})")

import json
with open("./src/slidesDetailData.ts", "w") as out:
    out.write("// Complete parsed detailed curriculum & takeaway notes for all 33 slides\n")
    out.write("export interface SlideDetail {\n")
    out.write("  slideNumber: number;\n")
    out.write("  section: string;\n")
    out.write("  title: string;\n")
    out.write("  takeaway: string;\n")
    out.write("  prompts: string[];\n")
    out.write("  codes: string[];\n")
    out.write("  callouts: string[];\n")
    out.write("  rawChunk: string;\n")
    out.write("}\n\n")
    out.write("export const slidesDetailList: SlideDetail[] = " + json.dumps(slides_list, indent=2) + ";\n")

print(f"Successfully generated src/slidesDetailData.ts with {len(slides_list)} slides!")
