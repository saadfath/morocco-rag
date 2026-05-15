# Thumbs-Up Car Control (Raspberry Pi + Arduino)

This folder contains everything needed for a basic demo:

- Raspberry Pi reads camera and detects thumbs-up.
- If thumbs-up is detected, Pi sends `M` to Arduino (move).
- Otherwise Pi sends `S` (stop).

## Files

- `pi_thumbs_control.py` - camera + hand detection + serial send
- `arduino_motor_example.ino` - simple Arduino motor command reader
- `setup.sh` - install dependencies and create Python venv
- `run.sh` - run the Pi controller
- `requirements.txt` - Python packages

## 1) Upload Arduino code

1. Open `arduino_motor_example.ino` in Arduino IDE.
2. Select your Arduino board and port.
3. Upload to Arduino.

## 2) Setup on Raspberry Pi

```bash
cd thumbs_car_control
chmod +x setup.sh run.sh
./setup.sh
```

## 3) Run

```bash
cd thumbs_car_control
./run.sh
```

Press `ESC` to stop the program window.

## Notes

- Arduino USB port is auto-detected (`/dev/ttyACM0` or `/dev/ttyUSB0`).
- Camera is expected at `/dev/video0`.
- Use separate motor power for motors, and connect all GND together.
