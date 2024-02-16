from flask import Blueprint, make_response, jsonify
from flask_restful import Api, Resource, abort, reqparse
from flask_marshmallow import Marshmallow
from serializer import documentSchema
from models import db, Documents

# create document blueprint
document_bp = Blueprint('document_bp', __name__)
# register blueprints with marshmallow and api
ma = Marshmallow(document_bp)
api = Api(document_bp)


parser = reqparse.RequestParser()
parser.add_argument('employee_id', type=str, required=True,
                    help="Document upload required")
parser.add_argument('link_url', type=str, required=True,
                    help="Document upload required")
parser.add_argument('name', type=str, required=True,
                    help="Name of document is required")
parser.add_argument('type', type=str, required=True,
                    help="Type of document is required")


class AllDocuments(Resource):
    def get(self):
        documents = Documents.query.all()
        result = documentSchema.dump(documents, many=True)
        response = make_response(jsonify(result), 200)
        return response

    def post(self):
        data = parser.parse_args()

        new_document = Documents(
            **data
        )

        db.session.add(new_document)
        db.session.commit()

        result = documentSchema.dump(new_document)
        response = make_response(jsonify(result), 201)

        return response


api.add_resource(AllDocuments, '/documents')


class DocumentById(Resource):
    def get(self, id):
        document = Documents.query.filter_by(id=id).first()

        if not document:
            abort(404, detail=f'user with  id {id} does not exist')

        else:
            result = documentSchema.dump(document)
            response = make_response(jsonify(result), 200)
            return response

    def patch(self, id):
        document = Documents.query.filter_by(id=id).first()

        if not document:
            abort(404, detail=f'document with id {id} does not exist')

        data = parser.parse_args()
        for key, value in data.items():
            if value is None:
                continue
            setattr(document, key, value)

        db.session.commit()
        result = documentSchema.dump(document)
        response = make_response(jsonify(result), 200)

        return response

    def delete(self):
        document = Documents.query.filter_by(id=id).first()

        if not document:
            abort(404, detail=f'document with id {id} does not exist')

        db.session.delete(document)
        db.session.commit()

        return {}, 200


api.add_resource(DocumentById, '/documents/<string:id>')
