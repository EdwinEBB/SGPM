import requests
from bs4 import BeautifulSoup

def extraer_ofertas_empleo(palabra_clave, ubicacion):
    url = f'https://www.computrabajo.com.co/empleos-de-{palabra_clave}-en-{ubicacion}'
    response = requests.get(url)
    content = response.text

    soup = BeautifulSoup(content, 'html.parser')

    ofertas = soup.find_all('div', class_='iO')

    for oferta in ofertas:
        titulo = oferta.find('h2').text.strip()
        empresa = oferta.find('h3').text.strip()
        ubicacion = oferta.find('span', class_='loc').text.strip()
        descripcion = oferta.find('p', class_='puesto').text.strip()

        print(f'Título: {titulo}')
        print(f'Empresa: {empresa}')
        print(f'Ubicación: {ubicacion}')
        print(f'Descripción: {descripcion}')
        print('---')
        
palabra_clave = 'python'
ubicacion = 'colombia'
extraer_ofertas_empleo(palabra_clave, ubicacion)
