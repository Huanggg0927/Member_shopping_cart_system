from my_store import db
from flask_restful import Resource, reqparse
from my_store.app.models.user import UserModel
from flask import jsonify, request

class User(Resource):

    def get(self, username):
        user = UserModel.query.filter(username=username).first()
        if user:
            return user.as_dict(), 200
        else :
            return {'message': 'User not found !'}, 404
        
    def delete(self, username):
        user = UserModel.query.filter(username=username).first()
        if user:
            db.session.delete(user)
            db.session.commit()
            return {'message': 'User Successfully deleted'},200
        else :
            return {'message': 'User not found !'}, 404
        
    def put(self, username):
        try:
            user = UserModel.query.filter(username=username).first()
            if not user:
                return {'message': 'User not found !'}, 404
            
            data = request.get_json()

            user.username = user.username
            user.password = data.get('password') or user.password
            user.email = data.get('email') or user.email

            db.session.commit()
            return {'message': 'User updated successfully'}, 200
        except Exception as e:
            db.session.rollback()
            return {'message': str(e)}, 500

class UserList(Resource):

    parser = reqparse.RequestParser()
    parser.add_argument(
        'username', type=str, required=True
    )
    parser.add_argument(
        'password', type=str, required=True,
        help= '{error_msg}'
    )
    parser.add_argument(
        'email', type=str, required=True, help='required email'
    )

    def post(self):

        data  = UserList.parser.parse_args()
        user = UserModel.query.filter_by(username=data['username']).first()
        if user:
            return {'message': 'user already exist'}
        user = UserModel(
            username=data['username'],
            password=data['password'],
            email=data['email']
        )
        db.session.add(user)
        db.session.commit()
        return user.as_dict()