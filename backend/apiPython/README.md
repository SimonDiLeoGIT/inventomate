# Como usar la api LINUX

Para probar API debemos configurar un entorno virtual python e instalar:

```pip install requirements.txt```

Luego se debe ejecutar la API con el siguiente comando:

```python run.py```

### Para pegarle al endpoint de informeTendencias hay que utilizar el comando

```curl -X POST -H "Content-Type: application/json" -d "@valoresCompletos.json" http://127.0.0.1:5000/informeTendencias```

*los .json dentro de esta carpeta fueron utilizados para pruebas*

# Como usar la api WINDOWS

para esto primero debemos:

clonar el proyecto

tener instalado visual studio code

tener instalado python

tener instalado pip

tener instalado requirements.txt

una vez teniendo todo instalado, tiran el siguiente comando

Invoke-WebRequest -Uri "<http://127.0.0.1:5000/informeTendencias>" -Method POST -ContentType "application/json" -InFile "valoresCompletos.json"

de esa manera pasas el json a la api
