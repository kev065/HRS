from flask import Blueprint, make_response, jsonify
from flask_restful import Api, Resource, abort, reqparse
from flask_bcrypt import Bcrypt
from flask_marshmallow import Marshmallow
from flask_jwt_extended import get_jwt_identity
from serializer import employeeSchema
from auth_middleware import employee_required, hr_required

from models import Employee, db

employee_bp = Blueprint('employee_bp', __name__)
ma = Marshmallow(employee_bp)
bcrypt = Bcrypt()
api = Api(employee_bp)

post_args = reqparse.RequestParser()
post_args.add_argument('email', type=str, required=True,
                       help='Email is required')
post_args.add_argument('password', type=str, required=True,
                       help='Password is required')
post_args.add_argument('dept_id', type=str, required=True,
                       help='Departmemnt ID  is required')


patch_args = reqparse.RequestParser()
patch_args.add_argument('email', type=str)
patch_args.add_argument('password', type=str)
patch_args.add_argument('dept_id', type=str)


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
        new_employee = Employee(
            email=data['email'], password=hashed_password, dept_id=data['dept_id'])
        db.session.add(new_employee)
        db.session.commit()

        result = employeeSchema.dump(new_employee)
        response = make_response(jsonify(result), 201)

        return response


api.add_resource(Employees, '/employees')


class EmployeeById(Resource):
    def get(self, id):
        single_employee = Employee.query.filter_by(id=id).first()

        if not single_employee:
            abort(404, detail=f'user with  id {id} does not exist')

        else:
            result = employeeSchema.dump(single_employee)
            response = make_response(jsonify(result), 200)
            return response

    @employee_required()
    def patch(self, id):
        current_user = get_jwt_identity()
        single_employee = Employee.query.filter_by(id=id).first()

        if not single_employee:
            abort(404, detail=f'user with id {id} does not exist')

        if single_employee.id != current_user:
            abort(401, detail="Unauthorized request")

        data = patch_args.parse_args()
        for key, value in data.items():
            if value is None:
                continue
            setattr(single_employee, key, value)
        db.session.commit()
        result = employeeSchema.dump(single_employee)
        response = make_response(jsonify(result), 200)

        return response

    @hr_required()
    def delete(self, id):
        employee = Employee.query.filter_by(id=id).first()
        if not employee:
            abort(404, detail=f'employee with id {id} does not exist')
        db.session.delete(employee)
        db.session.commit()

        response_body = {
            "message": "employee successfully deleted"
        }

        response = make_response(response_body, 200)
        return response


api.add_resource(EmployeeById, '/employees/<string:id>')
