from flask import Blueprint, make_response, jsonify
from flask_restful import Api, Resource, abort, reqparse
from flask_marshmallow import Marshmallow
from serializer import departmentSchema
from models import db, Department

# create education blueprint
department_bp = Blueprint('department_bp', __name__)
# register blueprints with marshmallow and api
ma = Marshmallow(department_bp)
api = Api(department_bp)


parser = reqparse.RequestParser()
parser.add_argument('name', type=str, required=True,
                    help="name is required")
parser.add_argument('dept_head', type=str, required=True,
                    help="dept_head is required")


class Departments(Resource):
    def get(self):
        departments = Department.query.all()
        result = departmentSchema.dump(departments, many=True)
        response = make_response(jsonify(result), 200)
        return response

    def post(self):
        data = parser.parse_args()

        new_department = Department(
            **data
        )

        db.session.add(new_department)
        db.session.commit()

        result = departmentSchema.dump(new_department)
        response = make_response(jsonify(result), 201)

        return response


api.add_resource(Departments, '/departments')


class DepartmentByID(Resource):
    def get(self, id):
        department = Department.query.filter_by(id=id).first()

        if not department:
            abort(404, detail=f'department with  id {id} does not exist')

        result = departmentSchema.dump(department)
        response = make_response(jsonify(result), 200)
        return response

    def patch(self, id):
        department = Department.query.filter_by(id=id).first()

        if not department:
            abort(404, detail=f'department with id {id} does not exist')

        data = parser.parse_args()
        for key, value in data.items():
            if value is None:
                continue
            setattr(department, key, value)

        db.session.commit()
        result = departmentSchema.dump(department)
        response = make_response(jsonify(result), 200)

        return response

    def delete(self):
        department = Department.query.filter_by(id=id).first()

        if not department:
            abort(404, detail=f'department with id {id} does not exist')

        db.session.delete(department)
        db.session.commit()

        return {}, 200


api.add_resource(DepartmentByID, '/departments/<string:id>')
