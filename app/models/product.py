from my_store.extensions import db

class ProductModel(db.Model):
    __tablename__ = 'product'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    brand = db.Column(db.String(100))
    # 配合前端按鈕功能，點選新增標籤。 藉此統一格式
    category = db.Column(db.String(100))
    price = db.Column(db.Float)
    stock = db.Column(db.Integer)
    main_image_url = db.Column(db.String(255))

    def __init__(self, name, brand, category, price, stock, main_image_url):
        self.name = name
        self.brand = brand
        self.category = category
        self.price = price
        self.stock = stock
        self.main_image_url = main_image_url

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}