import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Resource, Api

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DB_URI']
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = os.environ['TRACK_MODS']

api = Api(app)
db = SQLAlchemy(app)

class Club(Resource):
    def get(self):
        return {
                'team': ['Liverpool',
                        'Chelsea',
                        'Arsenal',
                        'Man-Utd',
                        'Man-Cty',
                        'Tottenham',
                        ],
        }

api.add_resource(Club, '/')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
