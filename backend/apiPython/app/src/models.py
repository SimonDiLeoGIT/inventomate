from app.src import DB

def insertTendencia(data):
    coleccion = DB["historico-tendencias"]
    resultado = coleccion.insert_one(data)
    if (resultado.acknowledged):
        return resultado.inserted_id
    return -1