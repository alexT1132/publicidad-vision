import requests

url = 'http://192.168.4.1/upload'
files = {'file': ('08.bin', open('tu_archivo.bin', 'rb'), 'application/octet-stream')}

print("Enviando al ventilador...")
response = requests.post(url, files=files)
print("Respuesta:", response.status_code, response.text)