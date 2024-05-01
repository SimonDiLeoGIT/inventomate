## Como usar la api
Antes para probar la api debemos configurar un entorno virtual python, y instalar con pip flask

```pip install flask```

Luego ejecutamos la api con el siguiente comando

```python apiInformes.py```

### Para pegarle al endpoint de informeTendencias 

```curl -X POST -H "Content-Type: application/json" -d "@valoresCompletos.json" http://127.0.0.1:5000/informeTendencias```

*los json dentro de esta carpeta fueron utilizados para pruebas*
