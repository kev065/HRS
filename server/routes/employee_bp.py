from flask import Blueprint, make_response, jsonify
from flask_restful import Api, Resource, abort, reqparse
from flask_bcrypt import Bcrypt
from flask_marshmallow import Marshmallow
from serializer import employeeSchema

from models import Employee, db

employee_bp = Blueprint('employee_bp', __name__)
ma=Marshmallow(employee_bp)
bcrypt = Bcrypt()
api = Api(employee_bp)

post_args = reqparse.RequestParser()
post_args.add_argument('email', type=str, required=True, help='Email is required')
post_args.add_argument('password', type=str, required=True, help='Password is required')
post_args.add_argument('dept_id', type=str, required=True, help='Departmemnt ID  is required')



patch_args = reqparse.RequestParser()
patch_args.add_argument('email', type=str, required=True, help='email is required')
patch_args.add_argument('password', type=str, required=True, help='password is required')
patch_args.add_argument('dept_id', type=str, required=True, help='Departmemnt ID  is required')



class Employees(Resource):
    def get(self):
        employees = Employee.query.all()
        result = employeeSchema.dump(employees, many=True)
        response = make_response(jsonify(result), 200)

        return response
    
    def post(self):
        data = post_args.parse_args()

        # error handling
        employee = Employee.query.filter_by(email=data.email).first()
        if employee:
            abort(409, detail="Employee with the same email already exists")
        hashed_password = bcrypt.generate_password_hash(data['password'])
        new_employee = Employee(email=data['email'], password=hashed_password, dept_id=data['dept_id'])
        db.session.add(new_employee)
        db.session.commit()

        result = employeeSchema.dump(new_employee)
        response = make_response(jsonify(result),201)

        return response
api.add_resource(Employees,'/employees')

class EmployeeByEmail(Resource):
    def get(self, email):
        single_employee = Employee.query.filter_by(email=email).first()

        if not single_employee:
            abort(404, detail=f'user with email {email} does not exist')

        else:
            result = employeeSchema.dump(single_employee)
            response = make_response(jsonify(result), 200)
            return response

    def patch(self, email):
        single_employee = Employee.query.filter_by(email=email).first()

        if not single_employee:
            abort(404, detail=f'user with email {email} does not exist')

        data = patch_args.parse_args()
        for key, value in data.items():
            if value is None:
                continue
            setattr( single_employee, key, value)
        db.session.commit()
        result = employeeSchema.dump(single_employee)
        response = make_response(jsonify(result), 200)

        return response
    
    def delete(self, email):
        employee = Employee.query.filter_by(email=email).first()
        if not employee:
            abort(404, detail=f'employee with email {email} does not exist')
        db.session.delete(employee)
        db.session.commit()

        response_body = {
            "message": "employee successfully deleted"
        }

        response = make_response(response_body, 200)
        return response


api.add_resource(EmployeeByEmail, '/employees/<string:email>')
