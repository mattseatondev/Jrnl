import flask
from flask import Flask, request
from flask_cors import CORS, cross_origin
import pprint
import json

from entry import Entry
pp = pprint.PrettyPrinter(indent=3)
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)
# cors = CORS(app, resources={"/foo", {"origins": "*"}})
# app.config['CORS_HEADERS'] = 'Content-Type'
app.secret_key = 'speeblebeebleneeblegoodllleke'

@app.route('/')
def home():
    entry = Entry(True)
    return entry.entry()

@app.route('/update_entry/<type>', methods=['POST', 'OPTIONS'])
@cross_origin()
def update_entry(type):
    if request.method == 'OPTIONS':
        response = flask.jsonify({'Authorized': True})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    else:
        entry = Entry(True)
        todays_entry = entry.entry()
        data = request.get_json()
        print(data)
        # print('SECOND')
        # pp.pprint(data)
        entry.update_entry_item(type, data)
        return entry.entry_item(type)
