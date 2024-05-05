# Como usar la api LINUX

Para probar API debemos configurar un entorno virtual python e instalar con flask con pip utilizando el siguiente comando:

```pip install flask```

Para correr las funcionalidades de transformar a pdf debemos tener instalado el siguiente paquete en la maquina que corra la api

```sudo apt-get install texlive-latex-base```

```sudo apt-get install texlive-fonts-recommended```

```sudo apt-get install texlive-fonts-extra```

```sudo apt-get install texlive-latex-extra```

```sudo apt-get install texlive-lang-spanish```

Luego se debe ejecutar la API con el siguiente comando:

```python run.py```

### Para pegarle al endpoint de informeTendencias hay que utilizar el comando

```curl -X POST -H "Content-Type: application/json" -d "@valoresCompletos.json" http://127.0.0.1:5000/informeTendencias -o resultado.pdf```

*los .json dentro de esta carpeta fueron utilizados para pruebas*

# Como usar la api WINDOWS

para esto primero debemos:

clonar el proyecto

tener instalado visual studio code

tener instalado python

tener instalado pip

tener instalado flask

instalar el pdflatex -> esto es lo mas problematico en windows porque tienen que instalar pdflatex pero de otro compilador, lo que en linux utiliza livelatex en windows se usa MikTex

una vez teniendo todo instalado, tiran el siguiente comando

Invoke-WebRequest -Uri "<http://127.0.0.1:5000/informeTendencias>" -Method POST -ContentType "application/json" -InFile "valoresCompletos.json" -OutFile "resultado.pdf"

de esa manera pasas el json a la api
