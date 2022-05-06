import os
from sqlite3 import OperationalError, IntegrityError
from tkinter import E

from flask import Flask, jsonify, request
from flask_wtf.csrf import CSRFProtect
from flask_cors import CORS
UPLOAD_FOLDER = './uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

import sqlite3


if __name__ == '__main__':
    app = Flask(__name__)
    csrf = CSRFProtect()
    CORS(app)
    app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
    app.config['WTF_CSRF_ENABLED'] = False
    connection = sqlite3.connect('telemedicine_')
    cur = connection.cursor()
    try:
        cur.execute('''CREATE TABLE users
                           (login text PRIMARY KEY, password text);''')
        cur.execute('''CREATE TABLE patients (
                            id INTEGER PRIMARY KEY AUTOINCREMENT, 
                            doctor text, 
                            fio text, 
                            email text, 
                            number text,
                            FOREIGN KEY (doctor) REFERENCES users(login)
                        );''')
        cur.execute('''CREATE TABLE consult (
                            id INTEGER PRIMARY KEY AUTOINCREMENT, 
                            doctor text, 
                            patient INTEGER,
                            consultInfo text,
                            FOREIGN KEY (doctor) REFERENCES users(login),
                            FOREIGN KEY (patient) REFERENCES patients(id)
                        );''')
        connection.commit()
    except OperationalError as ex:
        pass
    finally:
        connection.close()

    @app.post('/login')
    def login():
        try:
            connection = sqlite3.connect('telemedicine_')
            cur = connection.cursor()
            res = cur.execute(
                f"select * from users where login='{request.json.get('login')}' and password = '{request.json.get('password')}';")
            user = next(res)
            if user:
                return jsonify({'status': 200, 'message': 'success', 'content': user[0]}), 200
            return jsonify({'status': 404, 'message': 'not found', 'content': ''}), 404
        except Exception as err:
            print(err)
            return jsonify({'status': 500, 'content': {}}), 500


    @app.post('/register')
    def register():
        try:
            connection = sqlite3.connect('telemedicine_')
            cur = connection.cursor()
            cur.execute(
                f"insert into users (login,password) values('{request.json.get('login')}','{request.json.get('password')}');")
            if not os.path.exists(app.config['UPLOAD_FOLDER'] + f"/{request.json.get('login')}"):
                os.makedirs(app.config['UPLOAD_FOLDER'] + f"/{request.json.get('login')}")
            connection.commit()
            connection.close()
            return jsonify({'status': 200, 'message': 'created'})
        except IntegrityError as err:
            return jsonify({'status': 400, 'message': 'exists', 'content': {}}), 400
        except Exception:
            return jsonify({'status': 500, 'content': {}}), 500


    @app.post('/addpatient')
    def addpatient():
        try:
            connection = sqlite3.connect('telemedicine_')
            cur = connection.cursor()
            cur.execute(
                '''insert into patients (doctor,fio,email,number) 
                values(
                "'''+request.json.get('doctor')+'''",
                "'''+request.json.get('fio')+'''",
                "'''+request.json.get('email')+'''",
                "'''+request.json.get('number')+'''"
                );''')
            connection.commit()
            connection.close()
            return jsonify({'status': 200, 'message': 'created'})
        except Exception:
            return jsonify({'status': 500, 'content': {}}), 500

    
    @app.post('/getpatients')
    def getpatients():
        try:
            connection = sqlite3.connect('telemedicine_')
            cur = connection.cursor()
            res = cur.execute(
                f"select * from patients where doctor='{request.json.get('doctor')}';")
            content = []
            for row in res:
                content.append({"id":row[0], "fio":row[2], "email":row[3], "number":row[4]})
            return jsonify({'status': 200, 'message': 'success', 'content':content}), 200
        except Exception as err:
            print(err)
            return jsonify({'status': 500, 'content': {}}), 500


    @app.post('/deletepatient')
    def deletepatient():
        try:
            connection = sqlite3.connect('telemedicine_')
            cur = connection.cursor()
            res = cur.execute(
                f"DELETE FROM patients WHERE id='{request.json.get('id')}';")
            connection.commit()
            connection.close()
            return jsonify({'status': 200, 'message': 'success'}), 200
        except Exception as err:
            print(err)
            return jsonify({'status': 500, 'content': {}}), 500


    @app.post('/editpatient')
    def editpatient():
        try:
            connection = sqlite3.connect('telemedicine_')
            cur = connection.cursor()
            res = cur.execute(
                f"UPDATE patients SET fio='{request.json.get('fio')}', email='{request.json.get('email')}', number='{request.json.get('number')}' WHERE id='{request.json.get('id')}';")
            connection.commit()
            connection.close()
            return jsonify({'status': 200, 'message': 'success'}), 200
        except Exception as err:
            print(err)
            return jsonify({'status': 500, 'content': {}}), 500

    
    @app.post('/addconsult')
    def addconsult():
        try:
            connection = sqlite3.connect('telemedicine_')
            cur = connection.cursor()
            cur.execute(
                '''insert into consult (doctor,patient,consultInfo) 
                values(
                "'''+request.json.get('doctor')+'''",
                '''+request.json.get('patient')+''',
                "'''+request.json.get('consultInfo')+'''"
                );''')
            connection.commit()
            connection.close()
            return jsonify({'status': 200, 'message': 'success'}), 200
        except Exception as err:
            print(err)
            return jsonify({'status': 500, 'content': {}}), 500


    @app.post('/getconsult')
    def getconsult():
        try:
            connection = sqlite3.connect('telemedicine_')
            cur = connection.cursor()
            res = cur.execute(
                f"select consultInfo from consult where doctor='{request.json.get('doctor')}' and patient={request.json.get('patient')};")
            for row in res:
                content = row[0]
            return jsonify({'status': 200, 'message': 'success', 'content':content}), 200
        except Exception as err:
            print(err)
            return jsonify({'status': 500, 'content': {}}), 500


    csrf.init_app(app)
    app.run(port=4000)
