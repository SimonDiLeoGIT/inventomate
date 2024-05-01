# Como usar la api

Para probar API debemos configurar un entorno virtual python e instalar con flask con pip utilizando el siguiente comando:

```pip install flask```

Luego se debe ejecutar la API con el siguiente comando:

```python apiInformes.py```

### Para pegarle al endpoint de informeTendencias hay que utilizar el comando:

```curl -X POST -H "Content-Type: application/json" -d "@valoresCompletos.json" http://127.0.0.1:5000/informeTendencias```

*los json dentro de esta carpeta fueron utilizados para pruebas*
