import base64
import io
import random
import cv2
import numpy as np
from PIL import Image
from gaze_tracking.example import Example


from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit, join_room, leave_room
from flask_cors import CORS


app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
CORS(app, resources={r"/*": {"origins": "*"}})
socketio = SocketIO(app, cors_allowed_origins="*")


@app.route("/http-call")
def http_call():
    """return JSON with string data as the value"""
    data = {'data': 'This text was fetched using an HTTP call to server on render'}
    return jsonify(data)


@socketio.on("connect")
def connected():
    """event listener when client connects to the server"""
    room = request.sid
    print(room)
    print("client has connected")

    join_room(room)
    emit("connect", {"data": f"id: {request.sid} is connected"}, room=room)


@socketio.on('data')
def handle_message(data):
    """event listener when client types a message"""
    print("data from the front end: ", str(data))
    room = request.sid
    emit("data", {'data': data, 'id': request.sid}, room=room)


@socketio.on('data')
def handle_message(data):
    """event listener when client types a message"""
    # 랜덤x,y

    x = random.randrange(1, 500)
    y = random.randrange(1, 500)

    print("data from the front end: ", str(data))
    room = request.sid
    emit("data", {'data': data, 'id': request.sid, 'x': x, 'y': y}, room=room)


@socketio.on('imageConversionByClient')
def handle_image(image):
    """event listener when client types a message"""
    # print("image from the front end: ", str(image))
    room = request.sid

    base_str = image['buffer'].split(',')[1]
    im_bytes = base64.b64decode(base_str)
    im_arr = np.frombuffer(im_bytes, dtype=np.uint8)
    img = cv2.imdecode(im_arr, flags=cv2.IMREAD_COLOR)
    # cv2.imshow("test", img)
    example = Example()
    X, Y, DIR = example.test(img)
    print(f"x: {X} y: {Y}, dir:{DIR}")
    emit("image", {'image': image, 'id': request.sid, 'x': X, 'y': Y, 'dir': DIR}, room=room)
    # emit("image", {'id': request.sid, 'x': X, 'y': Y, 'dir': DIR}, room=room)


@socketio.on('test')
def handle_image(data):
    """event listener when client types a message"""
    print("data from the front end: ", str(data))
    room = request.sid

    emit("test", {'data': data, 'id': request.sid}, room=room)


@socketio.on("disconnect")
def disconnected():
    """event listener when client disconnects to the server"""
    print("user disconnected")
    room = request.sid
    leave_room(room)
    emit("disconnect", f"user {request.sid} disconnected", room=room)


if __name__ == '__main__':
    socketio.run(app, debug=True, host='0.0.0.0', port=5000)
