from bson import ObjectId
from app.src import DB

def insertTendencia(data):
    coleccion = DB["historico-tendencias"]
    resultado = coleccion.insert_one(data)
    if (resultado.acknowledged):
        return resultado.inserted_id
    return -1

def getTendencia(id):
    coleccion = DB["historico-tendencias"]
    documento = coleccion.find_one({'_id': ObjectId(id)})   
    documento['_id'] = str(documento['_id'])
    return documento