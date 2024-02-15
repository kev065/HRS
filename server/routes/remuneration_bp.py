from datetime import datetime
from flask import Blueprint, make_response, jsonify
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from flask_restful import Api, Resource, abort, reqparse
from flask_marshmallow import Marshmallow
from serializer import remunerationSchema

from models import db,Remuneration

remuneration_bp = Blueprint('remuneration_bp', __name__)
ma=Marshmallow(remuneration_bp)
api = Api(remuneration_bp)


 
post_args = reqparse.RequestParser()
post_args.add_argument('date_of_birth', type=str, required=True, help='Date of Birth is required')
post_args.add_argument('hr_id', type=str, required=True, help='hr_id is required')
post_args.add_argument('first_name', type=str, required=True, help='First Name is required')
post_args.add_argument('last_name', type=str, required=True, help='Last Name is required')
post_args.add_argument('mantra', type=str, required=True)
post_args.add_argument('phone_contact', type=str, required=True, help='Phone Number is required')
post_args.add_argument('profile_photo', type=str, required=True, help='Photo is required')
post_args.add_argument('title', type=str, required=True, help='Title is required')
post_args.add_argument('date_created', type=str, required=True, help='Date created is required')
post_args.add_argument('date_joined', type=str, required=True, help='Date Joined is required')



patch_args = reqparse.RequestParser()
patch_args.add_argument('date_of_birth', type=str, required=True, help='Date of Birth is required')
patch_args.add_argument('first_name', type=str, required=True, help='First Name is required')
patch_args.add_argument('last_name', type=str, required=True, help='Last Name is required')
patch_args.add_argument('mantra', type=str, required=True)
patch_args.add_argument('phone_contact', type=str, required=True, help='Phone Number is required')
patch_args.add_argument('profile_photo', type=str, required=True, help='Photo is required')
patch_args.add_argument('title', type=str, required=True, help='Title is required')
patch_args.add_argument('date_joined', type=str, required=True, help='Date Joined is required')


class Remunerations(Resource):
    def get(self):
        remunerations= Remuneration.query.all()
        result = remunerationSchema.dump(remunerations, many=True)
        response = make_response(jsonify(result), 200)

        return response
    
      
    def post(self):
        data = post_args.parse_args()
  
        name = data["name"]
        salary = data["salary"]
        employee_id = data["employee_id"]
        remuneration_date = datetime.strptime(data["remuneration_date"], "%Y-%m-%dT%H:%M:%S.%f")
      



        new_remuneration =Remuneration(name=name,salary=salary,employee_id=employee_id,remuneration_date=remuneration_date)
        db.session.add(new_remuneration)
        db.session.commit()

        result = remunerationSchema.dump(new_remuneration)
        response = make_response(jsonify(result),201)

        return response
api.add_resource(Remunerations,'/remunerations')

class RemunerationById(Resource):
    def get(self, id):
        single_remuneration =Remuneration.query.filter_by(id=id).first()

        if not single_remuneration:
            abort(404, detail=f'Remuneration with  id {id} does not exist')

        else:
            result = remunerationSchema.dump(single_remuneration)
            response = make_response(jsonify(result), 200)
            return response

    def patch(self, id):
        single_remuneration=Remuneration.query.filter_by(id=id).first()

        if not single_remuneration:
            abort(404, detail=f'Remuneration with id {id} does not exist')

        data = patch_args.parse_args()

        if 'remuneration_date' in data:
            data['remuneration_date'] = datetime.strptime(data['remuneration_date'], "%Y-%m-%dT%H:%M:%S.%f")
              

        for key, value in data.items():
            if value is None:
                continue
            setattr( single_remuneration, key, value)
        db.session.commit()
        result = remunerationSchema.dump(single_remuneration)
        response = make_response(jsonify(result), 200)

        return response
    
    def delete(self, id):
        single_remuneration=Remuneration.query.filter_by(id=id).first()
        if not  single_remuneration:
            response_body = {"error": "Remunaration not found"}
            return make_response(response_body, 404)
        else:
           
            db.session.delete(single_remuneration)
            db.session.commit()
            response_body = {"message": "Remuneration successfully deleted"}
            return make_response(response_body, 200)
    
    



api.add_resource(RemunerationById, '/remunerations/<string:id>')
