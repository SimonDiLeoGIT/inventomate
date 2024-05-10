import json
from flask import jsonify, request, send_file
from .informes.templates.tendencia import json_to_latex, latex_to_pdf
from flask import current_app as app
import os
from .models import *
from .informes.proyeccion_ventas.procesadorJson import procesar_json 

#creamos el endpoint para obtener el informe de tendencias
@app.route('/api/informe/tendencias/download', methods=['POST'])
def informeTendencias():
    # Verificar que se reciba un JSON
    if 'application/json' in request.headers.get('Content-Type'):
        # Obtener los datos del JSON enviado
        json_data = request.json
        # Convertir JSON a archivo LaTeX
        json_to_latex(json_data)
        # Convertir archivo LaTeX a PDF
        latex_to_pdf("resultado.tex")
        # Devolver el archivo PDF en la respuesta
        response = send_file("resultado.pdf", as_attachment=True)
        # Borrar los archivos resultantes después de enviar el pdf
        # os.remove("resultado.pdf")
        os.remove("resultado.aux")
        os.remove("resultado.log")
        os.remove("resultado.out")
        os.remove("resultado.tex")
        return response , 200
    else:
        return jsonify({'error': 'La solicitud no contiene datos JSON'}), 400
    
    
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
        # TODO Funciona la primera request, ya despues no. Puede ser un tema de concurrencia de la app
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