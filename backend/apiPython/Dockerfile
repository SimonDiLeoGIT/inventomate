# Usa una imagen base de Python
FROM python:3.9-slim

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de requerimientos y los instala
COPY requirements.txt /app/
RUN pip install -r requirements.txt

# Copia el resto del código de la API
COPY . /app

# Expone el puerto en el que la API corre
EXPOSE 5000

# Comando para correr la API
CMD ["python", "run.py"]