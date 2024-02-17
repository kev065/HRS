from flask import Blueprint, make_response, jsonify
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from flask_restful import Api, Resource, abort, reqparse
from models import EmployeeTraining, db
from serializer import employeeTrainingSchema
from auth_middleware import hr_required

employee_training_bp = Blueprint('employee_training_bp', __name__)
api = Api(employee_training_bp)

post_args = reqparse.RequestParser()
post_args.add_argument('employee_id', type=str,
                       required=True, help='Employee ID is required')
post_args.add_argument('training_id', type=str,
                       required=True, help='Training ID is required')

patch_args = reqparse.RequestParser()
patch_args.add_argument('employee_id', type=str, help='Employee ID')
patch_args.add_argument('training_id', type=str, help='Training ID')


class EmployeeTrainingsResource(Resource):
    def get(self):
        employee_trainings = EmployeeTraining.query.all()
        result = employeeTrainingSchema.dump(employee_trainings, many=True)
        return make_response(jsonify(result), 200)

    @hr_required()
    def post(self):
        data = post_args.parse_args()

        # error handling
        employee_training = EmployeeTraining.query.filter_by(
            employee_id=data.employee_id, training_id=data.training_id).first()
        if employee_training:
            return make_response(jsonify({"error": "EmployeeTraining with the same employee_id and training_id already exists"}), 409)

        new_employee_training = EmployeeTraining(
            employee_id=data['employee_id'], training_id=data['training_id'])
        db.session.add(new_employee_training)
        db.session.commit()

        result = employeeTrainingSchema.dump(new_employee_training)
        return make_response(jsonify(result), 201)


api.add_resource(EmployeeTrainingsResource, '/employee_trainings')


class EmployeeTrainingById(Resource):
    def get(self, id):
        single_employee_training = EmployeeTraining.query.filter_by(
            id=id).first()

        if not single_employee_training:
            return make_response(jsonify({"error": f"EmployeeTraining with id {id} does not exist"}), 404)

        else:
            result = employeeTrainingSchema.dump(single_employee_training)
            return make_response(jsonify(result), 200)

    @hr_required()
    def delete(self, id):
        single_employee_training = EmployeeTraining.query.filter_by(
            id=id).first()

        if not single_employee_training:
            return make_response(jsonify({"error": f"EmployeeTraining with id {id} does not exist"}), 404)

        db.session.delete(single_employee_training)
        db.session.commit()

        return make_response(jsonify({"message": f"EmployeeTraining with id {id} has been deleted"}), 200)

    @hr_required()
    def patch(self, id):
        single_employee_training = EmployeeTraining.query.filter_by(
            id=id).first()

        if not single_employee_training:
            return make_response(jsonify({"error": f"EmployeeTraining with id {id} does not exist"}), 404)

        data = patch_args.parse_args()
        for key, value in data.items():
            if value is None:
                continue
            setattr(single_employee_training, key, value)
        db.session.commit()

        result = employeeTrainingSchema.dump(single_employee_training)
        return make_response(jsonify(result), 200)


api.add_resource(EmployeeTrainingById, '/employee_trainings/<int:id>')
