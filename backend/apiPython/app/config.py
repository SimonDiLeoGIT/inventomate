#MONGO_URI = "mongodb://localhost:27017/inventomate_db"
#MONGO_URI = "mongodb://mongodb:27017/inventomate_db"

import os

mongo_uri = os.getenv('MONGO_URI')

if mongo_uri:
    print(f"MONGO_URI: {mongo_uri}")
else:
    print("No se encontró la variable de entorno MONGO_URI")