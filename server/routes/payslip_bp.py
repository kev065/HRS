from flask import Blueprint, make_response, jsonify
from flask_restful import Api, Resource, abort, reqparse
from flask_marshmallow import Marshmallow


from models import Remuneration, EmployeeProfile, RemunerationDescription, Employee


employee_bp = Blueprint('employee_bp', __name__)
ma = Marshmallow(employee_bp)
api = Api(employee_bp)


class Payslips(Resource):
    def get(self):
        # a payslip
        # renumeration => [RD, RD, RD]
        pass

    def post(self):
        # create payslip
        pass


class PayslipByID(Resource):
    def get(self, employee_id):
        pass


api.add_resource(Payslips, '/payslips')
