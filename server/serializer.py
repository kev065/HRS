from flask import Blueprint, make_response, jsonify
from flask_marshmallow import Marshmallow
from flask_restful import Api, Resource, abort, reqparse
from flask_bcrypt import Bcrypt
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema

from models import db, Employee, Department, Documents, Experience, EmployeeTraining, EmployeeProfile, HR_Personel, HrProfile, Manager, ManagerProfile, Leave, LeaveApproval, Session, Training, Remuneration, RemunerationDescription, Goals, Education

serializer_bp = Blueprint('serializer_bp', __name__)
ma = Marshmallow(serializer_bp)
bcrypt = Bcrypt()
api = Api(serializer_bp)


class EmployeeSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Employee
        include_fk=True

employeeSchema = EmployeeSchema()


class DocumentSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Documents
        include_fk = True

documentSchema = DocumentSchema()


class EducationSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Education
        include_fk = True

educationSchema = EducationSchema()


class DepartmentSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Department
        include_fk = True

departmentSchema = DepartmentSchema()

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


class HrSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = HR_Personel
        include_fk=True

hrSchema = HrSchema()


class ManagerSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Manager
        include_fk=True

managerSchema = ManagerSchema()


class ManagerProfileSchema(SQLAlchemyAutoSchema):
    manager_id = ma.Nested('ManagerSchema', many=True)
    class Meta:
        model = ManagerProfile
        include_fk= True

managerProfileSchema = ManagerProfileSchema()


class LeaveSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Leave
        include_fk= True

leaveSchema = LeaveSchema()
















