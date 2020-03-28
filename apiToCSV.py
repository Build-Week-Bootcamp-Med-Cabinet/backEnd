import numpy as np
import pandas as pd
import requests
import json

url = "https://api.otreeba.com/v1/strains?page=1&count=50&sort=-createdAt"
JSONContent = requests.get(url).json()
content = json.dumps(JSONContent, indent=4, sort_keys=True)
print(content)

strains = ["chirag"]

strain_list = []

for strain in strains:
    JSONContent = requests.get(
        "https: // api.otreeba.com/v1/strains?page=1 & count=50 & sort=-createdAt"+strain).json()
    if 'error' not in JSONContent:
        strain_list.append([JSONContent['data.name']])

dataset = pd.DataFrame(strain_list)
dataset.columns = ["Name"]
dataset.dropna(axis=0, how='any', inplace=True)
dataset.index = pd.RangeIndex(len(dataset.index))

dataset.to_csv('dataset.csv', True)
