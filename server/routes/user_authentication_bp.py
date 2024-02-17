from flask import Blueprint, make_response, jsonify
from flask_restful import Api, Resource, abort, reqparse
from flask_marshmallow import Marshmallow
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token


from models import Employee, Manager, HR_Personel


bcrypt = Bcrypt()


authentication_bp = Blueprint('authentication_bp', __name__)
api = Api(authentication_bp)

login_args = reqparse.RequestParser()
login_args.add_argument('email', type=str, required=True,
                        help="email is required")
login_args.add_argument('password', type=str, required=True,
                        help="password is required")
login_args.add_argument('role', type=str, required=True,
                        help="role is required")


class Login(Resource):
    def post(self):
        data = login_args.parse_args()
        email = data['email']
        role = data['role']
        password = data['password']

        if role == "manager":
            # Login manager
            manager = Manager.query.filter_by(email=email).first()
            if not manager:
                abort(
                    404, detail="The email provided was not found. Please provide a valid email or sign in")

            if bcrypt.check_password_hash(manager.password, password.encode('utf-8')):
                access_token = create_access_token(identity=manager.id, additional_claims={
                    "is_manager": True, "role": "manager"})
                return jsonify(access_token=access_token)
            else:
                abort(400, detail="Your password is incorrect")

        elif role == "employee":
            # Login employee
            employee = Employee.query.filter_by(email=email).first()
            if not employee:
                abort(
                    404, detail="The email provided was not found. Please provide a valid email or sign in")

            if bcrypt.check_password_hash(employee.password, password.encode('utf-8')):
                access_token = create_access_token(identity=employee.id, additional_claims={
                    "is_employee": True, "role": "employee"})
                return jsonify(access_token=access_token)
            else:
                abort(400, detail="Your password is incorrect")

        elif role == "hr":
            # Login hr
            hr = Employee.query.filter_by(email=email).first()
            if not hr:
                abort(
                    404, detail="The email provided was not found. Please provide a valid email or sign in")

            if bcrypt.check_password_hash(hr.password, password.encode('utf-8')):
                access_token = create_access_token(identity=hr.id, additional_claims={
                    "is_hr": True, "role": "hr"})
                return jsonify(access_token=access_token)
            else:
                abort(400, detail="Your password is incorrect")
        else:
            abort(401, detail="Unauthorized login request. user role is required")


api.add_resource(Login, '/login')


class Logout(Resource):
    def get(self):
        # logout logic here
        pass


api.add_resource(Logout, '/logout')
