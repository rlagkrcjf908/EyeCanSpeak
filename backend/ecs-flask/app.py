import base64

import cv2
import numpy as np
from gaze_tracking.example import Example
from gaze_tracking import GazeTracking

from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit, join_room, leave_room
from flask_cors import CORS

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
CORS(app, resources={r"/*": {"origins": "*"}})
socketio = SocketIO(app,
                    # logger = True,
                    # engineio_logger = True,
                    cors_allowed_origins="*")

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

        if x > maxX:
            maxX = x
        if x < minX:
            minX = x
        if y > maxY:
            maxY = y
        if y < minY:
            minY = y

    return minX, maxX, minY, maxY


def setObject(userNo):
    # setting 좌표로부터 x, y의 min, max 좌표 구하기
    minX, maxX, minY, maxY = calc_cood(setting_point[userNo])
    # 사용자별 gazeTrackin Object를 Dictionary에 저장
    user_object[userNo] = Example(point(minX, maxX, minY, maxY))


def getSettingPoint(image):
    # 이미지로부터 얼굴 분석
    gaze = GazeTracking()
    gaze.refresh(image)

    # 양쪽 눈 좌표 가지고 오기
    left_pupil = gaze.pupil_left_coords()
    right_pupil = gaze.pupil_right_coords()

    x, y = -1, -1
    # 양쪽 눈의 좌표가 존재하는 경우, 각 눈의 평균값을 화면 좌표로 지정
    if (type(left_pupil) != type(None) and type(right_pupil) != type(None)):
        x = (left_pupil[0] + right_pupil[0]) / 2
        y = (left_pupil[1] + right_pupil[1]) / 2

    return x, y


def print_ratio(gaze):
    hor_ratio = gaze.horizontal_ratio()
    ver_ratio = gaze.vertical_ratio()
    if type(hor_ratio) != type(None):
        hor_ratio = round(hor_ratio, 2)
    if type(ver_ratio) != type(None):
        ver_ratio = round(ver_ratio, 2)

    hor_face_ratio = gaze.horizontal_face_ratio()
    ver_face_ratio = gaze.vertical_face_ratio()
    if type(hor_face_ratio) != type(None):
        hor_face_ratio = round(hor_face_ratio, 2)
    if type(ver_face_ratio) != type(None):
        ver_face_ratio = round(ver_face_ratio, 2)

    margin_x = 0
    margin_y = 0
    if type(hor_ratio) != type(None) and type(ver_ratio) != type(None):
        print("Eye base")
        print(f'hor:{hor_ratio} ver:{ver_ratio}')
        print(
            f'{gaze.eye_left.pupil.x}   {gaze.eye_right.pupil.x}   {gaze.eye_left.pupil.y}   {gaze.eye_right.pupil.y}')
        print(
            f'{gaze.eye_left.center[0] * 2 - margin_x} {gaze.eye_right.center[0] * 2 - margin_x} {gaze.eye_left.center[1] * 2 - margin_y} {gaze.eye_right.center[1] * 2 - margin_y}')

        print(
            f'{gaze.eye_left.center[0]} {gaze.eye_right.center[0]} {gaze.eye_left.center[1]} {gaze.eye_right.center[1]}')
        print(f'{gaze.eye_left.frame.shape}')

    if type(hor_face_ratio) != type(None) and type(ver_face_ratio) != type(None):
        print("Face base")
        print(f'hor:{hor_face_ratio} ver:{ver_face_ratio}')
        print(
            f'{gaze.eye_left.pupil.x + gaze.eye_left.face_origin[0]}   {gaze.eye_right.pupil.x + gaze.eye_right.face_origin[0]}   {gaze.eye_left.pupil.y + gaze.eye_left.face_origin[1]}   {gaze.eye_right.pupil.y + gaze.eye_right.face_origin[1]}')
        print(
            f'{gaze.eye_left.face_center[0] * 2 - margin_x} {gaze.eye_right.face_center[0] * 2 - margin_x} {gaze.eye_left.face_center[1] * 2 - margin_y} {gaze.eye_right.face_center[1] * 2 - margin_y}')

        print(
            f'{gaze.eye_left.face_center[0]} {gaze.eye_right.face_center[0]} {gaze.eye_left.face_center[1]} {gaze.eye_right.face_center[1]}')
        print(f'{gaze.eye_left.face_frame.shape}')


def getSettingRatio(image):
    '''
    이미지로부터 현재 동공의 위치를 얼굴 이미지 내에서의 위치 비 계산
    '''
    # 이미지로부터 얼굴 분석
    gaze = GazeTracking()
    gaze.refresh(image)

    # 양쪽 눈 비율 가지고 오기
    hor_face_ratio = gaze.horizontal_face_ratio()
    ver_face_ratio = gaze.vertical_face_ratio()

    print_ratio(gaze)
    return hor_face_ratio, ver_face_ratio


