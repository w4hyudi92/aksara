from flask import Flask, render_template, url_for, flash, redirect, session, logging, request
import mysql.connector
from wtforms import Form, StringField, TextAreaField, PasswordField, validators
from passlib.hash import sha256_crypt
from functools import wraps

from model.model_training import model_report, conf_report
from plot.plot import pie_chart

import os
from werkzeug.utils import secure_filename

import pandas as pd
from model.model_training import modelNB
from model.data_preprocessing import preProcessingData


app = Flask(__name__)

app.config['UPLOAD_FOLDER'] = 'data'

# Config MySQL
mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="bayes"
)

# Home
@app.route('/')
def index():
    # if 'logged_in' in session:
    #     return render_template('home.html')
    # else:
    #     return redirect(url_for('login'))

         return redirect(url_for('dashboard'))


# About
@app.route('/about')
def about():
    return render_template('about.html')


# datashet
@app.route('/datashet', methods=['GET', 'POST'])
def datashet():
    if request.method == 'POST':
        f = request.files['file']
        if 'csv' in f.filename:
            filename = secure_filename(f.filename)
            f.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            flash("Sukses mengupload data yang ingin diprediksi", "success")
        elif f.filename == "":
            flash("Tidak ada file yang diupload", "danger")
        else:
            flash("Format file salah", "danger")
        return render_template('datashet.html')

    return render_template('datashet.html')


# Analisa
@app.route('/analisa', methods=['GET', 'POST'])
def analisa():
    df_test = pd.read_csv('data/df_test.csv')

    df_test = df_test.dropna(how="all", axis=0)
    df_test['tweet'] = df_test['tweet'].astype('str')

    df_test['cleaned_tweet'] = df_test['tweet'].apply(preProcessingData)

    prediction = list(modelNB.predict(df_test['cleaned_tweet']))
    
    count_positive = prediction.count('Positif')
    count_negative = prediction.count('Negatif')
    total_tweet_analyzed = len(prediction)
    percentage_positive = round(count_positive / total_tweet_analyzed * 100, 1)
    percentage_negative = round(count_negative / total_tweet_analyzed * 100, 1)
    pie_plot = pie_chart([count_positive, count_negative])

    # print(model_report)
    # print(conf_report)

    if request.method == 'POST':
        mycursor = mydb.cursor()
        mycursor.execute(
            "INSERT INTO hasil_klasifikasi (total_tweet, positif, negatif, netral, model_accuracy) VALUES(%s, %s, %s, %s, %s)",
            (total_tweet_analyzed, count_positive, count_negative, 0, model_report['accuracy'])
        )
        mydb.commit()
        mycursor.close()
        flash('Sukses mengirim data hasil klasifikasi ke database', 'success')

    return render_template('analisa.html', result={
        'count_negative': count_negative,
        'count_positive': count_positive,
        'total_tweet': total_tweet_analyzed,
        'percentage_negative': percentage_negative,
        'percentage_positive': percentage_positive,
        'pie_plot': pie_plot,
    }, model_report=model_report, conf_report=conf_report)


# USer
@app.route('/users')
def users():
    mycursor = mydb.cursor(dictionary=True)
    mycursor.execute("SELECT * FROM users")
    result = mycursor.fetchall()
    if result:
        return render_template('users.html', users=result)
    else:
        msg = 'No User Found'
        return render_template('users.html', msg=msg)
    mycursor.close()


# Articles
@app.route('/articles')
def articles():
    mycursor = mydb.cursor(dictionary=True)
    mycursor.execute("SELECT * FROM articles")
    result = mycursor.fetchall()
    if result:
        return render_template('articles.html', articles=result)
    else:
        msg = 'No Articles Found'
        return render_template('articles.html', msg=msg)
    mycursor.close()


# Single Article
@app.route('/find_article/<string:id>/')
def find_article(id):
    mycursor = mydb.cursor(dictionary=True)
    mycursor.execute("SELECT * FROM articles WHERE id = %s", [id])
    result = mycursor.fetchone()
    mycursor.close()
    return render_template('find_article.html', article=result)


