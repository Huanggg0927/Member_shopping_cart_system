from my_store import db
from datetime import datetime
from werkzeug.security import check_password_hash, generate_password_hash
from flask_jwt_extended import jwt_required
from sqlalchemy.orm import relationship

from dotenv import load_dotenv
import os

class UserModel(db.Model):

    __tablename__ = 'user'
    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    create_time = db.Column(db.DateTime, default=datetime.now)
    role = db.Column(db.String(50), default='member')

    cart_items = db.relationship('CartModel', back_populates='user')

    def __init__(self, username, password, email, role='member'):
        self.username = username
        self.password = generate_password_hash(password)
        self.email = email
        self.role = role

    def as_dict(self):
        return {
            'user_id': self.user_id,
            'username': self.username,
            'password': self.password,
            'email': self.email,
            'role': self.role,
            'create_time': self.create_time.strftime("%Y-%m-%d %H:%M:%S") if self.create_time else None
        }
    
    def check_password(self, password):
        return check_password_hash(self.password, password)
    
    def create_admin_user_if_not_exists():
        # 檢查是否已存在管理者賬戶
        admin_exists = UserModel.query.filter_by(role='admin').first()
        if not admin_exists:
            # 如果不存在，創建一個新的管理者賬戶
            username = 'admin'
            password = os.getenv('ADMIN_PASSWORD')  # 應更改為更安全的密碼或從環境變量獲取
            email = 'admin@example.com'
            new_admin = UserModel(username=username, password=password, email=email, role='admin')
            db.session.add(new_admin)
            db.session.commit()
            print('Admin user created')
        else:
            print('Admin user already exists')