from flask import Flask, render_template, request, redirect, url_for, jsonify
from flask_cors import CORS
from mysql.connector import connect, Error

from flask_bcrypt import Bcrypt
from flask_bcrypt import check_password_hash

###create a simple flask application

app = Flask(__name__) # entry point for app
CORS(app, origins=['http://localhost:3000'])

app.config['MYSQL_HOST'] = 'host.docker.internal'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '' #'user-password'
app.config['MYSQL_DB'] = 'db1'

def get_mysql_connection():
    try:
        connection = connect(
            host=app.config['MYSQL_HOST'],
            user=app.config['MYSQL_USER'],
            password=app.config['MYSQL_PASSWORD'],
            database=app.config['MYSQL_DB']
        )
        return connection
    except Error as e:
        print(f"Error: {e}")
        return None

@app.route("/", methods=["GET"])
def welcome():
    return "<h1>Welcome</h1>"

@app.route('/api',methods=["POST"])
def sum_():
    data = dict(request.get_json())
    a_value = float(data['a'])
    b_value = float(data['b'])
    return jsonify(a_value+b_value)

bcrypt = Bcrypt()
@app.route('/add_user', methods=['POST'])
def add_user():
    user = dict(request.get_json())
    name, email,password = user['name'],user['email'],user['password']
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    
    connection = get_mysql_connection()
    if connection is not None:
        try:
            with connection.cursor(dictionary=True) as cursor:
                cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
                user = cursor.fetchall()
                if user:
                    return jsonify(f'user {email} already exists')
                cursor.execute("INSERT INTO users (name, email,hashed_password) VALUES (%s, %s,%s)", (name, email,hashed_password))
                connection.commit()
                return jsonify('user added successfully!')
        except Error as e:
            return jsonify(f"Something went wong")
        finally:
            connection.close() 
    

@app.route('/sign_user', methods=['POST'])
def sign_user():
    user = dict(request.get_json())
    email,password = user['email'],user['password']
    connection = get_mysql_connection()
    if connection is not None:
        try:
            with connection.cursor(dictionary=True) as cursor:
                cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
                user = cursor.fetchone()
                print('user',user)
                if not user:
                    return jsonify({'isUser':False}), 404 
                if check_password_hash(user['hashed_password'], password):
                    return jsonify({'Id':user['id'], 'name': user['name']})
                else:
                    return jsonify({'isPassword':False})
        except Error as e:
            # return jsonify({'isUser':False})
            return jsonify({'error': 'Something went wrong, User not found'}), 500
        finally:
            connection.close() 
    return jsonify([])       

# config = {
#     'user': 'root',
#     'password': 'Bqwe@12345',
#     'host': 'host.docker.internal',#'192.168.32.1',
#     'database': 'db1',
# }
try:
    # Attempt to connect to the MySQL database
    conn = get_mysql_connection()
    if conn.is_connected():
        print("MySQL is active and reachable.")
        conn.close()
except Exception as e:
    print("Something went wong")


@app.route('/get_users', methods=['GET'])
def get_users():
    connection = get_mysql_connection()
    if connection is not None:
        try:
            with connection.cursor(dictionary=True) as cursor:
                cursor.execute("SELECT * FROM users")
                users = cursor.fetchall()
                return jsonify(users)
               
        except Error as e:
            print("Something went wong")
        finally:
            connection.close()

    return jsonify([])


# @app.route('/get_count', methods=['GET'])
# def get_count():
#     connection = get_mysql_connection()
#     if connection is not None:
#         try:
#             with connection.cursor(dictionary=True) as cursor:
#                 cursor.execute("SELECT * FROM balaji1100_gmail_com")
#                 users = cursor.fetchall()
#                 return jsonify(users)
               
#         except Error as e:
#             print("Something went wrong")
#         finally:
#             connection.close()

# update-game-history
@app.route('/update-game-history', methods=['POST'])
def update_game_history():
    # user = dict(request.get_json())
    # id, guessCount = user['id'], user['guessCount']
    data = request.get_json()
    user_id = data.get('Id')
    guessed_count = data.get('guessCount')

   
    connection = get_mysql_connection()
    if connection is not None:
        try:
            with connection.cursor(dictionary=True) as cursor:
                cursor.execute("INSERT INTO user_history (user_id, guessed_count) VALUES (%s, %s)", (user_id, guessed_count))
                connection.commit()
                response_message = f"Updated game history with ID {user_id} and guessCount {guessed_count}"
                return jsonify({'message': response_message}), 200
        except Error as e:
            return jsonify(f"Something went wrong")
        finally:
            connection.close() 
    
@app.route('/user_history/<int:user_id>', methods=['GET'])
def get_user_history(user_id):
    connection = get_mysql_connection()
    if connection is not None:
        try:
            with connection.cursor(dictionary=True) as cursor:
                cursor.execute("SELECT * FROM user_history where user_id = %s",(user_id,))
                history = cursor.fetchall()
                return jsonify(history)
               
        except Error as e:
            print("Something went wong")
        finally:
            connection.close()

    return jsonify([])

    # return jsonify([])
if __name__=="__main__":
    app.run(debug=True,host='0.0.0.0')#,host='0.0.0.0'
    