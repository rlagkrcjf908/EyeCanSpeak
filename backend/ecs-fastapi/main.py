from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import base64
import cv2
import numpy as np
from gaze_tracking.example import Example
from gaze_tracking import GazeTracking

setting_point = {}
user_object = {}

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class point(object):
    def __init__(self, minX, maxX, minY, maxY):
        self.minX = minX
        self.maxX = maxX
        self.minY = minY
        self.maxY = maxY

class Setting_request(BaseModel):
    imgSrc: str
    index: int
    userNo: int

class Image_request(BaseModel):
    image: bool
    buffer: str
    userNo: int

class Image_response(BaseModel):
    x: float
    y: float
    dir: int

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

    return hor_face_ratio, ver_face_ratio

@app.post("/flask/setting")
async def handle_image_api(setting: Setting_request):
    userNo = setting.userNo
    index = setting.index
    image = setting.imgSrc

    base_str = image.split(',')[1]
    im_bytes = base64.b64decode(base_str)
    im_arr = np.frombuffer(im_bytes, dtype=np.uint8)
    img = cv2.imdecode(im_arr, flags=cv2.IMREAD_COLOR)
    print("Setting Image Shape: ", img.shape)

    hor_face_ratio, ver_face_ratio = getSettingRatio(img)
    if type(hor_face_ratio) == type(None) or type(ver_face_ratio) == type(None):
        return 400

    if index == 1:
        setting_point[userNo] = [(0, 0), (0, 0), (0, 0), (0, 0)]
    setting_point[userNo][index - 1] = (hor_face_ratio, ver_face_ratio)

    # 세팅이 끝났을 경우
    if index == 4:
        setObject(userNo)

    print(f"setting point: {setting_point[userNo]}")
    print(f"userNo: {userNo}, index: {index}")

    return [200, 0, 0]

@app.post("/flask/position", response_model=Image_response)
async def handle_image_api(image: Image_request):
    userNo = image.userNo
    base_str = image.buffer.split(',')[1]
    im_bytes = base64.b64decode(base_str)
    im_arr = np.frombuffer(im_bytes, dtype=np.uint8)
    img = cv2.imdecode(im_arr, flags=cv2.IMREAD_COLOR)

    X, Y, DIR = user_object[userNo].getRatio(img)
    print(X, Y, DIR)
    print()
    return {'x': X, "y": Y, "dir": DIR}

@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}
