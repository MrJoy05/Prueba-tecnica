from flask import Flask, request, jsonify
from flask_cors import CORS
import firebase_admin
from firebase_admin import firestore, credentials

app = Flask(__name__)
CORS(app)
#Certifica que mi clave sea correcta para la api 
cred = credentials.Certificate("prueba-tecnica-10809-firebase-adminsdk-zx79o-8e4cbe5840.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

@app.route('/api/tasks', methods=['POST'])
def add_task():
    task_data = request.get_json()
    db.collection('tasks').add(task_data)
    return jsonify({"message": "La tarea se agrego correctamente"}), 201

@app.route('/api/tasks/<task_id>', methods=['PUT'])
def update_task(task_id):
    task_data = request.get_json()
    task_ref = db.collection('tasks').document(task_id)
    task_ref.update(task_data)
    return jsonify({"message": "La tarea se actualizo correctamente"}), 200

@app.route('/api/tasks/<task_id>', methods=['DELETE'])
def delete_task(task_id):
    task_ref = db.collection('tasks').document(task_id)
    task_ref.delete()
    return jsonify({"message": "La tarea se elimino correctamente"}), 200

if __name__ == '__main__':
    app.run(port=5000, debug=True)
