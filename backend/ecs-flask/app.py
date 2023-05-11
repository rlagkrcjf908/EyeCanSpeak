import base64
import io
import random
import cv2
import numpy as np
from PIL import Image
from gaze_tracking.example import Example
from gaze_tracking import GazeTracking

from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit, join_room, leave_room
from flask_cors import CORS


app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
CORS(app, resources={r"/*": {"origins": "*"}})
socketio = SocketIO(app, cors_allowed_origins="*")

setting_point = {}
user_object = {}

class point(object):
    def __init__(self, minX, maxX, minY, maxY):
        self.minX = minX
        self.maxX = maxX
        self.minY = minY
        self.maxY = maxY

def calc_cood(points):
    minX, maxX, minY, maxY = 1e9, 0, 1e9, 0

    for x, y in points:

        if x > maxX: maxX = x
        if x < minX: minX = x
        if y > maxY: maxY = y
        if y < minY: minY = y

    return minX, maxX, minY, maxY

def setObject(userNo):

    minX, maxX, minY, maxY = calc_cood(setting_point[userNo])
    user_object[userNo] = Example(point(minX, maxX, minY, maxY))


#setting
@app.route("/flask/setting", methods = ['POST'])
def setting():

    # room = request.sid
    # print(room)
    userNo = request.json.get('userNo')
    # print(userNo)
    index = request.json.get('index')
    # print(index)
    image = request.json.get('imgSrc')
    # print(image)

    print(f"userNo: {userNo}, index: {index}")

    base_str = image.split(',')[1]
    im_bytes = base64.b64decode(base_str)
    im_arr = np.frombuffer(im_bytes, dtype=np.uint8)
    img = cv2.imdecode(im_arr, flags=cv2.IMREAD_COLOR)

    x, y = getSettingPoint(img)
    if x == -1 or y == -1: return jsonify(400)
    print(x, y)

    if index == 1:
        setting_point[userNo] = [(0, 0), (0, 0), (0, 0), (0, 0)]

    setting_point[userNo][index - 1] = (x, y)
    if index == 4:
        setObject(userNo)

    return jsonify(200, x, y)

def getSettingPoint(image):

    gaze = GazeTracking()
    gaze.refresh(image)

    left_pupil = gaze.pupil_left_coords()
    right_pupil = gaze.pupil_right_coords()

    x, y = -1, -1
    if(type(left_pupil) != type(None) and type(right_pupil) != type(None)):
        x = (left_pupil[0] + right_pupil[0]) / 2
        y = (left_pupil[1] + right_pupil[1]) / 2

    return x, y


@app.route("/flask/http-call", methods = ['POST', 'GET'])
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

    user_object[-1] = Example(point(0, 680, 0, 480))
    user_object[-2] = Example(point(314.5, 323.0, 231.0, 234.0))

    join_room(room)
    emit("connect", {"data": f"id: {request.sid} is connected"}, room=room)


# @socketio.on('data')
# def handle_message(data):
#     """event listener when client types a message"""
#     print("data from the front end: ", str(data))
#     room = request.sid
#     emit("data", {'data': data, 'id': request.sid}, room=room)

@socketio.on('data')
def handle_message(data):
    """event listener when client types a message"""
    # 랜덤x,y

    x = random.randrange(1, 500)
    y = random.randrange(1, 500)

    # print("data from the front end: ", str(data))
    print("data from the front end: ")
    room = request.sid
    emit("data", {'data': data, 'id': request.sid, 'x': x, 'y': y}, room=room)

@socketio.on('imageConversionByClient')
def handle_image(image):
    """event listener when client types a message"""
    # print("imageConversionByClient::::", str(image))
    print("imageConversionByClient::::")

    userNo = -1
    room = request.sid
    if 'userNo' in image:
        userNo = image['userNo']
    else:
        emit("image", {'id': request.sid, 'x': 0, 'y': 0, 'dir': 5}, room=room)
        return

    # print("userNo:::", userNo)

    # base64 String to Image
    base_str = image['buffer'].split(',')[1]
    im_bytes = base64.b64decode(base_str)
    im_arr = np.frombuffer(im_bytes, dtype=np.uint8)
    img = cv2.imdecode(im_arr, flags=cv2.IMREAD_COLOR)
    # cv2.imshow("test", img)

    # Get pupil point
    X, Y, DIR = user_object[userNo].getPupilPoint(img)
    print(f"x: {X} y: {Y}, dir:{DIR}")
    rX = X / img.shape[1]
    rY = Y / img.shape[0]
    print(f"rx: {rX} y: {rY}")

    # emit("image", {'image': image, 'id': request.sid, 'x': -1, 'y': -1, 'dir': -1}, room=room)
    emit("image", {'image': image, 'id': request.sid, 'x': rX, 'y': rY, 'dir': DIR}, room=room)
    # emit("image", {'image': image, 'id': request.sid, 'x': 0, 'y': 0, 'dir': 0}, room=room)
    # emit("image", {'id': request.sid, 'x': X, 'y': Y, 'dir': DIR}, room=room)


@socketio.on("disconnect")
def disconnected():
    """event listener when client disconnects to the server"""
    print("user disconnected")
    room = request.sid
    leave_room(room)
    emit("disconnect", f"user {request.sid} disconnected", room=room)


if __name__ == '__main__':
    socketio.run(app, debug=True, host='0.0.0.0', port=5000)


