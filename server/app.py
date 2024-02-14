from datetime import datetime,timedelta

from flask import Flask
from flask_migrate import Migrate


from models import db

from dotenv import load_dotenv

import os


def create_app():
    app = Flask(__name__)
    load_dotenv()
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URI')
    migrate = Migrate(app, db)
    db.init_app(app)


    return app
app=create_app()