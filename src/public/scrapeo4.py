import requests
import csv
from bs4 import BeautifulSoup
page = requests.get('https://co.indeed.com/jobs?q=python&l=Cartagena%2C+Bol%C3%ADvar&from=searchOnHP&vjk=f43c700cced5dacd')
soup = BeautifulSoup(page.text, 'html.parser')
f = csv.writer(open('Trabajos', 'w'))
f.writerow(['Trabajo', 'Descripcion', 'Lugar', 'Fecha'])
job_seen_beacon_items = soup.find_all('mosaic-jobResults')
for job_seen_beacon in job_seen_beacon_items:
    Trabajo = job_seen_beacon.find(class_='resultContent').text
    Lugar = job_seen_beacon.find(class_='heading6 company_location tapItem-gutter companyInfo').text
    Descripcion = job_seen_beacon.find('li').text
    Fecha = job_seen_beacon.find(class_='date').text
    f.writerow([Trabajo, Lugar, Descripcion, Fecha])