from flask import Blueprint, make_response, jsonify
from flask_restful import Api, Resource, abort, reqparse
from flask_bcrypt import Bcrypt
from flask_marshmallow import Marshmallow
from serializer import managerSchema

from models import Manager, db

manager_bp = Blueprint('manager_bp', __name__)
ma=Marshmallow(manager_bp)
bcrypt = Bcrypt()
api = Api(manager_bp)

post_args = reqparse.RequestParser()
post_args.add_argument('email', type=str, required=True, help='Email is required')
post_args.add_argument('password', type=str, required=True, help='Password is required')
post_args.add_argument('dept_id', type=str, required=True, help='Departmemnt ID  is required')

patch_args = reqparse.RequestParser()
patch_args.add_argument('email', type=str, required=True, help='email is required')
patch_args.add_argument('password', type=str, required=True, help='password is required')
patch_args.add_argument('dept_id', type=str, required=True, help='Departmemnt ID  is required')


class Managers(Resource):
    def get(self):
        managers = Manager.query.all()
        result = managerSchema.dump(managers, many=True)
        response = make_response(jsonify(result), 200)

        return response
    
    def post(self):
        data = post_args.parse_args()

        # error handling
        manager = Manager.query.filter_by(email=data.email).first()
        if manager:
            abort(409, detail="Manager with the same email already exists")
        hashed_password = bcrypt.generate_password_hash(data['password'])
        new_manager = Manager(email=data['email'], password=hashed_password, dept_id=data['dept_id'])
        db.session.add(new_manager)
        db.session.commit()

        result = managerSchema.dump(new_manager)
        response = make_response(jsonify(result),201)

        return response
    
api.add_resource(Managers,'/managers')

class ManagerByEmail(Resource):
    def get(self, email):
        single_manager = Manager.query.filter_by(email=email).first()

        if not single_manager:
            abort(404, detail=f'user with email {email} does not exist')

        else:
            result = managerSchema.dump(single_manager)
            response = make_response(jsonify(result), 200)
            return response

    def patch(self, email):
        single_manager = Manager.query.filter_by(email=email).first()

        if not single_manager:
            abort(404, detail=f'user with email {email} does not exist')

        data = patch_args.parse_args()
        for key, value in data.items():
            if value is None:
                continue
            setattr(single_manager, key, value)
        db.session.commit()
        result = managerSchema.dump(single_manager)
        response = make_response(jsonify(result), 200)

        return response
    
    def delete(self, email):
        manager = Manager.query.filter_by(email=email).first()
        if not manager:
            abort(404, detail=f'manager with email {email} does not exist')
        db.session.delete(manager)
        db.session.commit()

        response_body = {
            "message": "manager successfully deleted"
        }

        response = make_response(response_body, 200)
        return response


api.add_resource(ManagerByEmail, '/managers/<string:email>')
