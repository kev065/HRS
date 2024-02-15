from datetime import datetime,timedelta

from flask import Flask
from flask_migrate import Migrate


from models import db

from routes.employee_bp import employee_bp
from routes.hrProfile_bp import hrProfile_bp
from routes.remuneration_bp import remuneration_bp
from routes.remuneration_desc_bp import remunerationDescription_bp
from routes.experience_bp import experience_bp

from dotenv import load_dotenv

import os


def create_app():
    app = Flask(__name__)
    load_dotenv()
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URI')
    migrate = Migrate(app, db)
    db.init_app(app)

    app.register_blueprint(employee_bp)
    app.register_blueprint(hrProfile_bp)
    app.register_blueprint(remuneration_bp)
    app.register_blueprint(remunerationDescription_bp)
    app.register_blueprint(experience_bp)


    return app
app=create_app()