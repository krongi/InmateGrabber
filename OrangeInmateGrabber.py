import requests
import string
import os
import json
from time import sleep

INMATE_URL = 'https://netapps.ocfl.net/BestJail/Home/getInmates/'
INMATE_DETAIL_URL = 'https://netapps.ocfl.net/BestJail/Home/getInmateDetails/'
CHAR_ARRAY = string.ascii_lowercase

HTML_BEGIN = """
<!DOCTYPE html>
<html lang="en-US">
<head>          
</head>
<body>
"""

HTML_END = """
</body>
</html>
"""
json_list = []
json_single_list = []
inmate_detail_list = []
image_list = []

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

# def get_inmate_images(json_file_string = 'detail_inmate_info.json'):
#     with open(json_file_string, 'r') as json_file:
#         json_vars = json.load(json_file)
#     for entry in json_vars:
#         image_list.append(entry.get('IMAGE'))

def page_generator():
    long_string = HTML_BEGIN + '\n'
    with open('detail_inmate_info.json', 'r') as json_file:
        json_vars = json.load(json_file)
        for entry in json_vars:
            head_string = f'<h1>{entry[0].get('NAME')}</h1>'
            for_string = f'<img src="{entry[0].get('IMAGE')}">'
            long_string = long_string + head_string + '/n' + for_string + '\n'
    long_string = long_string + HTML_END
    with open('long_html.html', 'w') as html_file:
        html_file.write(long_string)

# gather_json_list()
# get_inmate_details('general_inmate_info.json')
# page_generator('detail_inmate_info.json')