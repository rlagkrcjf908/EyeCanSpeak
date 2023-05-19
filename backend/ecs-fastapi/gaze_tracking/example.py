"""
Demonstration of the GazeTracking library.
Check the README.md for complete documentation.
"""
import math

import cv2
import numpy as np

from gaze_tracking import GazeTracking

class Example(object):
    def __init__(self, point):
        self.minX = point.minX
        self.maxX = point.maxX
        self.minY = point.minY
        self.maxY = point.maxY
        self.diffX = self.maxX - self.minX
        self.diffY = self.maxY - self.minY
        self.W = 640
        self.H = 480

    def getRatio(self, image):
        gaze = GazeTracking()
        gaze.refresh(image)

        # 양쪽 눈 비율 가지고 오기
        hor_face_ratio = gaze.horizontal_face_ratio()
        ver_face_ratio = gaze.vertical_face_ratio()

        left_pupil = gaze.pupil_left_coords()
        right_pupil = gaze.pupil_right_coords()

        print(f'before hor:{hor_face_ratio} ver:{ver_face_ratio}')

        if(gaze.is_blinking() or type(left_pupil)==type(None) or type(right_pupil)==type(None) or type(hor_face_ratio) == type(None) or type(ver_face_ratio) == type(None)):
            hor_face_ratio = (self.minX + self.maxX) / 2
            ver_face_ratio = (self.minY + self.maxY) / 2
            return hor_face_ratio, ver_face_ratio, 5

        # h_ratio = (hor_face_ratio - self.minX) / (self.diffX)
        # v_ratio = (ver_face_ratio - self.minY) / (self.diffY)

        h_ratio = hor_face_ratio
        v_ratio = ver_face_ratio

        print(f'hor:{h_ratio} ver:{v_ratio}')
        return h_ratio, v_ratio, self.calc_dir2(h_ratio, v_ratio)


    def calc_dir(self, x, y):

        dw = self.W / 3
        dh = self.H / 3

        x = int(x)
        y = int(y)

        # print(f'dw : {dw} dh : {dh}')
        # print(f'x : {x} y : {y}')
        if (x < dw) and (y < dh): return 1
        elif dw <= x < dw*2 and y < dh: return 2
        elif dw*2 <= x  and  y < dh: return 3

        elif  x < dw and dh <= y < dh*2: return 4
        elif dw <= x < dw * 2 and dh <= y < dh*2: return 5
        elif dw * 2 <= x  and dh <= y < dh*2: return 6

        elif  x < dw and dh*2 <= y : return 7
        elif dw <= x < dw * 2 and dh*2 <= y : return 8
        elif dw * 2 <= x  and dh*2 <= y : return 9

        return -1

    def calc_dir2(self, x, y):

        x = float(x)
        y = float(y)

        if (x < self.minX) and (y < self.minY):
            return 1
        elif self.minX <= x < self.maxX and y < self.minY:
            return 2
        elif self.maxX <= x and y < self.minY:
            return 3

        elif x < self.minX and self.minY <= y < self.maxY:
            return 4
        elif self.minX <= x < self.maxX and self.minY <= y < self.maxY:
            return 5
        elif self.maxX <= x and self.minY <= y < self.maxY:
            return 6

        elif x < self.minX and self.maxY <= y:
            return 7
        elif self.minX <= x < self.maxX and self.maxY <= y:
            return 8
        elif self.maxX <= x and self.maxY <= y:
            return 9

        return -1

    def calc_dir3(self, x, y):

        dw = 1/3
        dh = 1/3

        x = float(x)
        y = float(y)

        # print(f'dw : {dw} dh : {dh}')
        # print(f'x : {x} y : {y}')
        if (x < dw) and (y < dh): return 1
        elif dw <= x < dw*2 and y < dh: return 2
        elif dw*2 <= x  and  y < dh: return 3

        elif  x < dw and dh <= y < dh*2: return 4
        elif dw <= x < dw * 2 and dh <= y < dh*2: return 5
        elif dw * 2 <= x  and dh <= y < dh*2: return 6

        elif  x < dw and dh*2 <= y : return 7
        elif dw <= x < dw * 2 and dh*2 <= y : return 8
        elif dw * 2 <= x  and dh*2 <= y : return 9

        return -1