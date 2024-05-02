from flask import Flask, render_template, redirect, url_for, request, jsonify
from flask_restful import Api
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager, create_access_token
from flask_jwt_extended.exceptions import NoAuthorizationError
from datetime import timedelta
from my_store.extensions import db

# 測試 token時效 
from flask_jwt_extended import decode_token
import datetime

from dotenv import load_dotenv
import os

from my_store.app.controllers.resources.product import Product, ProductList
from my_store.app.controllers.resources.user import User

from my_store.app.models.product import ProductModel
from my_store.app.models.user import UserModel
from werkzeug.security import check_password_hash
load_dotenv()


def create_app():

    app = Flask(__name__, template_folder='app/views', static_folder='static') # 各資料夾的指向位置需要注意
    api = Api(app)

    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DB_STRING')
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(minutes=2)

    db.init_app(app)
    migrate = Migrate(app, db)
    jwt = JWTManager(app)

    api.add_resource(Product, '/product/<string:product_name>', '/product')
    api.add_resource(ProductList, '/products')
    api.add_resource(User, '/users/<string:username>', '/users')

    @app.route('/')
    def index():
        # return 'hello.world'
        return render_template('index.html')

    @app.route('/redirect')
    def redirect_example():
        # 重定向到首页
        return redirect(url_for('index'))

    @app.route('/put.html')
    def put_path():
        return render_template('put.html')

    @app.route('/get.html')
    def get_path():
        return render_template('get.html')

    @app.route('/post.html')
    def post_path():
        return render_template('post.html')

    @app.route('/delete.html')
    def delete_path():
        return render_template('delete.html')

    @app.route('/get_all.html')
    def get_all_path():
        return render_template('get_all.html')
    
    @app.route('/register.html')
    def register_path():
        return render_template('register.html')
    
    @app.route('/user_put.html')
    def user_put_path():
        return render_template('user_put.html') 

    @app.route('/user_delete.html')
    def user_delete_path():
        return render_template('user_delete.html') 
    
    @app.route('/user_get.html')
    def user_get_path():
        return render_template('user_get.html') 
    
    @app.route('/login.html')
    def login_path():
        return render_template('login.html')
    
    @app.route('/welcome.html')
    def welcome():
        return render_template('welcome.html')
    
    @app.route('/login', methods=['POST'])
    def login():
        if not request.is_json:
            return jsonify({"msg": "Missing JSON in request"}), 400

        username = request.json.get('username', None)
        password = request.json.get('password', None)
        if not username or not password:
            return jsonify({"msg": "Missing username or password"}), 400

        user = UserModel.query.filter_by(username=username).first()
        if user and user.check_password(password):
            # 创建 JWT，使用 user_id 作为身份标识
            access_token = create_access_token(identity=user.user_id)

            # 顯示 token到期時間
            time_token = decode_token(access_token)
            date_time_utc = datetime.datetime.fromtimestamp(time_token['exp'], datetime.timezone.utc)
            date_time_local = date_time_utc.astimezone()
            print("Local Date and Time:", date_time_local)

            return jsonify(access_token=access_token)
        else:
            return jsonify({"msg": "Bad username or password"}), 401
    
    @jwt.user_lookup_loader
    def user_loader_callback(_jwt_header, jwt_data):
        identity = jwt_data["sub"]
        return UserModel.query.filter_by(user_id=identity).one_or_none()
    
    @app.errorhandler(NoAuthorizationError)
    def handle_auth_error(e):
        return jsonify({"msg": "Missing Authorization Header"}), 401

    return app