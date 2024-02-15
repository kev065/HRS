from flask import Blueprint, make_response, jsonify
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from flask_restful import Api, Resource, abort, reqparse
from flask_bcrypt import Bcrypt
from flask_marshmallow import Marshmallow

from models import Employee, db

employee_bp = Blueprint('employee_bp', __name__)
ma=Marshmallow(employee_bp)
bcrypt = Bcrypt()
api = Api(employee_bp)

post_args = reqparse.RequestParser()
post_args.add_argument('leave', type=str, required=True, help='Leave is required')
post_args.add_argument('education', type=str, required=True, help='Education is required')
post_args.add_argument('goals', type=str, required=True, help='Goals are required')
post_args.add_argument('documents', type=str, required=True, help='Documents are required')
post_args.add_argument('profile', type=str, required=True, help='Profile is required')

patch_args = reqparse.RequestParser()
patch_args.add_argument('leave', type=str, required=True, help='Leave is required')
patch_args.add_argument('education', type=str, required=True, help='Education is required')
patch_args.add_argument('goals', type=str, required=True, help='Goals are required')
patch_args.add_argument('documents', type=str, required=True, help='Documents are required')
patch_args.add_argument('profile', type=str, required=True, help='Profile is required')


class EmployeeSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Employee

employeeschema = EmployeeSchema()

class Employees(Resource):
    def get(self):
        employees = Employee.query.all()
        result = employeeschema.dump(employees, many=True)
        response = make_response(jsonify(result), 200)

        return response
    
    def post(self):
        data = post_args.parse_args()

        # error handling
        employee = Employee.query.filter_by(email=data.email).first()
        if employee:
            abort(409, detail="Employee with the same email already exists")
        hashed_password = bcrypt.generate_password_hash(data['password'])
        new_employee = Employee(firstname=data['firstname'], lastname=data['lastname'], email=data['email'], password=hashed_password)
        db.session.add(new_employee)
        db.session.commit()

        result = employeeschema.dump(new_employee)
        response = make_response(jsonify(result),201)

        return response
api.add_resource(Employees,'/employees')

