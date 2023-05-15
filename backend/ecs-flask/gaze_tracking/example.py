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

    def getPoint(self):
        return self.minX, self.maxX, self.minY, self.maxY

    def calc_dir(self, x, y):

        dw = self.W / 3
        dh = self.H / 3
        # print(f'dw : {dw} dh : {dh}')
        # print(f'x : {x} y : {y}')
        if (0 <= x < dw) and (0 <= y < dh): return 1
        elif dw <= x < dw*2 and 0 <= y < dh: return 2
        elif dw*2 <= x < dw*3 and 0 <= y < dh: return 3

        elif 0 <= x < dw and dh <= y < dh*2: return 4
        elif dw <= x < dw * 2 and dh <= y < dh*2: return 5
        elif dw * 2 <= x < dw * 3 and dh <= y < dh*2: return 6

        elif 0 <= x < dw and dh*2 <= y < dh*3: return 7
        elif dw <= x < dw * 2 and dh*2 <= y < dh*3: return 8
        elif dw * 2 <= x < dw * 3 and dh*2 <= y < dh*3: return 9

        return -1

    def getPupilPoint(self, image):

        gaze = GazeTracking()
        # src = np.zeros((self.H, self.W, 3), np.uint8)

        # print(type(frame))
        # if(type(image) != type(None)):
        #     print(image.shape)
        # We send this frame to GazeTracking to analyze it
        gaze.refresh(image)

        # frame = gaze.annotated_frame()
        # text = ""

        # if gaze.is_blinking():
        #     text = "Blinking"
        # elif gaze.is_right():
        #     text = "Looking right"
        # elif gaze.is_left():
        #     text = "Looking left"
        # elif gaze.is_center():
        #     text = "Looking center"
        #
        # cv2.putText(frame, text, (150, 100),
        #             cv2.FONT_HERSHEY_DUPLEX, 0.7, (0, 0, 255), 1)

        left_pupil = gaze.pupil_left_coords()
        right_pupil = gaze.pupil_right_coords()
        # cv2.putText(frame, "Left pupil:  " + str(left_pupil), (150, 30),
        #             cv2.FONT_HERSHEY_DUPLEX, 0.7, (0, 0, 255), 1)
        # cv2.putText(frame, "Right pupil: " + str(right_pupil), (150, 65),
        #             cv2.FONT_HERSHEY_DUPLEX, 0.7, (0, 0, 255), 1)
        #
        # cv2.putText(frame, "horizontal_ratio: " + str(gaze.horizontal_ratio()), (150, 100),
        #             cv2.FONT_HERSHEY_DUPLEX, 0.7, (0, 0, 255), 1)
        # cv2.putText(frame, "vertical_ratio: " + str(gaze.vertical_ratio()), (150, 135),
        #             cv2.FONT_HERSHEY_DUPLEX, 0.7, (0, 0, 255), 1)

        nx, ny = -1, -1
        if(type(left_pupil) != type(None) and type(right_pupil) != type(None)):
            x = (left_pupil[0] + right_pupil[0]) / 2
            y = (left_pupil[1] + right_pupil[1]) / 2
            # print(f'X : {x}, Y: {y}')
            # print(f'self.minX : {self.minX}, self.diffX: {self.diffX }')
            # print(f'self.minY : {self.minY}, self.diffY: {self.diffY}')

            # print(f'src.shape[0] : {src.shape[0]}, src.shape[1]: {src.shape[1]}\n')

            # nx = self.W - (x - self.minX) / self.diffX * self.W
            nx = (x - self.minX) / self.diffX * self.W
            ny = (y - self.minY) / self.diffY * self.H
            print(f"getPupilPoint::: x: {x}, y: {y}, nx: {nx}, ny: {ny}")
            # print(f'nX : {nx:.2f}, nY: {ny:.2f}\n')
            # src = cv2.circle(src, (int(nx), int(ny)), 5, (0, 255, 0), cv2.FILLED, cv2.LINE_4)
            # cv2.imshow("draw", src)
            # src = cv2.circle(src, (int(nx), int(ny)), 5, (0, 0, 0), cv2.FILLED, cv2.LINE_4)

        # cv2.namedWindow('Demo', cv2.WINDOW_NORMAL)
        # dst = cv2.resize(frame, (0, 0), 2, 4, cv2.INTER_LINEAR)
        # cv2.imshow("Demo", frame)
        # cv2.imshow("draw", src)
        # print(frame.shape)
        # cv2.waitKey(0)
        # cv2.destroyAllWindows()

        nx = max(nx, 0)
        nx = min(nx, self.W)
        ny = max(ny, 0)
        ny = min(ny, self.H)
        # print(f'nX : {nx:.2f}, nY: {ny:.2f}\n')

        return self.W - nx, ny, self.calc_dir(nx, ny)