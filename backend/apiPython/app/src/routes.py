from flask import jsonify, request, send_file
from .informes.templates.tendencia import json_to_latex, latex_to_pdf
from flask import current_app as app
import os
import json
from .models import *

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
    if 'application/json' in request.headers.get('Content-Type'):
        json_data = request.json
        id = insertTendencia(json_data)
        if (id != -1):
            return jsonify({'ID-Mongo': str(id)}), 200
        else:
            return jsonify({'mensaje': 'Error de la BD'}), 500
    else:
        return jsonify({'error': 'La solicitud no contiene datos JSON'}), 400
