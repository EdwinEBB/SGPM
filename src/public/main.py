import requests
from flask import Flask, render_template, request, redirect,jsonify

app = Flask(__name__)
node_server_uri="http://localhost:8000"

API_KEY = open('./Current/API_KEY').read()
SEARCH_ENGINE_ID = open('./Current/SEARCH_ENGINE_ID').read()

# Variable global para almacenar enlaces de trabajos
job_links = []

def search_jobs(query, update=False):
    global job_links

    # Palabras clave adicionales para buscar ofertas de trabajo
    job_keywords = ["trabajo", "empleo", "oferta laboral", "vacante"]

    # Agregar las palabras clave a la consulta de búsqueda
    query_with_keywords = f"{query} {' '.join(job_keywords)}"

    url = 'https://www.googleapis.com/customsearch/v1'
    params = {
        'q': query_with_keywords,
        'key': API_KEY,
        'cx': SEARCH_ENGINE_ID
    }

    response = requests.get(url, params=params)
    results = response.json()

    if 'items' in results:
        # Obtener todos los enlaces de los resultados
        job_links = [item['link'] for item in results['items']]
    else:
        job_links = []

    if update:
        return job_links
    else:
        return render_template('index.html', search_query=query, job_links=job_links)

@app.route('/')
def index():
    return render_template('index.html')

        
    
@app.route('/patra', methods=['GET'])
def patra():
    response=requests.get(f'{node_server_uri}/inicio')
    return redirect(f'{node_server_uri}/inicio',code=302)

@app.route('/search', methods=['POST'])
def search():
    search_query = request.form['search_query']
    return search_jobs(search_query)

@app.route('/update', methods=['POST'])
def update():
    search_query = request.form['search_query']
    updated_job_links = search_jobs(search_query, update=True)

    return render_template('index.html', search_query=search_query, job_links=updated_job_links)

if __name__ == '__main__':
    app.run(debug=True)

