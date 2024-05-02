# Como usar la api

Para probar API debemos configurar un entorno virtual python e instalar con flask con pip utilizando el siguiente comando:

```pip install flask```

Para correr las funcionalidades de transformar a pdf debemos tener instalado el siguiente paquete en la maquina que corra la api

```sudo apt-get install texlive-latex-base ```

```sudo apt-get install texlive-fonts-recommended ```

```sudo apt-get install texlive-fonts-extra ```

```sudo apt-get install texlive-latex-extra ```

```sudo apt-get install texlive-lang-spanish ```



Dentro del entorno virtual instalamos los requerimientos del proyecto con el comando

```pip install -r requirements.txt```

Luego se debe ejecutar la API con el siguiente comando:

```python apiInformes.py```

### Para pegarle al endpoint de informeTendencias hay que utilizar el comando:

```curl -X POST -H "Content-Type: application/json" -d "@valoresCompletos.json" http://127.0.0.1:5000/informeTendencias -o resultado.pdf```

*los .json dentro de esta carpeta fueron utilizados para pruebas*

