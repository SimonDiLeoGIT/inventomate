from flask import jsonify, request
from flask import current_app as app
from .models import *
from .informes.proyeccion_ventas.procesadorJson import procesar_json 
    
    
@app.route("/api/informe/tendencias/add", methods=["POST"])
def insertarTendencia():
    try:
        json_data = request.json
        id = insertTendencia(json_data)
                
        if (id != -1):
            return jsonify({'ID-Mongo': str(id)}), 200
        else:
            return jsonify({'mensaje': 'Error de la BD'}), 500
    except Exception as e:
        return ({'error': str(e)}), 500

@app.route("/api/informe/tendencias", methods=["GET"])
def verTendencia():
    try:
        id = request.args.get('idMongo')
        documento = getTendencia(id)
        if documento:
            return jsonify(documento), 200
        else:
            return jsonify({'mensaje': 'Documento no encontrado'}), 404
    except Exception as e:
            return jsonify({'error': str(e)}), 500
        

@app.route("/api/informe/proyeccion-de-ventas/add", methods=["POST"])
async def insertarProyeccion():
    try:
        json_data = request.json
        json_procesado = await procesar_json(json_data)
        id = insertProyeccion(json_procesado) 
        if (id != -1):
            return jsonify({'ID-Mongo': str(id)}), 200
        else:
            return jsonify({'mensaje': 'Error de la BD'}), 500
    except Exception as e:
        return ({'error': str(e)}), 500
    
@app.route("/api/informe/proyeccion-de-ventas", methods=["GET"])
def verProyeccion():
    try:
        id = request.args.get('idMongo')
        documento = getProyeccion(id)
        if documento:
            return jsonify(documento), 200
        else:
            return jsonify({'mensaje': 'Documento no encontrado'}), 404
    except Exception as e:
            return jsonify({'error': str(e)}), 500