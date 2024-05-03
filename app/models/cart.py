from my_store import db
from sqlalchemy import ForeignKey

class CartModel(db.Model):
    __tablename__ = 'cartitem'
    cart_item_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey('user.user_id'), nullable=False)
    product_id = db.Column(db.Integer, ForeignKey('product.product_id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

    product = db.relationship('ProductModel', lazy=True)
    user = db.relationship('UserModel', back_populates='cart_items')

    def __init__(self, user_id, product_id, quantity):
        self.user_id = user_id
        self.product_id = product_id
        self.quantity = quantity

    def to_dict(self):
        return {
            'cart_item_id': self.cart_item_id,
            'user_id': self.user_id,
            'product_id': self.product_id,
            'quantity': self.quantity
        }