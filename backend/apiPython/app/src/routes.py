from flask import jsonify, request
from flask import current_app as app
from .models import *
from .informes.prediccion import predecir
from .informes.sugerencias import sugerir 
from .informes.obsolescencia import calcular_obsolescencia
from .informes.tendencias import procesar_tendencias
    
# Colecciones:
# historico-tendencias
# proyecciones-de-ventas
# sugerencias-pedidos
# obsolescencias

@app.route("/api/informe/tendencias/add", methods=["POST"])
def insertarTendencia():
    try:
        json_data = request.json
        json_procesado = procesar_tendencias(json_data)
        id = insert(json_procesado, "historico-tendencias")
                
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
        documento = get(id, "historico-tendencias")
        if documento:
            return jsonify(documento), 200
        else:
            return jsonify({'mensaje': 'Documento no encontrado'}), 404
    except Exception as e:
            return jsonify({'error': str(e)}), 500
        
@app.route("/api/informe/tendencias/delete", methods=["DELETE"])
def borrarTendencia():
    try:
        id = request.args.get('idMongo')
        resultado = delete(id, "historico-tendencias")
        if resultado.deleted_count > 0:
            return jsonify({'message': 'Documento eliminado'}), 204
        else:
            return jsonify({'error': 'Documento no encontrado'}), 404
    except Exception as e:
            return jsonify({'error': str(e)}), 500

@app.route("/api/informe/proyeccion-de-ventas/add", methods=["POST"])
def insertarProyeccion():
    try:
        json_data = request.json
        json_procesado = predecir(json_data)
        id = insert(json_procesado, "proyecciones-de-ventas") 
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
        documento = get(id, "proyecciones-de-ventas")
        if documento:
            return jsonify(documento), 200
        else:
            return jsonify({'mensaje': 'Documento no encontrado'}), 404
    except Exception as e:
            return jsonify({'error': str(e)}), 500

@app.route("/api/informe/proyeccion-de-ventas/delete", methods=["DELETE"])
def borrarProyeccion():
    try:
        id = request.args.get('idMongo')
        resultado = delete(id, "proyecciones-de-ventas")
        if resultado.deleted_count > 0:
            return jsonify({'message': 'Documento eliminado'}), 204
        else:
            return jsonify({'error': 'Documento no encontrado'}), 404
    except Exception as e:
            return jsonify({'error': str(e)}), 500
        
@app.route("/api/informe/sugerencias-pedidos/add", methods=["POST"])
def insertarSugerencia():
    try:
        json_data = request.json
        json_procesado = sugerir(json_data)
        id = insert(json_procesado, "sugerencias-pedidos") 
        if (id != -1):
            return jsonify({'ID-Mongo': str(id)}), 200
        else:
            return jsonify({'mensaje': 'Error de la BD'}), 500
    except Exception as e:
        return ({'error': str(e)}), 500

@app.route("/api/informe/sugerencias-pedidos", methods=["GET"])
def verSugerencia():
    try:
        id = request.args.get('idMongo')
        documento = get(id, "sugerencias-pedidos")
        if documento:
            return jsonify(documento), 200
        else:
            return jsonify({'mensaje': 'Documento no encontrado'}), 404
    except Exception as e:
            return jsonify({'error': str(e)}), 500

@app.route("/api/informe/sugerencias-pedidos/delete", methods=["DELETE"])
def borrarSugerencia():
    try:
        id = request.args.get('idMongo')
        resultado = delete(id, "sugerencias-pedidos")
        if resultado.deleted_count > 0:
            return jsonify({'message': 'Documento eliminado'}), 204
        else:
            return jsonify({'error': 'Documento no encontrado'}), 404
    except Exception as e:
            return jsonify({'error': str(e)}), 500
        
@app.route("/api/informe/obsolescencia/add", methods=["POST"])
def insertarObsolescencia():
    try:
        json_data = request.json
        json_procesado = calcular_obsolescencia(json_data)
        id = insert(json_procesado, "obsolescencias") 
        if (id != -1):
            return jsonify({'ID-Mongo': str(id)}), 200
        else:
            return jsonify({'mensaje': 'Error de la BD'}), 500
    except Exception as e:
        return ({'error': str(e)}), 500
    
@app.route("/api/informe/obsolescencia", methods=["GET"])
def verObsolescencia():
    try:
        id = request.args.get('idMongo')
        documento = get(id, "obsolescencias")
        if documento:
            return jsonify(documento), 200
        else:
            return jsonify({'mensaje': 'Documento no encontrado'}), 404
    except Exception as e:
            return jsonify({'error': str(e)}), 500
        
@app.route("/api/informe/obsolescencia/delete", methods=["DELETE"])
def borrarObsolescencia():
    try:
        id = request.args.get('idMongo')
        resultado = delete(id, "obsolescencias")
        if resultado.deleted_count > 0:
            return jsonify({'message': 'Documento eliminado'}), 204
        else:
            return jsonify({'error': 'Documento no encontrado'}), 404
    except Exception as e:
            return jsonify({'error': str(e)}), 500