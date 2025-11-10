#!/usr/bin/env python3
"""
Development server for Single Page Application (SPA)
Serves index.html for all routes to support client-side routing
"""

import http.server
import socketserver
import os
from pathlib import Path

# Allow overriding port via env var (default 8000)
PORT = int(os.getenv('PORT', '8000'))

class SPAHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """HTTP request handler that serves index.html for all routes except files"""

    def do_GET(self):
        """Handle GET requests"""
        # Get the requested path
        path = self.translate_path(self.path)

        # If path exists as a file or directory, serve it normally
        if os.path.exists(path):
            # If it's a directory, check if it has index.html
            if os.path.isdir(path):
                index_path = os.path.join(path, 'index.html')
                if os.path.exists(index_path):
                    path = index_path
                else:
                    # For directories without index.html, serve index.html for SPA routing
                    self.path = '/index.html'
                    return super().do_GET()
            # Serve the file normally
            return super().do_GET()
        else:
            # File doesn't exist - this is likely a SPA route
            # Serve index.html instead
            self.path = '/index.html'
            return super().do_GET()

    def end_headers(self):
        """Add CORS headers for development"""
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        self.send_header('Expires', '0')
        super().end_headers()

def run_server():
    """Run the development server"""
    os.chdir(os.path.dirname(os.path.abspath(__file__)))

    with socketserver.TCPServer(("", PORT), SPAHTTPRequestHandler) as httpd:
        print(f"🚀 Development server running at http://localhost:{PORT}")
        print(f"📁 Serving directory: {os.getcwd()}")
        print(f"✨ SPA routing enabled - all routes will serve index.html")
        print(f"\n💡 Press Ctrl+C to stop the server\n")

        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\n👋 Server stopped")
            return

if __name__ == "__main__":
    run_server()
