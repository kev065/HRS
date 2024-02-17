from datetime import datetime
from flask import Blueprint, make_response, jsonify,request
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from flask_restful import Api, Resource, abort, reqparse
from flask_marshmallow import Marshmallow
from flask_jwt_extended import jwt_required, get_jwt_identity, current_user
from serializer import hrProfileSchema,remunerationSchema
from models import Employee, Remuneration, db, EmployeeProfile

payslip_bp = Blueprint('payslip', __name__)
ma = Marshmallow(payslip_bp)
api = Api(payslip_bp)

post_args = reqparse.RequestParser()
post_args.add_argument('employee_id', type=str, required=True, help='Employee id is required')
post_args.add_argument('name', type=str, required=True, help='Name is required')
post_args.add_argument('salary', type=str, required=True, help='Salary is required')
post_args.add_argument('month', type=str, required=True, help='Month is required')
post_args.add_argument('year', type=str, required=True, help='Year is required')

patch_args = reqparse.RequestParser()
patch_args.add_argument('name', type=str)
patch_args.add_argument('month', type=str)
patch_args.add_argument('year', type=str)
patch_args.add_argument('salary', type=str)
patch_args.add_argument('employee_id', type=str)


class PayslipResource(Resource):
   
    def get(self):
        current_user_data = get_jwt_identity()
        if current_user_data['role'] == 'hr':
            return self.viewPayslip(current_user_data['role'])
        elif current_user_data['role'] == 'employee':
            return self.viewPayslip(current_user_data['role'], current_user_data['employee_id'])
        else:
            return {'message': 'Unauthorized to perform this operation'}, 403

    def viewPayslip(self, role, employee_id=None):
        data = request.get_json()
        employee_id = data.get("employee_id") if not employee_id else employee_id
        month = data.get("month")
        year = data.get("year")

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

        deductions = sum(desc.amount for desc in remuneration.remuneration_descriptions if desc.type == 'deduction')
        bonuses = sum(desc.amount for desc in remuneration.remuneration_descriptions if desc.type == 'bonus')
        allowances = sum(desc.amount for desc in remuneration.remuneration_descriptions if desc.type == 'allowance')

        employee_profile = EmployeeProfile.query.filter_by(employee_id=employee_id).first()
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
            'deductions': deductions,
            'bonuses': bonuses,
            'allowances': allowances
        }

        return payslip, 200
    
 
    def post(self):
        current_user_data = get_jwt_identity()
        if current_user_data['role'] == 'hr':
            data = post_args.parse_args()
            employee_id = data['employee_id']
            name = data['name']
            salary = data['salary']
            month = data['month']
            year = data['year']

           

            remuneration = Remuneration(
                employee_id=employee_id,
                name=name,
                salary=salary,
                remuneration_date=datetime(int(year), int(month)) 
            )
            db.session.add(remuneration)
            db.session.commit()

         
            return {'message': 'Payslip created successfully'}, 201
        else:
            return {'message': 'Unauthorized to perform this operation'}, 403
    
     
    def patch(self):
        current_user_data = get_jwt_identity()
        if current_user_data['role'] == 'hr':
            dataFetch=request.get_json()
           
            employee_id = dataFetch.get("employee_id")
            month = dataFetch.get("month")
            year = dataFetch.get("year")

            remuneration = Remuneration.query.filter_by(employee_id=employee_id).filter(
                db.extract('month', Remuneration.remuneration_date) == month,
                db.extract('year', Remuneration.remuneration_date) == year
            ).first()

            if not remuneration:
                return {'message': 'Remuneration data not found for this employee, month, and year'}, 404

            data = patch_args.parse_args()
            for key, value in data.items():
                if value is not None:  
                    setattr(remuneration, key, value)

         
            db.session.commit()

            
            result =remunerationSchema.dump(remuneration)
            response = make_response(jsonify(result), 200)

            return response
           
        else:
            return {'message': 'Unauthorized to perform this operation'}, 403

    def delete(self):
        current_user_data = get_jwt_identity()
        if current_user_data['role'] == 'hr':
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
        else:
            return {'message': 'Unauthorized to perform this operation'}, 403


api.add_resource(PayslipResource, '/payslip')
