import json

import bs4

f = open("raw_unit_data.html")
html = f.read()

soup = bs4.BeautifulSoup(html, "html5lib")

unit_map = {}

for a in soup.find_all('li'):
    unit_string = a.text

    unit_name = unit_string[0:7]
    unit_desc = unit_string[7:]

    unit_map[unit_name] = unit_desc


with open("monash_units.json", 'w') as file_out:
    json.dump(unit_map, file_out)