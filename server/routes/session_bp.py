from flask import Blueprint, make_response, jsonify
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from flask_restful import Api, Resource, abort, reqparse
from datetime import datetime
from models import Session, db, Goals
from serializer import sessionSchema
from auth_middleware import hr_required
import re

session_bp = Blueprint('session_bp', __name__)
api = Api(session_bp)

post_args = reqparse.RequestParser()
post_args.add_argument('name', type=str, required=True,
                       help='Session name is required')
post_args.add_argument('start_date', type=str,
                       required=True, help='Start date is required')
post_args.add_argument('end_date', type=str, required=True,
                       help='End date is required')
post_args.add_argument('goals', type=str, required=True,
                       help='Goals are required')

patch_args = reqparse.RequestParser()
patch_args.add_argument('name', type=str, help='Session name')
patch_args.add_argument('start_date', type=str, help='Start date')
patch_args.add_argument('end_date', type=str, help='End date')
patch_args.add_argument('goals', type=str, help='Goals')


class Sessions(Resource):
    def get(self):
        sessions = Session.query.all()
        result = sessionSchema.dump(sessions, many=True)
        return make_response(jsonify(result), 200)

    @hr_required()
    def post(self):
        data = post_args.parse_args()

        # Name validation
        assert re.match(r'Q[1-4]', data['name']
                        ), "Session name must be a quarter (Q1, Q2, Q3, Q4)"

        # Date validation
        start_date = datetime.strptime(data['start_date'], "%Y-%m-%d")
        end_date = datetime.strptime(data['end_date'], "%Y-%m-%d")
        assert start_date < end_date, "Start date must be earlier than end date"
        assert (
            end_date - start_date).days <= 92, "The session should represent a quarter of a year"

        # Uniqueness validation
        session = Session.query.filter_by(name=data.name).first()
        if session:
            return make_response(jsonify({"error": "Session with the same name already exists"}), 409)

        # Goal association validation
        goal = Goals.query.filter_by(id=data.goals).first()
        if not goal:
            return make_response(jsonify({"error": "The associated goal does not exist"}), 409)

        new_session = Session(
            name=data['name'], start_date=start_date, end_date=end_date, goals=goal)
        db.session.add(new_session)
        db.session.commit()

        result = sessionSchema.dump(new_session)
        return make_response(jsonify(result), 201)


api.add_resource(Sessions, '/sessions')


class SessionById(Resource):
    def get(self, id):
        single_session = Session.query.filter_by(id=id).first()

        if not single_session:
            return make_response(jsonify({"error": f"Session with id {id} does not exist"}), 404)

        else:
            result = sessionSchema.dump(single_session)
            return make_response(jsonify(result), 200)

    @hr_required()
    def delete(self, id):
        single_session = Session.query.filter_by(id=id).first()

        if not single_session:
            return make_response(jsonify({"error": f"Session with id {id} does not exist"}), 404)

        db.session.delete(single_session)
        db.session.commit()

        return make_response(jsonify({"message": f"Session with id {id} has been deleted"}), 200)

    @hr_required()
    def patch(self, id):
        single_session = Session.query.filter_by(id=id).first()

        if not single_session:
            return make_response(jsonify({"error": f"Session with id {id} does not exist"}), 404)

        data = patch_args.parse_args()
        for key, value in data.items():
            if value is None:
                continue
            setattr(single_session, key, value)
        db.session.commit()

        result = sessionSchema.dump(single_session)
        return make_response(jsonify(result), 200)

api.add_resource(SessionById, '/sessions/<string:id>')

