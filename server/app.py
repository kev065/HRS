from datetime import datetime, timedelta
from flask import Flask
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from models import db
from dotenv import load_dotenv
import os
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()


from routes.employee_bp import employee_bp
from routes.documents_bp import document_bp
from routes.department_bp import department_bp
from routes.education_bp import education_bp
from routes.manager_bp import manager_bp
from routes.hr_bp import hr_bp
from routes.manager_profile_bp import manager_profile_bp
from routes.leave_bp import leave_bp
from routes.session_bp import session_bp
from routes.Goals_bp import goals_bp
from routes.training_bp import training_bp
from routes.employee_training_bp import employee_training_bp
from routes.leave_approval_bp import leave_approval_bp
from routes.hrProfile_bp import hrProfile_bp
from routes.remuneration_bp import remuneration_bp
from routes.remuneration_desc_bp import remunerationDescription_bp
from routes.experience_bp import experience_bp
from routes.employee_profile_bp import employeeProfile_bp
from routes.user_authentication_bp import authentication_bp
from routes.sessionGoals_bp import goals_session_bp
from routes.payslip_bp import payslip_bp


def create_app():
    app = Flask(__name__)
    bcrypt.init_app(app)
    load_dotenv()
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv(
        'SQLALCHEMY_DATABASE_URI')
    app.config['JWT_SECRET_KEY'] = os.getenv(
        'JWT_SECRET_KEY')
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
    migrate = Migrate(app, db)
    db.init_app(app)
    jwt = JWTManager(app)

    app.register_blueprint(employee_bp)
    app.register_blueprint(department_bp)
    app.register_blueprint(education_bp)
    app.register_blueprint(document_bp)
    app.register_blueprint(hr_bp)
    app.register_blueprint(manager_bp)
    app.register_blueprint(manager_profile_bp)
    app.register_blueprint(leave_bp)
    app.register_blueprint(session_bp)
    app.register_blueprint(goals_bp)
    app.register_blueprint(training_bp)
    app.register_blueprint(employee_training_bp)
    app.register_blueprint(leave_approval_bp)
    app.register_blueprint(hrProfile_bp)
    app.register_blueprint(remuneration_bp)
    app.register_blueprint(remunerationDescription_bp)
    app.register_blueprint(experience_bp)
    app.register_blueprint(employeeProfile_bp)
    app.register_blueprint(authentication_bp)
    app.register_blueprint(goals_session_bp)
    app.register_blueprint(payslip_bp)

 

    return app


app = create_app()
