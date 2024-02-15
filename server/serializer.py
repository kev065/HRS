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