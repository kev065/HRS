from flask import Blueprint, jsonify, request, current_app, url_for
from flask_restful import Resource, Api, reqparse
from flask_restful import Api, Resource, abort, reqparse
from flask_bcrypt import Bcrypt
import secrets
from datetime import datetime, timedelta
from flask_jwt_extended import jwt_required,  get_jwt_identity, get_jwt
from flask_jwt_extended import create_access_token
from flask_cors import cross_origin

from models import Employee, Manager, HR_Personel, db, TokenBlocklist
from serializer import managerSchema, hrSchema, employeeSchema

bcrypt = Bcrypt()

reset_password_bp = Blueprint('reset_password_bp', __name__)
api = Api(reset_password_bp)

reset_tokens = {}

reset_password_parser = reqparse.RequestParser()
reset_password_parser.add_argument('email', type=str, required=True, help="email is required")

class ResetPassword(Resource):
    def post(self):
        data = reset_password_parser.parse_args()
        email = data['email'] 

        user = Employee.query.filter_by(email=email).first() or \
               Manager.query.filter_by(email=email).first() or \
               HR_Personel.query.filter_by(email=email).first()

        if not user:
            return {"message": "User not found"}, 404
        
        # Generate a unique token 
        token = secrets.token_urlsafe(32)

        # Get expiration time from the app configuration
        expiration_hours = current_app.config.get('JWT_ACCESS_TOKEN_EXPIRES', 24)
        print(f"Expiration hours: {expiration_hours}")

        # Check if expiration_hours is a valid integer
        if not isinstance(expiration_hours, (int, float)):
            print(f"Invalid value for expiration_hours: {expiration_hours}")
            # Handle the error appropriately, e.g., set a default value

        total_hours = expiration_hours.total_seconds() / 3600.0
        expires_delta = timedelta(hours=total_hours)
        now = datetime.utcnow()
        expiration_date = now + expires_delta

        # Store the token in-memory (or you can save it in the database)
        reset_tokens[user.id] = {"token": token, "expiration_date": expiration_date}


        # Create a JWT token with the user's email and expiration time
        jwt_token = create_access_token(identity=email, expires_delta=expires_delta)

        
        return {"message": "Reset token generated successfully", "token": jwt_token}, 200

api.add_resource(ResetPassword, '/reset_password/request')

class VerifyPasswordReset(Resource):
    @jwt_required()
    def post(self):
        current_user_email = get_jwt_identity()

        print("Current User Email:", current_user_email)

        user = Employee.query.filter_by(email=current_user_email).first() or \
               Manager.query.filter_by(email=current_user_email).first() or \
               HR_Personel.query.filter_by(email=current_user_email).first()

        if not user:
            return {"message": "User not found"}, 404
             
        

        data = request.get_json()
        new_password = data.get('new_password')

        if not new_password:
            return {"message": "New password cannot be empty"}, 400

        # Check if the user has a valid reset token
        if user.id not in reset_tokens:
            return {"message": "Invalid reset token"}, 401

        reset_token = reset_tokens[user.id]
        now = datetime.utcnow()

         # Check if the reset token has expired
        if now > reset_token['expiration_date']:
            return {"message": "Reset token has expired"}, 401


        # Update the user's password
        user.password = bcrypt.generate_password_hash(new_password).decode('utf-8')

        # Remove the used token from memory (or database)
        if user.id in reset_tokens:
            del reset_tokens[user.id]
        else:
            print(f"Key '{user.id}' not found in reset_tokens dictionary")

        db.session.commit()
        return {"message": "Password reset successfully"}, 200
       
    
api.add_resource(VerifyPasswordReset, '/reset_password/verify')