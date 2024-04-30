from flask import Flask, render_template, redirect, url_for
from flask_restful import Api
from flask_migrate import Migrate
from my_store.extensions import db

from dotenv import load_dotenv
import os

from my_store.app.controllers.resources.product import Product, ProductList
from my_store.app.controllers.resources.user import User, UserList

from my_store.app.models.product import ProductModel
from my_store.app.models.user import UserModel
load_dotenv()

def create_app():

    app = Flask(__name__, template_folder='app/views', static_folder='static') # 各資料夾的指向位置需要注意
    api = Api(app)
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DB_STRING')
    db.init_app(app)
    migrate = Migrate(app, db)

    api.add_resource(Product, '/product/<string:product_name>')
    api.add_resource(ProductList, '/products')
    api.add_resource(User, '/users/<string:user_name>')
    api.add_resource(UserList, '/users')

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
    
    @app.route('/script.html')
    def script_path():
        return render_template('script.html')

    return app