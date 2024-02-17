from flask import Blueprint, make_response, jsonify
from flask_restful import Api, Resource, abort, reqparse
from flask_marshmallow import Marshmallow
from flask_jwt_extended import get_jwt_identity
from serializer import educationSchema
from models import db, Education
from auth_middleware import employee_required

# create education blueprint
education_bp = Blueprint('education_bp', __name__)
# register blueprints with marshmallow and api
ma = Marshmallow(education_bp)
api = Api(education_bp)


post_args = reqparse.RequestParser()

post_args.add_argument('institution', type=str, required=True,
                       help="Institution is required")
post_args.add_argument('course', type=str, required=True,
                       help="course is required")
post_args.add_argument('qualification', type=str, required=True,
                       help="qualification is required")

post_args.add_argument('start_date', type=str, required=True,
                       help="start_date is required")
post_args.add_argument('end_date', type=str, required=True,
                       help="end_date is required")

patch_args = reqparse.RequestParser()

patch_args.add_argument('institution', type=str)
patch_args.add_argument('course', type=str)
patch_args.add_argument('qualification', type=str)
patch_args.add_argument('start_date', type=str)
patch_args.add_argument('end_date', type=str)


class EducationDetails(Resource):
    def get(self):
        education_details = Education.query.all()
        result = educationSchema.dump(education_details, many=True)
        response = make_response(jsonify(result), 200)
        return response

    @employee_required()
    def post(self):
        current_user = get_jwt_identity()
        data = post_args.parse_args()

        employee_education = Education(
            employee_id=current_user,
            institution=data['institution'],
            course=data['course'],
            qualification=data['qualification'],
            start_date=data["start_date"],
            end_date=data["end_date"]

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

    @employee_required()
    def patch(self, id):
        current_user = get_jwt_identity()
        education = Education.query.filter_by(id=id).first()

        if not education:
            abort(404, detail=f'educaction with id {id} does not exist')

        if education.employee_id != current_user:
            abort(400, detail="Unauthorized request")

        data = patch_args.parse_args()
        for key, value in data.items():
            if value is None:
                continue
            setattr(education, key, value)

        db.session.commit()
        result = educationSchema.dump(education)
        response = make_response(jsonify(result), 200)

        return response

    @employee_required()
    def delete(self):
        current_user = get_jwt_identity()
        education = Education.query.filter_by(id=id).first()

        if not education:
            abort(404, detail=f'education with id {id} does not exist')

        if education.employee_id != current_user:
            abort(400, detail="Unauthorized request")

        db.session.delete(education)
        db.session.commit()

        return {}, 200


api.add_resource(EducationByID, '/education/<string:id>')
