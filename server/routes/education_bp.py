from flask import Blueprint, make_response, jsonify
from flask_restful import Api, Resource, abort, reqparse
from flask_marshmallow import Marshmallow
from serializer import educationSchema
from models import db, Education

# create education blueprint
education_bp = Blueprint('education_bp', __name__)
# register blueprints with marshmallow and api
ma = Marshmallow(education_bp)
api = Api(education_bp)


parser = reqparse.RequestParser()
parser.add_argument('employee_id', type=str, required=True,
                    help="employee is required")
parser.add_argument('institution', type=str, required=True,
                    help="Institution is required")
parser.add_argument('course', type=str, required=True,
                    help="course is required")
parser.add_argument('qualification', type=str, required=True,
                    help="qualification is required")

parser.add_argument('start_date', type=str, required=True,
                    help="start_date is required")
parser.add_argument('end_date', type=str, required=True,
                    help="end_date is required")


class EducationDetails(Resource):
    def get(self):
        education_details = Education.query.all()
        result = educationSchema.dump(education_details, many=True)
        response = make_response(jsonify(result), 200)
        return response

    def post(self):
        data = parser.parse_args()

        employee_education = Education(
            **data
        )

        db.session.add(employee_education)
        db.session.commit()

        result = educationSchema.dump(employee_education)
        response = make_response(jsonify(result), 201)

        return response


api.add_resource(EducationDetails, '/education')


class EducationByID(Resource):
    def get(self, id):
        educaction = Education.query.filter_by(id=id).first()

        if not educaction:
            abort(404, detail=f'education with  id {id} does not exist')

        result = educationSchema.dump(educaction)
        response = make_response(jsonify(result), 200)
        return response

    def patch(self, id):
        educaction = Education.query.filter_by(id=id).first()

        if not educaction:
            abort(404, detail=f'educaction with id {id} does not exist')

        data = parser.parse_args()
        for key, value in data.items():
            if value is None:
                continue
            setattr(educaction, key, value)

        db.session.commit()
        result = educationSchema.dump(educaction)
        response = make_response(jsonify(result), 200)

        return response

    def delete(self):
        education = Education.query.filter_by(id=id).first()

        if not education:
            abort(404, detail=f'education with id {id} does not exist')

        db.session.delete(education)
        db.session.commit()

        return {}, 200


api.add_resource(EducationByID, '/education/<string:id>')
