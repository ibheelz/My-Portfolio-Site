# Development Server Setup

## The Problem

This is a **Single Page Application (SPA)** that uses client-side routing. When you refresh a page on a route like `/creative-designer` or `/branding`, the browser tries to find a file at that path on the server. Since these routes only exist on the client-side (in React), you get a 404 error.

## The Solution

Use the included `server.py` which properly handles SPA routing by serving `index.html` for all routes.

## How to Run the Development Server

### Option 1: Using the Python Server (Recommended)

```bash
# From the project directory, run:
python3 server.py

# Or make it executable and run directly:
chmod +x server.py
./server.py
```

The server will start on **http://localhost:8000**

### Option 2: Stop any existing server first

If you have a server already running, stop it first:
```bash
# Find the process
lsof -i :8000

# Kill it (replace PID with the actual process ID)
kill <PID>

# Or kill all Python HTTP servers
pkill -f "python.*http.server"
```

Then start the new server:
```bash
python3 server.py
```

## What the Server Does

✅ Serves `index.html` for all routes (fixes 404 on refresh)
✅ Properly serves static files (images, CSS, JS, PDFs)
✅ Handles `/Resume.pdf` correctly
✅ Works with React Router
✅ Disables caching for development

## Production Deployment

For production deployment on Apache servers, the `.htaccess` file is included which:
- Handles SPA routing
- Sets proper MIME types
- Enables compression
- Configures browser caching

For other servers (Nginx, etc.), you'll need to configure them to serve `index.html` for all routes.

### Nginx Example:
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

### Netlify/Vercel:
These platforms automatically handle SPA routing, but you can add a `_redirects` or `vercel.json` file if needed.

## Testing

1. Start the server: `python3 server.py`
2. Open http://localhost:8000
3. Navigate to a character page (e.g., click on a character)
4. **Hard refresh** (Cmd+Shift+R or Ctrl+Shift+F5)
5. The page should load correctly (no 404)
6. Click "View Resume" - PDF should open in a new tab

## Troubleshooting

**Q: Still getting 404 errors?**
A: Make sure you're using `server.py` and not `python -m http.server`

**Q: Resume button not working?**
A: Check that `Resume.pdf` exists in the root directory and the server is running

**Q: Changes not showing up?**
A: Hard refresh (Cmd+Shift+R or Ctrl+Shift+F5) to clear browser cache

**Q: Port 8000 already in use?**
A: Edit `server.py` and change the `PORT` variable to a different number (e.g., 8080)

---
**Created:** 2025-10-24
**Purpose:** Fix SPA routing issues and Resume.pdf access
