from flask import Blueprint, make_response, jsonify,Response
from flask_restful import Api, Resource, abort, reqparse
from flask_bcrypt import Bcrypt
from flask_marshmallow import Marshmallow
from flask_jwt_extended import get_jwt_identity
from serializer import managerSchema
from auth_middleware import manager_required
from models import Manager, db,Employee,Department,EmployeeProfile,EmployeeTraining

manager_bp = Blueprint('manager_bp', __name__)
ma = Marshmallow(manager_bp)
bcrypt = Bcrypt()
api = Api(manager_bp)

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


class Managers(Resource):
    def get(self):
        managers = Manager.query.all()
        result = managerSchema.dump(managers, many=True)
        response = make_response(jsonify(result), 200)

        return response

    def post(self):
        data = post_args.parse_args()

        # error handling
        manager = Manager.query.filter_by(email=data.email).first()
        if manager:
            abort(409, detail="Manager with the same email already exists")
        hashed_password = bcrypt.generate_password_hash(data['password'])
        new_manager = Manager(
            email=data['email'], password=hashed_password, dept_id=data['dept_id'])
        db.session.add(new_manager)
        db.session.commit()

        result = managerSchema.dump(new_manager)
        response = make_response(jsonify(result), 201)

        return response


api.add_resource(Managers, '/managers')


class ManagerById(Resource):
    def get(self, id):
        single_manager = Manager.query.filter_by(id=id).first()

        if not single_manager:
            abort(404, detail=f'user with  id {id} does not exist')

        else:
            result = managerSchema.dump(single_manager)
            response = make_response(jsonify(result), 200)
            return response

    @manager_required()
    def patch(self, id):
        current_user = get_jwt_identity()
        single_manager = Manager.query.filter_by(id=id).first()

        if not single_manager:
            abort(404, detail=f'user with id {id} does not exist')

        if single_manager.id != current_user:
            abort(401, detail="Unauthorized request")

        data = patch_args.parse_args()
        for key, value in data.items():
            if value is None:
                continue
            setattr(single_manager, key, value)
        db.session.commit()
        result = managerSchema.dump(single_manager)
        response = make_response(jsonify(result), 200)

        return response

    @manager_required()
    def delete(self, id):
        current_user = get_jwt_identity()
        manager = Manager.query.filter_by(id=id).first()
        if not manager:
            abort(404, detail=f'manager with id {id} does not exist')

        if manager.id != current_user:
            abort(401, detail="Unauthorized request")

        db.session.delete(manager)
        db.session.commit()

        response_body = {
            "message": "manager successfully deleted"
        }

        response = make_response(response_body, 200)
        return response


api.add_resource(ManagerById, '/managers/<string:id>')


class TrainingsPerDepartment(Resource):
    @manager_required()
    def get(self, manager_id):
        manager = Manager.query.get(manager_id)
        if not manager:
            return make_response(jsonify({"message": "Manager not found"}), 404)

        department = Department.query.get(manager.dept_id)
        if not department:
            return make_response(jsonify({"message": "Department not found"}), 404)

        employees = Employee.query.filter_by(dept_id=department.id).all()
        if not employees:
            return make_response(jsonify({"message": "No employees found in this department"}), 404)

        employees_details = []

        for employee in employees:
            employee_profile = EmployeeProfile.query.filter_by(employee_id=employee.id).first()

            employee_details = {
                "id": employee.id,
                "email": employee.email,
                "first_name": employee_profile.first_name if employee_profile else None,
                "last_name": employee_profile.last_name if employee_profile else None,
                "phone_contact": employee_profile.phone_contact if employee_profile else None
            }

         
            assigned_trainings = EmployeeTraining.query.filter_by(employee_id=employee.id).all()
            employee_details["assigned_trainings"] = [{
                "title": training.training.title,
                "description": training.training.description,
                "start_date": training.training.start_date.strftime('%Y-%m-%d'),
                "start_time": training.training.start_time.strftime('%H:%M:%S'),
                "end_date": training.training.end_date.strftime('%Y-%m-%d'),
                "end_time": training.training.end_time.strftime('%H:%M:%S')
            } for training in assigned_trainings]

            employees_details.append(employee_details)

        return jsonify(employees_details)

api.add_resource(TrainingsPerDepartment, '/manager/employees/<string:manager_id>')


class EmployeesPerDepartment(Resource):
    @manager_required()
    def get(self, manager_id):
        manager = Manager.query.get(manager_id)
        if not manager:
            return make_response(jsonify({"message": "Manager not found"}), 404)

        department = Department.query.get(manager.dept_id)
        if not department:
            return make_response(jsonify({"message": "Department not found"}), 404)

        employees = Employee.query.filter_by(dept_id=department.id).all()
        if not employees:
            return make_response(jsonify({"message": "No employees found in this department"}), 404)

        employees_details = []

        for employee in employees:
            employee_profile = EmployeeProfile.query.filter_by(employee_id=employee.id).first()

            employee_details = {
                "id": employee.id,
                "email": employee.email,
                "first_name": employee_profile.first_name if employee_profile else None,
                "last_name": employee_profile.last_name if employee_profile else None,
                "phone_contact": employee_profile.phone_contact if employee_profile else None
            }

         
           
            employees_details.append(employee_details)

        return jsonify(employees_details)

api.add_resource(EmployeesPerDepartment, '/employees_department/<string:manager_id>')

