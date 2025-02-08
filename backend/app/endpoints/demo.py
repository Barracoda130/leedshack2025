from flask import Flask, jsonify, request

from app import app
from app.models.demo import Demo
from flask import Blueprint

bp = Blueprint('demo', __name__, url_prefix='/demo')

@bp.route('/home', methods=['GET'])
def demo_endpoint():
    print("home")
    response = {
        'message': 'Hello, this is a demo endpoint!',
        'status': 'success'
    }
    return jsonify(response)

    
@bp.route('/create', methods=['GET', 'POST'])
def create_demo():
    data = request.get_json()
    print(data)
    new_demo = Demo(**data)
    new_demo.save()
    response = {
        'message': 'New demo created successfully!',
        'status': 'success'
    }
    return jsonify(response), 201

@bp.route('/get', methods=['POST'])
def get_demo_by_name(name):
    name = request.get_json().get('name')
    print("hellow")
    
    demo_item = Demo.query.filter_by(name=name).first()
    if demo_item:
        response = {
            'message': 'Demo item found!',
            'status': 'success',
            'data': demo_item.to_dict()
        }
        return jsonify(response)
    else:
        response = {
            'message': 'Demo item not found!',
            'status': 'error'
        }
        return jsonify(response), 404