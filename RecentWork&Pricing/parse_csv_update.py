import csv
import json

csv_path = "Website list - Sheet1 (1).csv"

retailers = []

with open(csv_path, 'r', encoding='utf-8') as f:
    reader = csv.reader(f)
    # Skip header rows (assuming first 2 rows are headers/empty based on the view)
    # Line 1: id,url,platform,img,url
    # Line 2: ,,,,
    # Line 3: 1,Hamilton's...
    
    rows = list(reader)
    
    # Process from index 2 (line 3)
    for row in rows[2:]:
        if not row or not row[0]: continue
        
        # Row format: id, name, platform, image_url, website_url
        # Be careful about column indices. 
        # Line 1 says: id,url,platform,img,url 
        # But row 3 content is: 1,Hamilton's Jewelry,Custom,https://...,https://...
        # So:
        # 0: id
        # 1: name (labelled 'url' in header? weird)
        # 2: platform
        # 3: img
        # 4: url
        
        try:
            item = {
                "id": int(row[0]),
                "name": row[1].strip(),
                "platform": row[2].strip(),
                "image": row[3].strip(),
                "url": row[4].strip()
            }
            retailers.append(item)
        except ValueError:
            print(f"Skipping invalid row: {row}")

# Sort by ID just in case, though the file seems sorted
retailers.sort(key=lambda x: x['id'])

# Output JS format
print("const BASE_RETAILERS = [")
for i, item in enumerate(retailers):
    comma = "," if i < len(retailers) - 1 else ""
    # Format nicely
    print(f"    {{ id: {item['id']}, name: \"{item['name']}\", platform: \"{item['platform']}\", image: \"{item['image']}\", url: \"{item['url']}\" }}{comma}")
print("];")
