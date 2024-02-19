from datetime import datetime
from flask import Blueprint, make_response, jsonify
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from flask_restful import Api, Resource, abort, reqparse
from flask_marshmallow import Marshmallow
from flask_jwt_extended import jwt_required
from serializer import goalsSchema
from auth_middleware import hr_required

from models import db, Goals

goals_bp = Blueprint('goals_bp', __name__)
ma = Marshmallow(goals_bp)
api = Api(goals_bp)


post_args = reqparse.RequestParser()
post_args.add_argument('employee_id', type=str,
                       required=True, help='Employee ID is required')
post_args.add_argument('name', type=str, required=True,
                       help='Goal name is required')
post_args.add_argument('description', type=str,
                       required=True, help='Description is required')
post_args.add_argument('session_id', type=str,
                       required=True, help='Session ID is required')

patch_args = reqparse.RequestParser()
patch_args.add_argument('employee_id', type=str, help='Employee ID')
patch_args.add_argument('name', type=str, help='Goal name')
patch_args.add_argument('description', type=str, help='Description')
patch_args.add_argument('session_id', type=str, help='Session ID')


class GoalsResource(Resource):
    def get(self):
        goals = Goals.query.all()
        result = goalsSchema.dump(goals, many=True)
        return make_response(jsonify(result), 200)

    @jwt_required()
    def post(self):
        data = post_args.parse_args()
       
        employee_id = data["employee_id"]
        name = data["name"]
        description= data["description"]
        session_id = data["session_id"]
        
        new_goal= Goals(employee_id=employee_id,name=name,description=description,session_id=session_id)
        db.session.add(new_goal)
        db.session.commit()

        result = goalsSchema.dump(new_goal)
        response = make_response(jsonify(result), 201)

        return response


api.add_resource(GoalsResource, '/goals')


class GoalsById(Resource):
    def get(self, id):
        single_goal = Goals.query.filter_by(id=id).first()

        if not single_goal:
            abort(404, detail=f'Goal with  id {id} does not exist')

        else:
            result = goalsSchema.dump(single_goal)
            response = make_response(jsonify(result), 200)
            return response

    @jwt_required()
    def patch(self, id):
      
        single_goal = Goals.query.filter_by(id=id).first()

        if not single_goal:
            abort(404, detail=f'Goal with  id {id} does not exist')

        data = patch_args.parse_args()

        
        for key, value in data.items():
            if value is None:
                continue
            setattr(single_goal, key, value)
        db.session.commit()
        result = goalsSchema.dump(single_goal)
        response = make_response(jsonify(result), 200)

        return response

    @jwt_required()
    def delete(self, id):
       
        single_goal = Goals.query.filter_by(id=id).first()
        if not single_goal:
            response_body = {"error": "Goal not found"}
            return make_response(response_body, 404)

        db.session.delete(single_goal)
        db.session.commit()
        response_body = {"message": "Goal successfully deleted"}
        return make_response(response_body, 200)


api.add_resource(GoalsById, '/goals/<string:id>')
