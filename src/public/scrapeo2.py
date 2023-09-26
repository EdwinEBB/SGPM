import requests
from json.decoder import JSONDecodeError

def extraer_ofertas_empleo(lenguaje, ubicacion):
    url = f'https://jobs.github.com/positions.json?description={lenguaje}&location={ubicacion}'
    try:
        response = requests.get(url)
        response.raise_for_status()
        ofertas = response.json()

        for oferta in ofertas:
            titulo = oferta['title']
            empresa = oferta['company']
            ubicacion = oferta['location']
            descripcion = oferta['description']
            print(f'Título: {titulo}')
            print(f'Empresa: {empresa}')
            print(f'Ubicación: {ubicacion}')
            print(f'Descripción: {descripcion}')
            print('---')

    except (requests.exceptions.RequestException, JSONDecodeError) as e:
        print(f'Error: {e}')

lenguaje = 'python'
ubicacion = 'colombia'
extraer_ofertas_empleo(lenguaje, ubicacion)
