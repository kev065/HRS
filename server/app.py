from datetime import datetime, timedelta

from flask import Flask
from flask_migrate import Migrate


from models import db

from routes.employee_bp import employee_bp
from routes.documents_bp import document_bp
from routes.department_bp import department_bp
from routes.education_bp import education_bp


from dotenv import load_dotenv

import os


def create_app():
    app = Flask(__name__)
    load_dotenv()
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv(
        'SQLALCHEMY_DATABASE_URI')
    migrate = Migrate(app, db)
    db.init_app(app)

    app.register_blueprint(employee_bp)
    app.register_blueprint(department_bp)
    app.register_blueprint(education_bp)
    app.register_blueprint(document_bp)

    return app


app = create_app()
