from my_store import db
from flask_restful import Resource, reqparse
from my_store.app.models.user import UserModel
from flask import jsonify, request
from werkzeug.security import check_password_hash, generate_password_hash
from flask_jwt_extended import jwt_required

class User(Resource):

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

    @jwt_required()
    def get(self, username):
        user = UserModel.query.filter_by(username=username).first()
        if user:
            return user.as_dict(), 200
        else :
            return {'message': 'User not found !'}, 404
        
    @jwt_required()    
    def delete(self, username):
        user = UserModel.query.filter_by(username=username).first()
        if user:
            db.session.delete(user)
            db.session.commit()
            return {'message': 'User Successfully deleted'},200
        else :
            return {'message': 'User not found !'}, 404

    @jwt_required()    
    def put(self, username):  # 注意這裡的參數名稱從 username 改為 user_name
        try:
            user = UserModel.query.filter_by(username=username).first()
            if not user:
                return {'message': 'User not found !'}, 404

            data = request.get_json()

            password = data.get('password') or user.password
            user.username = data.get('new_name') or user.username
            user.password = generate_password_hash(password)
            user.email = data.get('email') or user.email

            db.session.commit()
            return {'message': 'User updated successfully'}, 200
        except Exception as e:
            db.session.rollback()
            return {'message': str(e)}, 500
        
    def post(self):
        data  = User.parser.parse_args()
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