#!/usr/bin/env python3
import glob
import time

import cv2
import mediapipe as mp
import serial


BAUD = 9600
DEFAULT_PORTS = ["/dev/ttyACM0", "/dev/ttyUSB0"]


def find_serial_port():
    for port in DEFAULT_PORTS:
        if glob.glob(port):
            return port
    return None


def is_thumbs_up(hand_landmarks):
    lm = hand_landmarks.landmark

    thumb_tip = lm[4]
    thumb_ip = lm[3]

    index_tip, index_mcp = lm[8], lm[5]
    middle_tip, middle_mcp = lm[12], lm[9]
    ring_tip, ring_mcp = lm[16], lm[13]
    pinky_tip, pinky_mcp = lm[20], lm[17]

    thumb_up = thumb_tip.y < thumb_ip.y
    other_fingers_down = (
        index_tip.y > index_mcp.y
        and middle_tip.y > middle_mcp.y
        and ring_tip.y > ring_mcp.y
        and pinky_tip.y > pinky_mcp.y
    )
    return thumb_up and other_fingers_down


def main():
    port = find_serial_port()
    if not port:
        print("Arduino not found. Connect Arduino by USB.")
        return

    print(f"Connecting to Arduino on {port} ...")
    ser = serial.Serial(port, BAUD, timeout=1)
    time.sleep(2)

    mp_hands = mp.solutions.hands
    hands = mp_hands.Hands(
        static_image_mode=False,
        max_num_hands=1,
        min_detection_confidence=0.6,
        min_tracking_confidence=0.6,
    )
    mp_draw = mp.solutions.drawing_utils

    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        print("Camera not found at /dev/video0")
        ser.close()
        return

    last_cmd = None
    print("Running. Show thumbs up = move. No thumbs up = stop. Press ESC to quit.")

    try:
        while True:
            ok, frame = cap.read()
            if not ok:
                continue

            frame = cv2.flip(frame, 1)
            rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            result = hands.process(rgb)

            cmd = "S"
            if result.multi_hand_landmarks:
                hand = result.multi_hand_landmarks[0]
                mp_draw.draw_landmarks(frame, hand, mp_hands.HAND_CONNECTIONS)
                if is_thumbs_up(hand):
                    cmd = "M"

            if cmd != last_cmd:
                ser.write((cmd + "\n").encode())
                last_cmd = cmd
                print(f"Sent: {cmd}")

            label = "MOVE" if cmd == "M" else "STOP"
            color = (0, 255, 0) if cmd == "M" else (0, 0, 255)
            cv2.putText(frame, label, (20, 40), cv2.FONT_HERSHEY_SIMPLEX, 1, color, 2)

            cv2.imshow("Thumb Control", frame)
            if cv2.waitKey(1) & 0xFF == 27:
                break
    finally:
        cap.release()
        cv2.destroyAllWindows()
        hands.close()
        ser.close()


if __name__ == "__main__":
    main()
