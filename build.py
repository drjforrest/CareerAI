import PyInstaller.__main__
import os

def build_app():
    # Get the absolute path of the current directory
    base_path = os.path.abspath(os.path.dirname(__file__))
    
    PyInstaller.__main__.run([
        'main.py',
        '--name=CareerAI',
        '--onefile',
        '--windowed',
        f'--add-data={os.path.join(base_path, ".next")}:.next',
        f'--add-data={os.path.join(base_path, "node_modules")}:node_modules',
        f'--add-data={os.path.join(base_path, "public")}:public',
        '--icon=public/favicon.ico',
    ])
