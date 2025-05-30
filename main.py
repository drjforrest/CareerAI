import os
import sys
import webview
import subprocess
from threading import Thread

def start_next_server():
    # Start Next.js server
    subprocess.run(['npm', 'run', 'dev'], cwd=os.path.dirname(os.path.abspath(__file__)))

def main():
    # Start Next.js server in a separate thread
    server_thread = Thread(target=start_next_server)
    server_thread.daemon = True
    server_thread.start()

    # Create a window that points to the Next.js app
    webview.create_window('CareerAI', 'http://localhost:9002', width=1200, height=800)
    webview.start()

if __name__ == '__main__':
    main()
