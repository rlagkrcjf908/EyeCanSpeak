"""
Demonstration of the GazeTracking library.
Check the README.md for complete documentation.
"""

import cv2
import numpy as np

from gaze_tracking import GazeTracking

class Example(object):
    def __init__(self):
        self.frame = ""
        self.minX = 314.5
        self.maxX = 324.0
        self.minY = 215.5
        self.maxY = 217.5
        self.diffX = self.maxX - self.minX
        self.diffY = self.maxY - self.minY
        self.W = 640
        self.H = 480

    def test(self, image):
        frame = image

        gaze = GazeTracking()
        src = np.zeros((self.H, self.W, 3), np.uint8)

        # print(type(frame))
        if(type(frame) != type(None)):
            print(frame.shape)
        # We send this frame to GazeTracking to analyze it
        gaze.refresh(frame)

        frame = gaze.annotated_frame()
        text = ""

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
            print(f'X : {x}, Y: {y}')
            print(f'self.minX : {self.minX}, self.diffX: {self.diffX }')
            print(f'self.minY : {self.minY}, self.diffY: {self.diffY}')

            print(f'src.shape[0] : {src.shape[0]}, src.shape[1]: {src.shape[1]}\n')

            nx = src.shape[1] - (x - self.minX) / self.diffX * src.shape[1]
            ny = (y - self.minY) / self.diffY * src.shape[0]
            print(f'nX : {nx:.2f}, nY: {ny:.2f}\n')
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

        return nx, ny, 5


