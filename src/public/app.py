from flask import Flask, render_template, request, jsonify,redirect
import requests
from googlesearch import search

app = Flask(__name__)
node_server_uri="http://localhost:8000"



@app.route('/')
def index():
    return render_template('index.html')


@app.route('/patra')
def patra():
    response= requests.get(f'{node_server_uri}/inicio')
    
    return redirect(f'{node_server_uri}/inicio',code=response.status_code)


@app.route('/search', methods=['POST'])
def search_results():
    query = request.form['query']
    job_keywords = ['empleo', 'oferta de trabajo', 'trabajo']

    results = []
    for result in search(query, start=0, pause=2):
        if any(keyword in result.lower() for keyword in job_keywords):
            results.append(result)

    return render_template('results.html', query=query, results=results)

if __name__ == '__main__':
    app.run(debug=True)