# Register Form Class
class RegisterForm(Form):
    name = StringField('Name', [validators.Length(min=1, max=50)])
    username = StringField('Username', [validators.Length(min=4, max=25)])
    email = StringField('Email', [validators.Length(min=6, max=50)])
    password = PasswordField('Password', [validators.DataRequired(), validators.EqualTo('confirm', message='Passwords do not match')])
    confirm = PasswordField('Confirm Password')

# User Register
@app.route('/register', methods=['GET', 'POST'])
def register():
    form = RegisterForm(request.form)
    if request.method == 'POST' and form.validate():
        name = form.name.data
        email = form.email.data
        username = form.username.data
        password = sha256_crypt.encrypt(str(form.password.data))

        mycursor = mydb.cursor()
        mycursor.execute("INSERT INTO users (name, email, username, password) VALUES(%s, %s, %s, %s)", (name, email, username, password))
        mydb.commit()
        mycursor.close()

        flash('Users Created', 'success')
        return redirect(url_for('dashboard'))

    return render_template('register.html', form=form)

# User login
@app.route('/login', methods=['GET', 'POST'])
def login():
    df_test = pd.read_csv('data/df_test.csv')

    df_test = df_test.dropna(how="all", axis=0)
    df_test['tweet'] = df_test['tweet'].astype('str')

    df_test['cleaned_tweet'] = df_test['tweet'].apply(preProcessingData)

    prediction = list(modelNB.predict(df_test['cleaned_tweet']))
    
    count_positive = prediction.count('Positif')
    count_negative = prediction.count('Negatif')
    total_tweet_analyzed = len(prediction)
    percentage_positive = round(count_positive / total_tweet_analyzed * 100, 1)
    percentage_negative = round(count_negative / total_tweet_analyzed * 100, 1)
    pie_plot = pie_chart([count_positive, count_negative])
    if request.method == 'POST':
        username = request.form['username']
        password_candidate = request.form['password']

        mycursor = mydb.cursor(dictionary=True)
        mycursor.execute("SELECT * FROM users WHERE username = %s", [username])
        result = mycursor.fetchone()
        if result:
            password = result['password']
            if sha256_crypt.verify(password_candidate, password):
                session['logged_in'] = True
                session['username'] = username

                flash('You are now logged in', 'success')
                # return redirect(url_for('dashboard'))
            else:
                error = 'Invalid login'
                return render_template('login.html', error=error)
            mycursor.close()
        else:
            error = 'Username not found'
            return render_template('login.html', error=error)

    return render_template('dashboard.html', result={
        'count_negative': count_negative,
        'count_positive': count_positive,
        'total_tweet': total_tweet_analyzed,
        'percentage_negative': percentage_negative,
        'percentage_positive': percentage_positive,
        'pie_plot': pie_plot,
    }, model_report=model_report, conf_report=conf_report)


