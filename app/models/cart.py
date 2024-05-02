from my_store import db

class CartItem(db.Model):
    __tablename__ = 'cartitem'
    cart_item_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.product_id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

    user = db.relationship('UserModel', backref='cart_items', lazy='select')
    product = db.relationship('ProductModel', backref='cart_items', lazy='select')

    def __init__(self, user_id, product_id, quantity):
        self.user_id = user_id
        self.product_id = product_id
        self.quantity = quantity