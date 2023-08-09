import requests
from bs4 import BeautifulSoup
url = "https://co.computrabajo.com/"
params = {"A-Z": "Python, Java, Node", "l": "Colombia"}
response = requests.get(url, params=params)
if response.status_code == 200:
    soup = BeautifulSoup(response.text, "html.parser")
    jobs = soup.find_all("div", class_="jobsearch-SerpJobCard")
    for job in jobs:
        title = job.find("h2", class_="title").text.strip()
        company = job.find("span", class_="company").text.strip()
        location = job.find("div", class_="location").text.strip()
        summary = job.find("div", class_="summary").text.strip()
        print("Titulo: {title}")
        print("Empresa: {company}")
        print("Ubicación: {location}")
        print("Resumen: {summary}")
        print("-" * 80)
else:
    print(f"Error al hacer la petición: {response.status_code}")
