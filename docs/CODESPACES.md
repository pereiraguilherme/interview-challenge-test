# GitHub Codespaces Setup Guide

This guide explains how to run the Countries Interview Challenge in GitHub Codespaces.

## 🚀 Quick Start in Codespaces

### 1. Open in Codespaces

Click the "Code" button on GitHub and select "Create codespace on main".

### 2. Configure and run

Once the Codespace opens, run the setup script:

```bash
./setup-codespaces.sh
./build.sh go          # Or typescript/python
```

This will:
- Create `frontend/.env` with the backend URL
- Create `.env` in the root for docker-compose
- Configure environment variables
- Start the application

### 3. Access the Application

1. Wait for the containers to finish building and start
2. In the **Ports** tab, find port **3000** (Frontend)
3. Click the **globe icon** 🌐 to open the frontend in your browser

✅ **Port 3001 (Backend API) is automatically set to public** via `.devcontainer/devcontainer.json` - no manual configuration needed!

## 🔧 How It Works

### Port Forwarding

Codespaces automatically forwards ports and creates URLs like:
- Frontend: `https://CODESPACE-3000.app.github.dev`
- Backend: `https://CODESPACE-3001.app.github.dev`

### Environment Configuration

The `setup-codespaces.sh` script creates a `frontend/.env` file with:

```env
REACT_APP_API_URL=https://CODESPACE-3001.app.github.dev/api
```

This tells the React app where to find the backend API.

### CORS Handling

The backend is configured to allow requests from any origin during development, which works with Codespaces' forwarded URLs.

## 🐛 Troubleshooting

### Problem: Getting 302 redirects when frontend tries to connect to backend

This is the most common issue in Codespaces.

**Root Cause:** Port 3001 is set to "Private" by default, which requires authentication. The frontend running in the browser can't authenticate, so it gets redirected (302) to a login page.

**Solution:**

1. **Stop the application** if it's running (Ctrl+C)
2. Go to the **Ports** tab in VS Code
3. Find port **3001** (Backend API)
4. Right-click → **Port Visibility** → **Public**
5. Verify it says "Public" in the Visibility column
6. **Wait 5-10 seconds** for the change to take effect
7. Restart the application: `./build.sh go`

**Verify the fix:**
```bash
# Get your backend URL from the Ports tab (copy the forwarded address)
# It should look like: https://YOUR-CODESPACE-3001.app.github.dev

# Test it (replace with your actual URL):
curl https://YOUR-CODESPACE-3001.app.github.dev/health

# Should return:
# {"status":"healthy","service":"countries-backend-go"}
```

If you still get a redirect, the port is not fully public yet. Wait another few seconds and try again.

### Problem: Frontend can't connect to backend

**Solution 1: Check port forwarding**
1. Open the "Ports" tab in VS Code
2. Verify both ports 3000 and 3001 are forwarded
3. Make sure port 3001 visibility is set to "Public"

**Solution 2: Reconfigure**
```bash
# Stop the application
docker-compose down

# Run setup again
./setup-codespaces.sh

# Restart
./build.sh go
```

**Solution 3: Manual configuration**

If automatic setup fails, manually create `frontend/.env`:

```bash
# Get your Codespace name
echo $CODESPACE_NAME

# Create .env file with your URLs
cat > frontend/.env << EOF
REACT_APP_API_URL=https://${CODESPACE_NAME}-3001.${GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}/api
EOF
```

### Problem: 302 redirects

This usually means:
1. **Port 3001 is not public** (most common) - Change visibility to Public in Ports tab and wait
2. Backend hasn't finished starting - Check `docker-compose logs backend`
3. Wrong URL configured - Verify the REACT_APP_API_URL in `.env` matches your port 3001 forwarded address
4. Port forwarding not ready - Wait 10-15 seconds after making port public

**Quick fix:**
```bash
# Full reconfiguration
docker-compose down
rm -f .env frontend/.env
./setup-codespaces.sh

# Make port 3001 PUBLIC in Ports tab
# Wait 10 seconds

./build.sh go
```

### Problem: CORS errors

The backend should handle CORS automatically. If you see CORS errors:

1. Check backend is running: `docker-compose logs backend`
2. Verify port 3001 is forwarded and public
3. Make sure you're using the forwarded URL, not localhost

## 🔍 Verifying Setup

### Check Backend

```bash
# Get your backend URL from the Ports tab
curl https://YOUR-CODESPACE-3001.app.github.dev/health

# Should return:
# {"status":"healthy","service":"countries-backend-go"}
```

### Check Frontend Config

```bash
cat frontend/.env

# Should show:
# REACT_APP_API_URL=https://YOUR-CODESPACE-3001.app.github.dev/api
```

### Check API Connection

Open browser console on the frontend and check Network tab:
- Requests should go to the Codespaces backend URL
- Status should be 200, not 302
- Response should contain country data

## 📝 For Interviewers

When running interviews in Codespaces:

1. **Setup before the interview:**
   ```bash
   ./setup-codespaces.sh
   ./build.sh go  # or preferred language
   ```

2. **Share the Codespace:**
   - Go to Codespace settings
   - Invite the candidate as a collaborator
   - They can join and see your running environment

3. **Alternative: Candidate sets up their own:**
   - Send them the repository
   - They create their own Codespace
   - Run setup script on first launch

4. **Port visibility:**
   - Make ports 3000 and 3001 public for external access
   - Or keep private if candidate is in the same Codespace session

## 📚 Additional Resources

- [GitHub Codespaces Docs](https://docs.github.com/en/codespaces)
- [Port Forwarding in Codespaces](https://docs.github.com/en/codespaces/developing-in-codespaces/forwarding-ports-in-your-codespace)
- [Environment Variables in Codespaces](https://docs.github.com/en/codespaces/managing-your-codespaces/managing-encrypted-secrets-for-your-codespaces)

## 🆘 Still Having Issues?

Common fixes:

```bash
# Full reset
docker-compose down
rm -f frontend/.env
./setup-codespaces.sh
./build.sh go

# Check everything is running
docker-compose ps
docker-compose logs backend
docker-compose logs frontend
```

Check the Ports tab:
- Both 3000 and 3001 should be running
- Port visibility should be "Public" 
- URLs should be accessible (click globe icon to test)

---

## 🔍 Understanding the 302 Issue

### Why Does This Happen?

GitHub Codespaces has three port visibility modes:

1. **Private** (default) - Only you can access, requires GitHub authentication
2. **Organization** - Anyone in your organization can access  
3. **Public** - Anyone with the URL can access (no auth required)

When a port is **Private**, accessing it requires:
- Being logged into GitHub
- Having access to the Codespace
- Browser cookies for authentication

### The Problem

When your **frontend runs in the browser**:
- It tries to make API calls to the backend at port 3001
- Port 3001 is Private by default
- The browser can't provide Codespace authentication
- GitHub redirects (302) to a login page
- Your API call fails

### The Solution

Make port 3001 **Public**:
- No authentication required
- Frontend can make direct API calls
- Works just like a production API

**This is safe for development** because:
- The port URL is long and random
- The Codespace is temporary
- Only basic country data is exposed
- No sensitive information

### Quick Check

Test if your port is properly public:

```bash
# In Codespaces terminal - construct your backend URL
echo "https://${CODESPACE_NAME}-3001.${GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}/health"

# Copy that URL and test it in your browser or local terminal (not in Codespace):
curl https://YOUR-CODESPACE-3001.app.github.dev/health

# If you get JSON: ✓ Port is public
# If you get HTML/redirect: ❌ Port is still private
```
