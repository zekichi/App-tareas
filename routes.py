from flask import render_template, url_for, flash, redirect, request, jsonify
from app import app, db, bcrypt
from model import User, Task
from forms import RegistrationForm, LoginForm
from flask_login import login_user, current_user, logout_user, login_required

@app.route("/")
@app.route("/home")
def home():
    tasks = Task.query.all()
    return render_template('home.html', tasks=tasks)

@app.route("/about")
def about():
    return render_template('about.html', title='About')

@app.route("/register", methods = ['GET', 'POST'])
def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
        user = User(username = form.username.data, email = form.email.data, password = hashed_password)
        db.session.add(user)
        db.session.commit()
        flash('Your account has been created! You are now able to log in', 'success')
        return redirect(url_for('login'))
    return render_template('register.html', title = 'Registe', form = form)

@app.route("/login", methods = ['GET', 'POST'])
def login ():
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user and bcrypt.check_password_hash(user.password, form.password.data):
            login_user(user, remember = form.remember.data)
            return redirect(url_for('home'))
        else:
            flash('Login Unsuccesful. Please check email and password', 'danger')
    return render_template('login.html', title = 'Login', form = form)

@app.route("/logout")
def logout():
    logout_user()
    return redirect(url_for('home'))

# API routes
@app.route("/api/register", methods=['POST'])
def api_register():
    data = request.get_json()
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    user = User(username=data['username'], email=data['email'], password=hashed_password)
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'User created!'}), 201

@app.route("/api/login", methods=['POST'])
def api_login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if user and bcrypt.check_password_hash(user.password, data['password']):
        return jsonify({'message': 'Login successful!'}), 200
    return jsonify({'message': 'Login failed!'}), 401

@app.route("/api/tasks", methods=['POST'])
@login_required
def create_task():
    data = request.get_json()
    task = Task(title=data['title'], content=data['description'], user_id=current_user.id)
    db.session.add(task)
    db.session.commit()
    return jsonify(task.to_dict()), 201

@app.route('/api/tasks/<int:task_id>', methods=['PUT'])
@login_required
def update_task(task_id):
    task = Task.query.filter_by(id=task_id, user_id = current_user.id).first()
    if task is None:
        return jsonify({'message': 'Task not found!'}), 404
    task.title = data.get('title', task.title)
    task.description = data.get('description', task.description)
    db.session.commit()
    return jsonify(task.to_dict())

@app.route('/api/tasks/<int:task_id>', methods=['DELETE'])
@login_required
def delete_task(task_id):
    task = Task.query.filter_by(id=task_id, user_id = current_user.id).first()
    if task is None:
        return jsonify({'message': 'Task not found!'}), 404
    db.session.delete(task)
    db.session.commit()
    return '', 204