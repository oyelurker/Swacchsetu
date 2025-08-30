#!/bin/bash
echo "Creating directories..."
mkdir -p model logs captured_images

echo "Installing Python dependencies..."
python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt

echo "Setup complete! Run with:"
echo "source venv/bin/activate && python main.py"