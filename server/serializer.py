from flask import Blueprint, make_response, jsonify
from flask_marshmallow import Marshmallow
from flask_restful import Api, Resource, abort, reqparse
from flask_bcrypt import Bcrypt
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema

from models import db, Employee, Department, Documents, Experience, EmployeeTraining, EmployeeProfile, HR_Personel, HrProfile, Manager, ManagerProfile, Leave, LeaveApproval, Session, Training, Remuneration, RemunerationDescription, Goals

serializer_bp = Blueprint('serializer_bp', __name__)
ma=Marshmallow(serializer_bp)
bcrypt = Bcrypt()
api = Api(serializer_bp)


class EmployeeSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Employee

employeeSchema = EmployeeSchema()

class SessionSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Session
        include_fk = True

sessionSchema = SessionSchema()


class GoalsSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Goals
        include_fk = True

goalsSchema = GoalsSchema()

class TrainingSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Training
        include_fk = True

trainingSchema = TrainingSchema()


class LeaveApprovalSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = LeaveApproval
        include_fk = True

leaveApprovalSchema = LeaveApprovalSchema()

class EmployeeTrainingSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = EmployeeTraining
        include_fk = True

employeeTrainingSchema = EmployeeTrainingSchema()

class HrProfileSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = HrProfile
        include_fk = True

hrProfileSchema =HrProfileSchema()

class RemunerationSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Remuneration
        include_fk = True


remunerationSchema = RemunerationSchema()

class RemunerationDescriptionSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = RemunerationDescription
        include_fk = True


remunerationDescriptionSchema = RemunerationDescriptionSchema()

class ExperienceSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Experience
        include_fk = True


experienceSchema = ExperienceSchema()

class EmployeeProfileSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = EmployeeProfile
        include_fk = True


employeeProfileSchema = EmployeeProfileSchema()

