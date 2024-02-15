from datetime import datetime,timedelta

from flask import Flask
from flask_migrate import Migrate


from models import db

from routes.employee_bp import employee_bp
from routes.manager_bp import manager_bp
from routes.hr_bp import hr_bp
# from routes.manager_profile_bp import manager_profile_bp
# from routes.leave_bp import leave_bp

from dotenv import load_dotenv

import os


def create_app():
    app = Flask(__name__)
    load_dotenv()
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URI')
    migrate = Migrate(app, db)
    db.init_app(app)

    app.register_blueprint(employee_bp)
    app.register_blueprint(hr_bp)
    app.register_blueprint(manager_bp)
    


    return app
app=create_app()