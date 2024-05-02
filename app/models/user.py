from my_store import db
from datetime import datetime
from werkzeug.security import check_password_hash, generate_password_hash
from flask_jwt import jwt_required

class UserModel(db.Model):

    __tablename__ = 'user'
    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    create_time = db.Column(db.DateTime, default=datetime.now)

    def __init__(self, username, password, email):
        self.username = username
        self.password = generate_password_hash(password)
        self.email = email

    def as_dict(self):
        return {
            'user_id': self.user_id,
            'username': self.username,
            'password': self.password,  # 通常不應該返回密碼
            'email': self.email,
            'create_time': self.create_time.strftime("%Y-%m-%d %H:%M:%S") if self.create_time else None
        }
    
    def check_password(self, password):
        return check_password_hash(self.password, password)
    