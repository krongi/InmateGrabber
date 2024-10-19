import requests
import string
import os
import json
import time


CHAR_ARRAY = string.ascii_lowercase

# URL constants
BASE_URL = 'https://netapps.ocfl.net/BestJail/Home/Inmates#/'
INMATE_URL = 'https://netapps.ocfl.net/BestJail/Home/getInmates/'
INMATE_DETAIL_URL = 'https://netapps.ocfl.net/BestJail/Home/getInmateDetails/'

# HTML page building constants
HTML_START = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Image Gallery</title>
    <style>
        .image-gallery {
            display: flex;
            justify-content: space-around;
            align-items: center;
            margin: 20px;
        }

        .image-container {
            text-align: center;
            width: 30%;
        }

        .image-container img {
            width: 100%;
            height: auto;
            object-fit: cover;
        }

        .image-container h3 {
            margin: 10px 0;
        }
    </style>
</head>
<body>
"""
HTML_END = """
</body>
</html>
"""
NEW_GALLERY = """
<div class="image-gallery">
"""
IMAGE_CONTAINER = """
<div class="image-container">
"""
IMAGE_ELEMENT = """
<img src="data:image/png;base64,
"""
ALT_TEXT = """
" alt="Mug Shot">
"""

# Global lists for function use
json_list = []
json_single_list = []
inmate_detail_list = []
image_list = []

# Grab all returned results for each letter of the alphabet and dump them to a json file
def gather_json_list():
    for character in CHAR_ARRAY:
        response = requests.get(INMATE_URL + character)
        json_list.append(response.json())
    for letter in json_list:
        for entry in letter:
            if entry.get('inmateName') != "PRESENTENCED" and entry.get('inmateName') != "SENTENCED":
                json_single_list.append(entry)
    with open('general_inmate_info.json', 'w') as inmate_json_file:
        json.dump(json_single_list, inmate_json_file)

# Use the json file created previously to get the details of each entry and dump to another json file
def get_inmate_details(json_file_string = 'general_inmate_info.json'):
    with open(json_file_string, 'r') as json_file:
        json_vars = json.load(json_file)
    count = 0
    for entry in json_vars:
        inmate_detail = requests.get(INMATE_DETAIL_URL + str(entry.get('bookingNumber')))
        inmate_detail_list.append(inmate_detail.json())
        print(f'Current Entry: {count+1} of {len(json_vars)}')
        count += 1
    with open('detail_inmate_info.json', 'w') as json_file:
        json.dump(inmate_detail_list, json_file)

# Using the details json file, get 'NAME' and 'IMAGE' from each entry and create an HTML page to display them
def page_generator():
    start_time = time.localtime()
    long_string = HTML_START + '\n'
    with open('detail_inmate_info.json', 'r') as json_file:
        json_vars = json.load(json_file)
        left = len(json_vars)
        tracker = 0
        for entry in json_vars:
            if tracker == 0:
                # long_string = long_string + NEW_GALLERY
                long_string += NEW_GALLERY
            div_head = IMAGE_CONTAINER + f"""<h1>{entry[0].get('NAME')}</h1>"""
            image_src_string = IMAGE_ELEMENT + entry[0].get('IMAGE').replace('"', '') + ALT_TEXT
            div_tail = """</div>\n"""
            # long_string = long_string + div_head + '\n' + image_src_string + '\n' + div_tail + '\n'
            long_string += div_head + '\n' + image_src_string + '\n' + div_tail + '\n'
            if tracker == 2:
                end_gallery = """</div> \n"""
                # long_string = long_string + end_gallery 
                long_string += end_gallery 
            temp_time = time.localtime()
            if tracker == 2:
                tracker = 0
                was_two = True
            else:
                tracker += 1
                was_two = False
            left -= 1
            if left == 0 and was_two != True:
                # long_string = long_string + """</div>"""
                long_string += """</div>"""
            print(f'Elapsed time: {temp_time.tm_hour - start_time.tm_hour} Hours, {temp_time.tm_min - start_time.tm_min} Minutes and {abs(temp_time.tm_sec - start_time.tm_sec)} Seconds\n')
    # long_string = long_string + HTML_END
    long_string += HTML_END
    with open('another_test.html', 'w') as html_file:
        html_file.write(long_string)
    end_time = time.localtime()
    print(f'Total time run: {end_time.tm_hour - start_time.tm_hour} Hours, {end_time.tm_min - start_time.tm_min} Minutes and {abs(end_time.tm_sec - start_time.tm_sec)} Seconds')

# gather_json_list()
# get_inmate_details()
page_generator()
