from my_store import db
from sqlalchemy.orm import relationship

class ProductModel(db.Model):
    __tablename__ = 'product'
    product_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    brand = db.Column(db.String(100))
    category = db.Column(db.String(100))
    price = db.Column(db.Float)
    stock = db.Column(db.Integer)
    main_image_url = db.Column(db.String(255))

    cart_items = db.relationship('CartModel', back_populates='product')

    def __init__(self, name, brand, category, price, stock, main_image_url):
        self.name = name
        self.brand = brand
        self.category = category
        self.price = price
        self.stock = stock
        self.main_image_url = main_image_url

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
