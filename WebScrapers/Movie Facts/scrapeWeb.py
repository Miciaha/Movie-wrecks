import requests
import json
from bs4 import BeautifulSoup

URL = 'https://www.boredpanda.com/interesting-movie-facts/'
page = requests.get(URL)

soup = BeautifulSoup(page.content, 'html.parser')

results = soup.find(class_='post-content')

fact_cards = results.find_all('div', class_='open-list-item open-list-block clearfix')


for fact in fact_cards:
    title = fact.find('div', class_='open-list-header').find('h2').text.strip()
    trivia = fact.find('div', class_='post-content-description submission-description').find('div', class_='bordered-description').find('p').text.strip()
    image = fact.find('div', class_='shareable-post-image').find('p', class_='open-list-media-container').find('span', class_='shareable-image-block')

    index = fact_cards.index(fact)
    data = {}

    try:
        image = image.find('img')['src']
    except:
        image = image.find('img')['data-src']

    data['_id'] = str(index)
    data['title'] = title
    data['trivia'] = trivia
    data['image'] = image

    name = "trivia" + str(index) +".json"

    with open(name, 'w') as outfile:
        json.dump(data, outfile)