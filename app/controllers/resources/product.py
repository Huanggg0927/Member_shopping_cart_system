from my_store import db
from flask_restful import Resource
from my_store.app.models.product import ProductModel
from flask_jwt_extended import jwt_required
from my_store.app.models.cart import CartModel

from flask import jsonify, request

class Product(Resource):

    def get(self, product_name):
        try:
            product = ProductModel.query.filter_by(name=product_name).first()
            if product:
                return product.as_dict(), 200 
            else:
                return {'message': 'Product not found'}, 404 
        except Exception as e:
            return {'message': str(e)}, 500 
        
    def delete(self, product_name):
        product = ProductModel.query.filter_by(name=product_name).first()
        product_items = CartModel.query.filter_by(product_id =product.product_id).all()
        if product:
            for product_item in product_items:
                db.session.delete(product_item)
            db.session.delete(product)
            db.session.commit()
            return {'message': 'Product successfully deleted'}, 200
        else:
            return {'message': 'Product not found'}, 404 
        
    def put(self, product_name):
        try:
            product = ProductModel.query.filter_by(name=product_name).first()
            if not product:
                return {'message': 'Product not found'}, 404

            data = request.get_json()
            
            product.name = product.name
            product.brand = data.get('brand') or product.brand
            product.category = data.get('category') or product.category
            product.price = data.get('price') or product.price
            product.stock = data.get('stock') or product.stock
            product.main_image_url = data.get('main_image_url') or product.main_image_url

            db.session.commit()
            return {'message': 'Product updated successfully'}, 200
        except Exception as e:
            db.session.rollback()
            return {'message': str(e)}, 500
        
    def post(self):
        data = request.get_json()
        if not data:
            return {'message': 'No input data provided'}, 400
        
        name = data.get('name')
        brand = data.get('brand')
        category = data.get('category')
        price = data.get('price')
        stock = data.get('stock')
        main_image_url = data.get('main_image_url')
        
        if not all([name, brand, price, category, stock, main_image_url]):
            return {'message': 'Missing data'}, 400

        if ProductModel.query.filter_by(name=name).first():
            return {'message': f'Product with name {name} already exists'}, 409

        new_product = ProductModel(name=name, brand=brand, category=category, price=price, stock=stock, main_image_url=main_image_url)
        
        try:
            db.session.add(new_product)
            db.session.commit()
            return {
                'message': 'Product created successfully',
                'product': {
                    'name': new_product.name,
                    'brand': new_product.brand,
                    'category': new_product.category,
                    'price': new_product.price,
                    'stock': new_product.stock,
                    'main_image_url': new_product.main_image_url,
                }
            }, 201
        except Exception as e:
            db.session.rollback()
            return {'message': str(e)}, 500

class ProductList(Resource):

    @jwt_required()
    def get(self):
        data = ProductModel.query.all()
        return jsonify([product.as_dict() for product in data])