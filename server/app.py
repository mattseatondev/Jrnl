
from flask import Flask, request
from flask_cors import CORS, cross_origin
import pprint
import json

from entry import Entry
pp = pprint.PrettyPrinter(indent=3)

app = Flask(__name__)
app.secret_key = 'speeblebeebleneeblegoodllleke'

@app.route('/')
def home():
    entry = Entry(True)
    return entry.entry()

@app.route('/update_entry/<type>', methods=['POST'])
def update_entry(type):

    entry = Entry(False)
    todays_entry = entry.entry()
    data = json.loads(request.data)
    entry.update_entry_item(type, data)
    return entry.entry_item(type)
