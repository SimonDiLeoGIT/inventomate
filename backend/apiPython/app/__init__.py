from flask import Flask

def create_app():
    app = Flask(__name__)

    with app.app_context():
        # Importar aquí los módulos que requieren de la instancia de app
        from .informes import endpoints

        # Aquí se registrarían los endpoints o blueprints con la app
        # Por ejemplo: app.register_blueprint(endpoints.informe_tendencias_bp)

    return app