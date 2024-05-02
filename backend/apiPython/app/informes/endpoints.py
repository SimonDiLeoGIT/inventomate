from flask import request, send_file
from .conversion import json_to_latex, latex_to_pdf
from flask import current_app as app
import os

#creamos el endpoint para obtener el informe de tendencias
@app.route('/informeTendencias', methods=['POST'])
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
        response = send_file("../resultado.pdf", as_attachment=True)
        # Borrar los archivos resultantes después de enviar el pdf
        os.remove("resultado.pdf")
        os.remove("resultado.aux")
        os.remove("resultado.log")
        os.remove("resultado.out")
        os.remove("resultado.tex")
        return response , 200
    else:
        return "Error: El contenido no es un JSON", 400
