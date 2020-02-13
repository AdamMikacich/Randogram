import random, re, requests, string 
from PIL import Image
from io import BytesIO
import montage

def random_url():
    url_root = 'http://www.prnt.sc/'
    random_suffix = random.choice(string.digits) + ''.join(random.choice(string.ascii_lowercase + string.digits) for _ in range(5))
    # random_suffix = 'aabc10'
    return url_root + random_suffix

def random_img():
    headers = {
        'User-Agent': 'Fake User Agent', 
        'From': 'fake@gmail.com'
    }
    while True:
        url = random_url()
        page = requests.get(url, headers=headers)
        matches = re.findall(r'https:\/\/i\.imgur\.com\/[a-zA-Z0-9_]*\.(?:jpg|png)', page.text)
        if len(matches) != 0: return matches[0]

def random_montage(number_of_imgs=100, path='./images/MONTAGE.png'):
    mont = montage.Montage()
    for i in range(number_of_imgs):
        img_url = random_img()
        print('({0:0=2d}/{1})'.format(i, number_of_imgs), img_url)
        img = Image.open(BytesIO(requests.get(img_url).content))
        mont += img
    mont.generate_img().save(path, 'PNG')

for i in range(10):
    print('\n> MONTAGE #{0}'.format(i+1))
    random_montage(path='./images/MONTAGE{0}.png'.format(i))

print("END")