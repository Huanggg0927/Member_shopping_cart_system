from my_store import db
from flask_restful import Resource
from my_store.app.models.cart import CartModel
from my_store.app.models.product import ProductModel
from my_store.app.models.user import UserModel
from flask import request, jsonify

from flask_jwt_extended import JWTManager, decode_token, jwt_required, get_jwt_identity

from dotenv import load_dotenv
import os
load_dotenv()

class Cart(Resource):

    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        user = UserModel.query.filter_by(user_id=user_id).first()
        if user:
            cart_items = []
            total_price = 0  # 初始化總金額為0
            for cart_item in user.cart_items:
                item_price = cart_item.product.price * cart_item.quantity
                total_price += item_price  # 累計每個項目加總
                item_details = {
                    'cart_id': cart_item.cart_item_id,
                    'name': cart_item.product.name,
                    'quantity': cart_item.quantity,
                    'price': item_price  # 單個項目總價
                }
                cart_items.append(item_details)
            # 返回購物車總金額
            return jsonify({
                'items': cart_items,
                'totalPrice': total_price
            })
        else:
            return {'message': 'User not found or not authenticated'}, 404
            
    def post(self):
        product_name = request.form.get('product_name')
        access_token = request.form.get('access_token')
        quantity = request.form.get('quantity')

        decoded = decode_token(access_token)
        user_id = decoded.get('sub')

        product = ProductModel.query.filter_by(name=product_name).first()
        if product is None:
            return {'message': 'Product not found'}, 404
        try:
            quantity_int = int(quantity)
        except ValueError:
            return {'message': 'Invalid quantity provided'}, 400

        if product.stock < quantity_int:
            return {'message': 'Stock is not enough'}, 404
        
        # 扣除 存貨功能 應該在付款後才實現
        # product.sell_product(quantity)

        cart = CartModel(
            user_id=user_id,
            product_id=product.product_id,
            quantity=quantity
        )
        try :
            db.session.add(cart)
            db.session.commit()
            return {
                'message': 'Cart created successfully',
                'Cart': {
                    'user_id': cart.user_id,
                    'product_id': cart.product_id,
                    'quantity': cart.quantity
                }
            }, 201
        except Exception as e:
            db.session.rollback()
            return {'message': str(e)}, 500
        
    def delete(self, cart_item_id):
        print(cart_item_id)
        cart = CartModel.query.filter_by(cart_item_id=cart_item_id).first()
        if cart:
            db.session.delete(cart)
            db.session.commit()
            return {'message': 'cart deleted successfully'}, 200
        else:
            return {'message': 'cart not found'}, 404
        
    def put(self, cart_item_id):
        try : 
            cart = CartModel.query.filter_by(cart_item_id=cart_item_id).first()
            if not cart:
                return {'message': 'cart not found'}, 404
            
            data = request.get_json()

            cart.user_id = cart.user_id
            cart.product_id = cart.product_id
            cart.quantity = data.get('quantity') or cart.quantity

            db.session.commit()
            return {
                'message': 'cart updated successfully',
                'Cart':{
                    'user_id': cart.user_id,
                    'product_id': cart.product_id,
                    'quantity': cart.quantity
                }
            }
        except Exception as e:
            db.session.rollback()
            return {'message': str(e)}, 500