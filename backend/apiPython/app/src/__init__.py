from flask import Flask
from flask_cors import CORS
from pymongo import MongoClient
from app.config import MONGO_URI

APP = Flask(__name__)
CORS(APP)
print("Conectando a MongoDB...")
APP.config['MONGO_URI'] = MONGO_URI
mongo = MongoClient(APP.config['MONGO_URI'])
DB = mongo["inventomate_db"]
print("Conexión exitosa")

with APP.app_context():
    # Importar aquí los módulos que requieren de la instancia de app
    from app.src import routes