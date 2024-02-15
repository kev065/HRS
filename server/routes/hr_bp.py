from flask import Blueprint, make_response, jsonify
from flask_restful import Api, Resource, abort, reqparse
from flask_bcrypt import Bcrypt
from flask_marshmallow import Marshmallow
from serializer import hrSchema

from models import HR_Personel, db

hr_bp = Blueprint('hr_bp', __name__)
ma=Marshmallow(hr_bp)
bcrypt = Bcrypt()
api = Api(hr_bp)

post_args = reqparse.RequestParser()
post_args.add_argument('email', type=str, required=True, help='Email is required')
post_args.add_argument('password', type=str, required=True, help='Password is required')
post_args.add_argument('dept_id', type=str, required=True, help='Departmemnt ID  is required')



patch_args = reqparse.RequestParser()
patch_args.add_argument('email', type=str, required=True, help='email is required')
patch_args.add_argument('password', type=str, required=True, help='password is required')
patch_args.add_argument('dept_id', type=str, required=True, help='Departmemnt ID  is required')



class HR_Personnels(Resource):
    def get(self):
        HR = HR_Personel.query.all()
        result = hrSchema.dump(HR, many=True)
        response = make_response(jsonify(result), 200)

        return response
    
    def post(self):
        data = post_args.parse_args()

        # error handling
        HR = HR_Personel.query.filter_by(email=data.email).first()
        if HR:
            abort(409, detail="HR with the same email already exists")
        hashed_password = bcrypt.generate_password_hash(data['password'])
        new_HR = HR_Personel(email=data['email'], password=hashed_password, dept_id=data['dept_id'])
        db.session.add(new_HR)
        db.session.commit()

        result = hrSchema.dump(new_HR)
        response = make_response(jsonify(result),201)

        return response
api.add_resource(HR_Personnels,'/hr_personnels')

class HRByEmail(Resource):
    def get(self, email):
        single_HR = HR_Personel.query.filter_by(email=email).first()

        if not single_HR:
            abort(404, detail=f'user with email {email} does not exist')

        else:
            result = hrSchema.dump(single_HR)
            response = make_response(jsonify(result), 200)
            return response

    def patch(self, email):
        single_HR = HR_Personel.query.filter_by(email=email).first()

        if not single_HR:
            abort(404, detail=f'user with email {email} does not exist')

        data = patch_args.parse_args()
        for key, value in data.items():
            if value is None:
                continue
            setattr( single_HR, key, value)
        db.session.commit()
        result = hrSchema.dump(single_HR)
        response = make_response(jsonify(result), 200)

        return response
    
    def delete(self, email):
        HR = HR_Personel.query.filter_by(email=email).first()
        if not HR:
            abort(404, detail=f'HR with email {email} does not exist')
        db.session.delete(HR)
        db.session.commit()

        response_body = {
            "message": "HR successfully deleted"
        }

        response = make_response(response_body, 200)
        return response


api.add_resource(HRByEmail, '/hr_personnels/<string:email>')