from datetime import datetime,timedelta

from flask import Flask
from flask_migrate import Migrate


from models import db

from routes.employee_bp import employee_bp
from routes.session_bp import session_bp
from routes.Goals_bp import goals_bp
from routes.training_bp import training_bp
from routes.employee_training_bp import employee_training_bp
from routes.leave_approval_bp import leave_approval_bp

from dotenv import load_dotenv

import os


def create_app():
    app = Flask(__name__)
    load_dotenv()
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URI')
    migrate = Migrate(app, db)
    db.init_app(app)

    app.register_blueprint(employee_bp)
    app.register_blueprint(session_bp)
    app.register_blueprint(goals_bp)
    app.register_blueprint(training_bp)
    app.register_blueprint(employee_training_bp)
    app.register_blueprint(leave_approval_bp)


    return app
app=create_app()