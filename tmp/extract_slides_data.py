with open("/tmp/_autonomousaiagents2026september-day1-lecture.html") as f:
    html = f.read()

import re
import json

# Find the deck container
deck_m = re.search(r'<div class="deck"[^>]*>([\s\S]*?)</div>\s*<!-- \.deck -->', html)
if not deck_m:
    deck_m = re.search(r'<div class="deck"[^>]*>([\s\S]*?)</div>\s*<script', html)

deck_inner = deck_m.group(1) if deck_m else ""

# Regex to find all <div class="slide ...">...</div>
# Because slides are sibling divs inside .deck, let us split or find each slide
# Slides start with <div class="slide
slide_starts = [m.start() for m in re.finditer(r'<div class="slide\b', deck_inner)]
print("Found slide start positions:", len(slide_starts))

slides_data = []

for idx, start in enumerate(slide_starts):
    end = slide_starts[idx + 1] if idx + 1 < len(slide_starts) else len(deck_inner)
    s_chunk = deck_inner[start:end]
    # clean trailing closing tags for previous slides if any
    # extract attributes from opening tag
    open_tag_m = re.match(r'<div class="slide([^"]*)"([^>]*)>', s_chunk)
    cls_extra = open_tag_m.group(1) if open_tag_m else ""
    attrs = open_tag_m.group(2) if open_tag_m else ""
    
    # extract data-section, data-title, data-takeaway
    sec_m = re.search(r'data-section="([^"]*)"', attrs)
    title_m = re.search(r'data-title="([^"]*)"', attrs)
    takeaway_m = re.search(r'data-takeaway="([^"]*)"', attrs)
    
    sec = sec_m.group(1) if sec_m else ""
    title = title_m.group(1) if title_m else ""
    takeaway = takeaway_m.group(1) if takeaway_m else ""
    
    # If title is empty, check for h1 or h2
    if not title:
        h1 = re.search(r'<h1[^>]*>([\s\S]*?)</h1>', s_chunk)
        if h1:
            title = re.sub(r'<[^>]+>', ' ', h1.group(1)).strip()
        else:
            h2 = re.search(r'<h2[^>]*>([\s\S]*?)</h2>', s_chunk)
            if h2:
                title = re.sub(r'<[^>]+>', ' ', h2.group(1)).strip()
            else:
                title = f"Slide {idx + 1}"
                
    # Extract subtitle
    sub_m = re.search(r'<div class="subtitle">([\s\S]*?)</div>', s_chunk)
    subtitle = re.sub(r'<[^>]+>', ' ', sub_m.group(1)).strip() if sub_m else ""
    
    # Extract prompt
    prompts = re.findall(r'<pre[^>]*class="[^"]*prompt[^"]*"[^>]*>([\s\S]*?)</pre>', s_chunk)
    clean_prompts = [re.sub(r'<button[\s\S]*?</button>', '', p).strip() for p in prompts]
    clean_prompts = [re.sub(r'<[^>]+>', '', p).strip() for p in clean_prompts]
    
    # Extract code
    codes = re.findall(r'<pre[^>]*class="[^"]*bm-code[^"]*"[^>]*>([\s\S]*?)</pre>', s_chunk)
    clean_codes = [re.sub(r'<[^>]+>', '', c).strip() for c in codes]
    
    # Extract callouts
    callouts = re.findall(r'<div[^>]*class="[^"]*bm-callout[^"]*"[^>]*>([\s\S]*?)</div>', s_chunk)
    clean_callouts = [re.sub(r'<[^>]+>', ' ', c).strip() for c in callouts]
    
    # Extract inner body HTML
    body_m = re.search(r'<div class="slide-body">([\s\S]*?)</div>\s*</div>', s_chunk)
    body_html = body_m.group(1) if body_m else ""
    
    slides_data.append({
        "slideNumber": idx + 1,
        "section": sec,
        "title": title,
        "subtitle": subtitle,
        "takeaway": takeaway,
        "prompts": clean_prompts,
        "codes": clean_codes,
        "callouts": clean_callouts,
        "rawChunk": s_chunk.strip()
    })

print(f"Extracted {len(slides_data)} slides successfully!")
for s in slides_data[:5]:
    print(f"#{s['slideNumber']}: {s['title']} (sec: {s['section']})")
    print(f"   Takeaway: {s['takeaway'][:90]}...")

with open("./src/slidesDetailData.ts", "w") as out:
    out.write("// Complete parsed detailed curriculum & takeaway notes for all 33 slides\n")
    out.write("export interface SlideDetail {\n")
    out.write("  slideNumber: number;\n")
    out.write("  section: string;\n")
    out.write("  title: string;\n")
    out.write("  subtitle: string;\n")
    out.write("  takeaway: string;\n")
    out.write("  prompts: string[];\n")
    out.write("  codes: string[];\n")
    out.write("  callouts: string[];\n")
    out.write("  rawChunk: string;\n")
    out.write("}\n\n")
    out.write("export const slidesDetailList: SlideDetail[] = " + json.dumps(slides_data, indent=2) + ";\n")

print("Created src/slidesDetailData.ts successfully!")