@app.route("/flask/setting", methods=['POST'])
def setting():
    # Request Data
    userNo = request.json.get('userNo')
    index = request.json.get('index')
    image = request.json.get('imgSrc')

    # base64 String to Image
    base_str = image.split(',')[1]
    im_bytes = base64.b64decode(base_str)
    im_arr = np.frombuffer(im_bytes, dtype=np.uint8)
    img = cv2.imdecode(im_arr, flags=cv2.IMREAD_COLOR)

    # 비율 가져오기
    hor_face_ratio, ver_face_ratio = getSettingRatio(img)
    # 동공 좌표 가져오기
    x, y = getSettingPoint(img)

    if x == -1 or y == -1:
        # 얼굴 인식하지 못하였을 경우
        return jsonify(400)

    # 사용자별 setting 좌표를 저장할 Dictionary 초기화
    if index == 1:
        setting_point[userNo] = [(0, 0), (0, 0), (0, 0), (0, 0)]
    setting_point[userNo][index - 1] = (hor_face_ratio, ver_face_ratio)

    # 세팅이 끝났을 경우
    if index == 4:
        setObject(userNo)

    print(f"userNo: {userNo}, index: {index}")
    print(x, y)

    return jsonify(200, x, y)


# API Test
@app.route("/flask/http-call", methods=['POST', 'GET'])
def http_call():
    """return JSON with string data as the value"""
    data = {'data': 'This text was fetched using an HTTP call to server on render'}
    return jsonify(data)


# Image api _ base64
@app.route("/flask/position", methods=['POST'])
def handle_image_api():
    image = request.json

    # userNo = -1
    # if 'userNo' in image:
    #     userNo = image['userNo']
    # else:
    #     return

    userNo = image['userNo']

    # base64 String to Image
    base_str = image['buffer'].split(',')[1]
    im_bytes = base64.b64decode(base_str)
    im_arr = np.frombuffer(im_bytes, dtype=np.uint8)
    img = cv2.imdecode(im_arr, flags=cv2.IMREAD_COLOR)

    X, Y, DIR = user_object[userNo].getRatio(img)
    print(X, Y, DIR)

    return jsonify({'x': X, "y": Y, "dir": DIR})


# 이미지 소켓 통신
@socketio.on('imageConversionByClient')
def handle_image(image):
    """event listener when client types a message"""
    # print("imageConversionByClient::::", str(image))
    room = request.sid

    print("imageConversionByClient::::", room)
    # emit("image", {'image': image, 'id': request.sid, 'x': 0, 'y': 0, 'dir': 5}, room=room)
    # return

    # userNo = -1
    # #
    # if 'userNo' in image:
    #     userNo = image['userNo']
    # else:
    #     emit("image", {'image': image, 'id': request.sid, 'x': 0, 'y': 0, 'dir': 5}, room=room)
    #     return

    # print(image)
    userNo = image['userNo']

    # base64 String to Image
    base_str = image['buffer'].split(',')[1]
    im_bytes = base64.b64decode(base_str)
    im_arr = np.frombuffer(im_bytes, dtype=np.uint8)
    img = cv2.imdecode(im_arr, flags=cv2.IMREAD_COLOR)
    # print("Image Shape: ", img.shape)
    # cv2.imshow("test", img)

    # Get pupil point
    # Setting에서 생성한 user별 gazeTracking 객체로부터 화면상 좌표 구하기
    X, Y, DIR = user_object[userNo].getPupilPoint(img)

    # 좌표의 비율 값 구하기 (client에서 비율에 따른 화면상 좌표를 구하기 위해)
    rX = X / img.shape[1]
    rY = Y / img.shape[0]
    print(f"SocketImage::: sid: {room}, x: {X} y: {Y}, rx: {rX}, y: {rY}, dir:{DIR}")

    # emit("image", {'image': image, 'id': request.sid, 'x': -1, 'y': -1, 'dir': -1}, room=room)
    emit("image", {'image': image, 'id': request.sid, 'x': rX, 'y': rY, 'dir': DIR}, room=room)
    # emit("image", {'image': image, 'id': request.sid, 'x': 0, 'y': 0, 'dir': 0}, room=room)
    # emit("image", {'id': request.sid, 'x': X, 'y': Y, 'dir': DIR}, room=room)

    getSettingRatio(img)
    # cv2.waitKey(0)
    # cv2.destroyAllWindows()


@socketio.on("connect")
def connected():
    """event listener when client connects to the server"""
    room = request.sid
    print(room)
    print("client has connected")

    # Test용
    user_object[-1] = Example(point(0, 680, 0, 480))
    user_object[-2] = Example(point(314.5, 323.0, 231.0, 234.0))

    join_room(room)
    emit("connect", {"data": f"id: {request.sid} is connected"}, room=room)


@socketio.on("disconnect")
def disconnected():
    """event listener when client disconnects to the server"""
    print("user disconnected")
    room = request.sid
    leave_room(room)
    emit("disconnect", f"user {request.sid} disconnected", room=room)


@socketio.on('test')
def handle_message(data):
    """event listener when client types a message"""
    # print("data from the front end: ", str(data))
    room = request.sid

    base_str = data['buffer'].split(',')[1]
    im_bytes = base64.b64decode(base_str)
    im_arr = np.frombuffer(im_bytes, dtype=np.uint8)
    img = cv2.imdecode(im_arr, flags=cv2.IMREAD_COLOR)

    x, y = getSettingPoint(img)
    print(x, y)

    emit("test", {'id': request.sid, 'x': x, 'y': y}, room=room)


if __name__ == '__main__':
    socketio.run(app, debug=True, host='0.0.0.0', port=5000)