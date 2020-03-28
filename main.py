import requests

params = {
    "format": "csv"
}

r = requests.get(
    "https://api.otreeba.com/v1/strains?page=1&count=50&sort=-createdAt", params=params)

print(r.text)
with open('dataset.csv', 'w+') as f:
    f.write(r.text)
