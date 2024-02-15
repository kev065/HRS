from flask import Blueprint, make_response, jsonify
from flask_restful import Api, Resource, abort, reqparse
from flask_bcrypt import Bcrypt
from flask_marshmallow import Marshmallow

from serializer import leaveSchema

from models import Leave, db

leave_bp = Blueprint('leave_bp', __name__)
ma=Marshmallow(leave_bp)
bcrypt = Bcrypt()
api = Api(leave_bp)

post_args = reqparse.RequestParser()
post_args.add_argument('start_date', type=str, required=True, help='Start date is required')
post_args.add_argument('end_date', type=str, required=True, help='End date is required')
post_args.add_argument('description', type=str, required=True, help='Description is required')
post_args.add_argument('employee_id', type=int, required=True, help='Employee id is required')
post_args.add_argument('approved', type=bool, required=True, help='Approval slot is required')

patch_args = reqparse.RequestParser()
patch_args.add_argument('start_date', type=str, required=True, help='Start date is required')
patch_args.add_argument('end_date', type=str, required=True, help='End date is required')
patch_args.add_argument('description', type=str, required=True, help='Description is required')
patch_args.add_argument('employee_id', type=int, required=True, help='Employee id is required')
patch_args.add_argument('approved', type=bool, required=True, help='Approval slot is required')

class Leaves(Resource):
    def get(self):
        leave = Leave.query.all()
        result = leaveSchema.dump(leave, many=True)
        response = make_response(jsonify(result), 200)

        return response
    
    def post(self):
        data = post_args.parse_args()

        # error handling
        leave = Leave.query.filter_by(employee_id=data.employee_id).first()
        # if leave:
        #     abort(409, detail="Profile with the same manager ID already exists")
        new_leave = leave(start_date = data['start_date'], end_date=data['end_date'], employee_id=data['employee_id'], description=data['description'], approved=data['approved'])
        db.session.add(new_leave)
        db.session.commit()

        result = leaveSchema.dump(new_leave)
        response = make_response(jsonify(result),201)

        return response
    
api.add_resource(Leaves,'/leaves')

class LeaveById(Resource):
    def get(self, id):
        single_leave = Leave.query.filter_by(id=id).first()

        if not single_leave:
            abort(404, detail=f'leave with  id {id} does not exist')

        else:
            result = leaveSchema.dump(single_leave)
            response = make_response(jsonify(result), 200)
            return response

    def patch(self, id):
        single_leave = Leave.query.filter_by(id=id).first()

        if not single_leave:
            abort(404, detail=f'leave with id {id} does not exist')

        data = patch_args.parse_args()
        for key, value in data.items():
            if value is None:
                continue
            setattr( single_leave, key, value)
        db.session.commit()
        result = leaveSchema.dump(single_leave)
        response = make_response(jsonify(result), 200)

        return response
    
    def delete(self, id):
        leave = Leave.query.filter_by(id=id).first()
        if not leave:
            abort(404, detail=f'leave with id {id} does not exist')
        db.session.delete(leave)
        db.session.commit()

        response_body = {
            "message": "leave successfully deleted"
        }

        response = make_response(response_body, 200)
        return response


api.add_resource(LeaveById, '/leaves/<int:id>')