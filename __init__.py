from flask import Flask, render_template, redirect, url_for, request, jsonify, session
from flask_restful import Api
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from flask_jwt_extended.exceptions import NoAuthorizationError
from datetime import timedelta
from my_store.extensions import db

from dotenv import load_dotenv
import os

from my_store.app.controllers.resources.product import Product, ProductList
from my_store.app.controllers.resources.cart import Cart, CartList
from my_store.app.controllers.resources.user import User

from my_store.app.models.product import ProductModel
from my_store.app.models.user import UserModel
from my_store.app.models.cart import CartModel
# from werkzeug.security import check_password_hash
load_dotenv()

def create_app():

    app = Flask(__name__, template_folder='app/views', static_folder='static') # 各資料夾的指向位置需要注意
    api = Api(app)
    app.secret_key = os.getenv('SESSION_SECRET_KEY')

    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DB_STRING')
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(minutes=30)

    db.init_app(app)
    with app.app_context():
        db.create_all()  # 確保數據庫表已經創建
        UserModel.create_admin_user_if_not_exists()
    migrate = Migrate(app, db)
    jwt = JWTManager(app)

    api.add_resource(Product, '/product/<string:product_name>', '/product')
    api.add_resource(ProductList, '/products')
    api.add_resource(User, '/users/<string:username>', '/users')
    api.add_resource(Cart, '/cart/<int:cart_item_id>', '/cart')
    api.add_resource(CartList, '/carts')

    @app.route('/')
    def index():
        logged_in = session.get('logged_in', False)
        products = ProductModel.query.all()
        if 'user_role' in session:
            if session['user_role'] == 'admin':
                return render_template('admin.html')
            elif session['user_role'] == 'member':
                return render_template('store.html', products=products, logged_in=logged_in)
        # return render_template('index.html')
        return render_template('store.html', products=products, logged_in=logged_in)
    
    @app.route('/redirect')
    def back_home():  # 修改函数名以避免与 `redirect` 冲突
        return redirect(url_for('index'))

    @app.route('/store_check_order.html')
    def store_check_order_path():
        return render_template('store_check_order.html')

    @app.route('/product_put.html')
    def product_put_path():
        return render_template('product_put.html')

    @app.route('/product_get.html')
    def product_get_path():
        return render_template('product_get.html')

    @app.route('/product_post.html')
    def product_post_path():
        return render_template('product_post.html')

    @app.route('/product_delete.html')
    def product_delete_path():
        return render_template('product_delete.html')

    @app.route('/product_get_all.html')
    def product_get_all_path():
        return render_template('product_get_all.html')
        
    @app.route('/user_register.html')
    def user_register_path():
        return render_template('user_register.html')
    
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
            # 創建 JWT，使用 user_id 作為身份標籤，也可以用其他唯一的特徵設定為 identity
            access_token = create_access_token(identity=user.user_id)
            session['user_role'] = user.role
            session['logged_in'] = True
            return jsonify({
                "access_token": access_token,
                "msg": "Login successful!"
            })
        else:
            return jsonify({"msg": "Bad username or password"}), 401
        
    @app.route('/signout')
    def sign_out():
        session.pop('logged_in', None)
        session.clear()
        return redirect(url_for('index')) 

    @jwt.user_lookup_loader
    def user_loader_callback(_jwt_header, jwt_data):
        identity = jwt_data["sub"]
        return UserModel.query.filter_by(user_id=identity).one_or_none()
    
    @app.errorhandler(NoAuthorizationError)
    def handle_auth_error(e):
        return jsonify({"msg": "Missing Authorization Header"}), 401

    return app