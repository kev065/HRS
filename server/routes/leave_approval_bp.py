from flask import Blueprint, make_response, jsonify
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from flask_restful import Api, Resource, abort, reqparse
from models import LeaveApproval, db
from serializer import leaveApprovalSchema

leave_approval_bp = Blueprint('leave_approval_bp', __name__)
api = Api(leave_approval_bp)

post_args = reqparse.RequestParser()
post_args.add_argument('employee_id', type=str, required=True, help='Employee ID is required')
post_args.add_argument('manager_id', type=str, required=True, help='Manager ID is required')
post_args.add_argument('hr_id', type=str, required=True, help='HR ID is required')
post_args.add_argument('manager_app_date', type=str, required=True, help='Manager Approval Date is required')
post_args.add_argument('hr_approval_date', type=str, required=True, help='HR Approval Date is required')

patch_args = reqparse.RequestParser()
patch_args.add_argument('employee_id', type=str, help='Employee ID')
patch_args.add_argument('manager_id', type=str, help='Manager ID')
patch_args.add_argument('hr_id', type=str, help='HR ID')
patch_args.add_argument('manager_app_date', type=str, help='Manager Approval Date')
patch_args.add_argument('hr_approval_date', type=str, help='HR Approval Date')

class LeaveApprovalsResource(Resource):
    def get(self):
        leave_approvals = LeaveApproval.query.all()
        result = leaveApprovalSchema.dump(leave_approvals, many=True)
        return make_response(jsonify(result), 200)
    
    def post(self):
        data = post_args.parse_args()

        # error handling
        leave_approval = LeaveApproval.query.filter_by(employee_id=data.employee_id, manager_id=data.manager_id, hr_id=data.hr_id).first()
        if leave_approval:
            return make_response(jsonify({"error": "LeaveApproval with the same employee_id, manager_id and hr_id already exists"}), 409)

        new_leave_approval = LeaveApproval(employee_id=data['employee_id'], manager_id=data['manager_id'], hr_id=data['hr_id'], manager_app_date=data['manager_app_date'], hr_approval_date=data['hr_approval_date'])
        db.session.add(new_leave_approval)
        db.session.commit()

        result = leaveApprovalSchema.dump(new_leave_approval)
        return make_response(jsonify(result), 201)

api.add_resource(LeaveApprovalsResource,'/leave_approvals')

class LeaveApprovalById(Resource):
    def get(self, id):
        single_leave_approval = LeaveApproval.query.filter_by(id=id).first()

        if not single_leave_approval:
            return make_response(jsonify({"error": f"LeaveApproval with id {id} does not exist"}), 404)

        else:
            result = leaveApprovalSchema.dump(single_leave_approval)
            return make_response(jsonify(result), 200)

    def delete(self, id):
        single_leave_approval = LeaveApproval.query.filter_by(id=id).first()

        if not single_leave_approval:
            return make_response(jsonify({"error": f"LeaveApproval with id {id} does not exist"}), 404)

        db.session.delete(single_leave_approval)
        db.session.commit()

        return make_response(jsonify({"message": f"LeaveApproval with id {id} has been deleted"}), 200)

    def patch(self, id):
        single_leave_approval = LeaveApproval.query.filter_by(id=id).first()

        if not single_leave_approval:
            return make_response(jsonify({"error": f"LeaveApproval with id {id} does not exist"}), 404)

        data = patch_args.parse_args()
        for key, value in data.items():
            if value is None:
                continue
            setattr(single_leave_approval, key, value)
        db.session.commit()

        result = leaveApprovalSchema.dump(single_leave_approval)
        return make_response(jsonify(result), 200)

api.add_resource(LeaveApprovalById, '/leave_approvals/<string:id>')
