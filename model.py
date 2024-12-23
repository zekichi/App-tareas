from datetime import datetime
from app import db, login
from flask_login import UserMixin

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    image_file = db.Column(db.String(20), nullable=False, default='default.jpg')
    password = db.Column(db.String(60), nullable=False)
    tasks = db.relationship('Task', backref='athor', lazy=True)

    def __repr__(self):
        return f"User('{self.username}', '{self.email}', '{self.image_file}')"
    
class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    date_posted = db.Column(db.Datetime, nullable=False, default=datetime.utcnow)
    content = db.Columnn(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeingKey('user_id'), nullable=False)

    def __repr__(self):
        return f"Task('{self.title}', '{self.date_posted}')"