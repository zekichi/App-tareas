from flask import render_template, url_for, flash, redirect
from app import app, db
from models import User, Task
from flask_login import login_user, current_user, logout_user, login_required

@app.route("/")
@app.route("/home")
def home():
    task = Task.query.all()
    return render_template('home.html', task=task)

@app.route("/about")
def about():
    return render_template('about.html', title='About')