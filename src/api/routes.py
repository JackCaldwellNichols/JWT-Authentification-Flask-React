"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os 
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)


# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = User.query.filter(User.email == email).first()

    if user is None:
        return jsonify({"message": "invalid user"}), 403
    else:
        access_token = create_access_token(identity=email)
        return jsonify(access_token=access_token)

@api.route('/user', methods=['POST'])
def add_user():
    request_body_user = request.get_json()
    user = {}
    if request_body_user is None:
        return({"msg: The body is empty"}), 

    user = User(email=request_body_user["email"], password=request_body_user["password"])
    db.session.add(user)
    db.session.commit()

    return jsonify(request_body_user), 201

# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/userinfo", methods=["GET"])
@jwt_required()
def get_user_info():
    email = get_jwt_identity()
    dictionary = {
        "message":  "You are logged in, " + email
    }
    
    return jsonify(dictionary)

@api.route('/user', methods=['GET'])
def get_all_users(): 
   users = User.query.all()
   result = []  
   for user in users:  
       user_data = {}  
       user_data['email'] = user.email
       user_data['password'] = user.password
     
       result.append(user_data)  
   return jsonify({'users': result})
