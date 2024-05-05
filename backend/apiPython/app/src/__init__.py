from flask import Flask
from pymongo import MongoClient
from app.config import MONGO_URI

APP = Flask(__name__)
print("Conectando a MongoDB...")
APP.config['MONGO_URI'] = MONGO_URI
mongo = MongoClient(APP.config['MONGO_URI'])
DB = mongo["inventomate_db"]
print("Conexión exitosa")

with APP.app_context():
    # Importar aquí los módulos que requieren de la instancia de app
    from app.src import routes

    # Aquí se registrarían los endpoints o blueprints con la app
    # Por ejemplo: app.register_blueprint(endpoints.informe_tendencias_bp)