# Check if user logged in
def is_logged_in(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if 'logged_in' in session:
            return f(*args, **kwargs)
        else:
            # flash('Unauthorized, Please login', 'danger')
            return redirect(url_for('login'))

            # return redirect(url_for('dashboard'))
    return wrap

# Logout
@app.route('/logout')
@is_logged_in
def logout():
    session.clear()
    flash('You are now logged out', 'success')
    return redirect(url_for('login'))

# Dashboard
@app.route('/dashboard')
@is_logged_in
def dashboard():
    mycursor = mydb.cursor(dictionary=True)
    mycursor.execute("SELECT * FROM articles WHERE author = %s", [session['username']])
    result = mycursor.fetchall()

    df_test = pd.read_csv('data/df_test.csv')

    df_test['cleaned_tweet'] = df_test['tweet'].apply(preProcessingData)

    prediction = list(modelNB.predict(df_test['cleaned_tweet']))
    
    count_positive = prediction.count('Positif')
    count_negative = prediction.count('Negatif')
    total_tweet_analyzed = len(prediction)
    percentage_positive = round(count_positive / total_tweet_analyzed * 100, 1)
    percentage_negative = round(count_negative / total_tweet_analyzed * 100, 1)
    pie_plot = pie_chart([count_positive, count_negative])
    if result:
        return render_template('dashboard.html', result={
        'count_negative': count_negative,
        'count_positive': count_positive,
        'total_tweet': total_tweet_analyzed,
        'percentage_negative': percentage_negative,
        'percentage_positive': percentage_positive,
        'pie_plot': pie_plot,
    }, model_report=model_report, conf_report=conf_report)
    else:
        msg = ''
        return render_template('dashboard.html', result={
        'count_negative': count_negative,
        'count_positive': count_positive,
        'total_tweet': total_tweet_analyzed,
        'percentage_negative': percentage_negative,
        'percentage_positive': percentage_positive,
        'pie_plot': pie_plot,
    }, model_report=model_report, conf_report=conf_report)
    mycursor.close()


# Article Form Class
class ArticleForm(Form):
    title = StringField('Title', [validators.Length(min=1, max=200)])
    body = TextAreaField('Body', [validators.Length(min=30)])


class UsersForm(Form):

    name = StringField('Name', [validators.Length(min=1, max=50)])
    username = StringField('Username', [validators.Length(min=4, max=25)])
    email = StringField('Email', [validators.Length(min=6, max=50)])
    password = PasswordField('Password', [validators.DataRequired()])


# Add Article
@app.route('/add_article', methods=['GET', 'POST'])
@is_logged_in
def add_article():
    form = ArticleForm(request.form)
    if request.method == 'POST' and form.validate():
        title = form.title.data
        body = form.body.data

        mycursor = mydb.cursor()
        mycursor.execute("INSERT INTO articles (title, body, author) VALUES (%s, %s, %s)", (title, body, session['username']))
        mydb.commit()
        mycursor.close()

        flash('Article Created', 'success')
        return redirect(url_for('dashboard'))

    return render_template('add_article.html', form=form)

# Edit Article
@app.route('/edit_article/<string:id>', methods=['GET', 'POST'])
@is_logged_in
def edit_article(id):
    mycursor = mydb.cursor(dictionary=True)
    mycursor.execute("SELECT * FROM articles WHERE id = %s", [id])
    result = mycursor.fetchone()
    mycursor.close()

    form = ArticleForm(request.form)
    form.title.data = result['title']
    form.body.data = result['body']

    if request.method == 'POST' and form.validate():
        title = request.form['title']
        body = request.form['body']

        mycursor = mydb.cursor()
        app.logger.info(title)
        mycursor.execute("UPDATE articles SET title=%s, body=%s WHERE id=%s", (title, body, id))
        mydb.commit()
        mycursor.close()

        flash('Article Updated', 'success')
        return redirect(url_for('dashboard'))

    return render_template('edit_article.html', form=form)


# Delete Article
@app.route('/delete_article/<string:id>', methods=['POST'])
@is_logged_in
def delete_article(id):
    mycursor = mydb.cursor()
    mycursor.execute("DELETE FROM articles WHERE id = %s", [id])
    mydb.commit()
    mycursor.close()

    flash('Article Deleted', 'success')
    return redirect(url_for('dashboard'))


# Edit Users
@app.route('/edit_users/<string:id>', methods=['GET', 'POST'])
@is_logged_in
def edit_users(id):
    mycursor = mydb.cursor(dictionary=True)
    mycursor.execute("SELECT * FROM users WHERE id = %s", [id])
    result = mycursor.fetchone()
    mycursor.close()

    form = UsersForm(request.form)
    form.username.data = result['username']
    form.name.data = result['name']
    form.email.data = result['email']
    form.password.data = result['password']

    if request.method == 'POST' and form.validate():
        username = request.form['username']
        name = request.form['name']
        email = request.form['email']
        enkrip = request.form['password']
        password = sha256_crypt.encrypt(str(enkrip))

        mycursor = mydb.cursor()
        app.logger.info(name)
        mycursor.execute("UPDATE users SET  name=%s , email=%s ,username=%s, password=%s WHERE id=%s", (name, email, username, password, id))
        mydb.commit()
        mycursor.close()

        flash('Users Updated', 'success')
        return redirect(url_for('users'))

    return render_template('edit_users.html', form=form)


# Delete Article
@app.route('/delete_users/<string:id>', methods=['POST'])
@is_logged_in
def delete_users(id):
    mycursor = mydb.cursor()
    mycursor.execute("DELETE FROM users WHERE id = %s", [id])
    mydb.commit()
    mycursor.close()

    flash('Users Deleted', 'success')
    return redirect(url_for('dashboard'))

if __name__ == "__main__":
    app.secret_key = '0b579d376dc5dde856e0a0ddca6f403cc8707924ff8d6d31'
    app.run(debug=True)
