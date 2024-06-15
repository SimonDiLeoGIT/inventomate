from bson import ObjectId
from app.src import DB

def insert(data, collectionName):
    coleccion = DB[collectionName]
    resultado = coleccion.insert_one(data)
    if (resultado.acknowledged):
        return resultado.inserted_id
    return -1

def get(id, collectionName):
    coleccion = DB[collectionName]
    documento = coleccion.find_one({'_id': ObjectId(id)})   
    documento['_id'] = str(documento['_id'])
    return documento

def delete(id, collectionName):
    coleccion = DB[collectionName]
    resultado = coleccion.delete_one({'_id': ObjectId(id)})
    return resultado