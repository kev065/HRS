from datetime import datetime
from flask import Blueprint, make_response, jsonify, request
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from flask_restful import Api, Resource, abort, reqparse
from flask_marshmallow import Marshmallow
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from serializer import hrProfileSchema, remunerationSchema, remunerationDescriptionSchema
from models import Employee, Remuneration, db, EmployeeProfile, RemunerationDescription
from auth_middleware import hr_required
from routes.remuneration_bp import RemunerationById

payslip_bp = Blueprint('payslip', __name__)
ma = Marshmallow(payslip_bp)
api = Api(payslip_bp)

# renumeration validation


def validate_remuneration(value):
    if not isinstance(value, dict):
        raise ValueError('Remuneration must be a dictionary')

    # Define your required fields here
    required_fields = ['employee_id', 'name', 'salary']

    for field in required_fields:
        if field not in value:
            raise ValueError(f'Missing required field: {field}')

    return value

# renumeration description validation


def validate_remuneration_description(value):
    print(value)
    if not isinstance(value, list):
        raise ValueError('Remuneration descriptions must be in a list')

    # Define your required fields here
    required_fields = ['type', 'name', 'description', 'amount']

    for remun_desc in value:
        for field in required_fields:
            if field not in remun_desc:
                raise ValueError(f'Missing required field: {field}')

    return value


post_args = reqparse.RequestParser()
post_args.add_argument('remuneration', type=validate_remuneration,
                       required=True)
post_args.add_argument('remuneration_descriptions', type=validate_remuneration_description,
                       required=True,)


patch_args = reqparse.RequestParser()
patch_args.add_argument('remuneration', type=dict)
patch_args.add_argument('remuneration_descriptions', type=list)


class PayslipResource(Resource):
    @jwt_required()
    def get(self):
        current_user = get_jwt_identity()
        claims = get_jwt()
        if claims['role'] == 'hr':
            return self.viewPayslip(claims['role'])
        elif claims['role'] == 'employee':
            return self.viewPayslip(claims['role'], current_user)
        else:
            return {'message': 'Unauthorized to perform this operation'}, 403

    def viewPayslip(self, role, employee_id=None):
        year = request.args.get('year')
        month = request.args.get('month')
        employee_id = request.args.get('employee_id')

        employee = Employee.query.filter_by(id=employee_id).first()
        if not employee:
            return {'message': 'Employee not found'}, 404

        remuneration = Remuneration.query.filter_by(employee_id=employee_id).filter(
            db.extract('month', Remuneration.remuneration_date) == month,
            db.extract('year', Remuneration.remuneration_date) == year
        ).first()

        if not remuneration:
            return {'message': 'Remuneration data not found for this employee, month, and year'}, 404

        basic_salary = remuneration.salary
        bonus = []
        allowance = []
        normal = []

        remuneration_descriptions = RemunerationDescription.query.filter_by(
            remuneration_id=remuneration.id).all()

        for rem in remuneration_descriptions:
            if rem.type == "bonus":
                bonus.append(remunerationDescriptionSchema.dump(rem))
            if rem.type == "allowance":
                allowance.append(remunerationDescriptionSchema.dump(rem))
            if rem.type == "normal":
                normal.append(remunerationDescriptionSchema.dump(rem))

        employee_profile = EmployeeProfile.query.filter_by(
            employee_id=employee_id).first()
        if not employee_profile:
            return {'message': 'Employee profile not found'}, 404

        first_name = employee_profile.first_name
        last_name = employee_profile.last_name

        payslip = {
            'employee_id': employee_id,
            'employee_name': f'{first_name} {last_name}',
            'month': month,
            'year': year,
            'basic_salary': basic_salary,
            'bonus': bonus if bonus else None,
            'allowance': allowance if allowance else None,
            'normal': normal if normal else None,
        }

        response = make_response(
            jsonify(payslip), 200)
        return response

    @hr_required()
    def post(self):
        data = post_args.parse_args()
        # get remuneration data
        remuneration_data = data['remuneration']
        # get remuneration descriptions
        remuneration_descriptions_data = data['remuneration_descriptions']

        # remunerations fields
        employee_id = remuneration_data['employee_id']
        name = remuneration_data['name']
        salary = remuneration_data['salary']
        # Add remuneration to the database
        remuneration = Remuneration(
            employee_id=employee_id,
            name=name,
            salary=salary
        )
        db.session.add(remuneration)
        db.session.commit()
        # check if renumeration has renumeration descriptions
        if remuneration_descriptions_data:
            # loop through each renumeration description and add it to the database
            for rem_desc in remuneration_descriptions_data:
                remuneration_description = RemunerationDescription(
                    remuneration_id=remuneration.id,  # pass id of renumeration
                    type=rem_desc['type'],
                    name=rem_desc['name'],
                    description=rem_desc['description'],
                    amount=rem_desc['amount']
                )
                db.session.add(remuneration_description)
                db.session.commit()

        return {'message': 'Payslip created successfully'}, 201


api.add_resource(PayslipResource, '/payslip')


class PayslipByID(Resource):
    def get(self, remuneration_id):
        remuneration = RemunerationById.get(self, remuneration_id)
        # fetch all associated renumeration descriptions
        remuneration_descriptions = RemunerationDescription.query.filter_by(
            remuneration_id=remuneration_id).all()
        # Serialize remuneration data
        remuneration_data = remuneration.get_json()
        if not remuneration_descriptions:
            remuneration_descriptions = None
        result = [remunerationDescriptionSchema.dump(
            rem_desc) for rem_desc in remuneration_descriptions]

        return {"remuneration": remuneration_data, "remuneration_descriptions": result}

    @hr_required()
    def patch(self, remuneration_id):
        data = patch_args.parse_args()
        # get remuneration data
        remuneration_data = data['remuneration']
        # get remuneration descriptions
        remuneration_descriptions_data = data['remuneration_descriptions']
        print(remuneration_descriptions_data)

        remuneration = Remuneration.query.filter_by(id=remuneration_id).first()

        if not remuneration:
            abort(
                404, detail=f'leave with id {remuneration_id} does not exist')

        for key, value in remuneration_data.items():
            if value is None:
                continue
            setattr(remuneration, key, value)
        db.session.commit()

        # check if renumeration has renumeration descriptions
        for desc_data in remuneration_descriptions_data:
            pass

    @hr_required()
    def delete(self):
        data = request.get_json()
        employee_id = data.get("employee_id")
        month = data.get("month")
        year = data.get("year")

        remuneration = Remuneration.query.filter_by(employee_id=employee_id).filter(
            db.extract('month', Remuneration.remuneration_date) == month,
            db.extract('year', Remuneration.remuneration_date) == year
        ).first()

        if not remuneration:
            return {'message': 'Remuneration data not found for this employee, month, and year'}, 404

        db.session.delete(remuneration)
        db.session.commit()

        return {'message': 'Payslip deleted successfully'}, 200


api.add_resource(PayslipByID, '/payslip/<string:remuneration_id>')
