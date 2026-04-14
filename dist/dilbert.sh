#!/bin/sh

python3 -c "
import urllib.request
import xml.etree.ElementTree as ET
import json
import re
import os

SAVE_DIR = '/config/www/community/dilbert-card-ha/'
# Source RSS feed for Dilbert. If the RSS URL changes, check https://www.comicsrss.com/ for the latest feed.
RSS_URL = 'https://www.comicsrss.com/rss/dilbert.rss'
IMAGE_FILE = os.path.join(SAVE_DIR, 'dilbert.png')
JSON_FILE = os.path.join(SAVE_DIR, 'dilbert_data.json')

try:
    if not os.path.exists(SAVE_DIR):
        os.makedirs(SAVE_DIR, exist_ok=True)
        
    req = urllib.request.Request(RSS_URL, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as response:
        xml_data = response.read()
        
    root = ET.fromstring(xml_data)
    # The first item is usually the latest
    item = root.find('.//item')
    if item is None:
        raise ValueError('No item found in RSS feed')
        
    title = item.findtext('title', '')
    description = item.findtext('description', '')
    
    # Extract image URL from description
    match = re.search(r'src=\"([^\"]+)\"', description)
    if not match:
        raise ValueError('No image URL found in description')
        
    image_url = match.group(1)
    
    # Download the image
    img_req = urllib.request.Request(image_url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(img_req) as response, open(IMAGE_FILE, 'wb') as out_file:
        out_file.write(response.read())
        
    # Write JSON data
    data = {
        'image_url': IMAGE_FILE,
        'title': title,
        'alt_text': title
    }
    with open(JSON_FILE, 'w') as f:
        json.dump(data, f, indent=2)
        
    print(f'Successfully downloaded image to {IMAGE_FILE}')
    print(f'Successfully wrote JSON to {JSON_FILE}')
    
except Exception as e:
    print(f'Error: {e}')
    exit(1)
"
