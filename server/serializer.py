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
        include_fk=True

employeeSchema = EmployeeSchema()

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