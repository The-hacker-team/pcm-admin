# PCM Admin Online-Only PWA Setup Guide

## Overview
Your PCM Admin Dashboard has been successfully converted to an **Online-Only** Progressive Web App (PWA). This means users can:
- Install the app on their devices (mobile, tablet, desktop)
- Get native app-like experience
- Receive update notifications
- **Requires internet connection to function** (no offline support)

## Features Added

### 1. PWA Configuration
- **Manifest File**: `/dist/manifest.webmanifest` - Contains app metadata
- **Service Worker**: `/dist/sw.js` - Handles updates and network-only requests
- **App Icons**: Multiple sizes (192x192, 512x512) for different devices

### 2. Installation Capability
- Users will see an "Install App" prompt on supported browsers
- App can be installed on home screen/desktop
- Works like a native app when installed

### 3. Online-Only Operation
- **No offline caching** - all requests go through network
- App shows warning when internet connection is lost
- Requires active internet connection to function
- Service worker handles network-only requests

### 4. Update Notifications
- Users get notified when new versions are available
- Automatic service worker updates
- Reload prompt for immediate updates

## How to Test PWA Features

### 1. Development Testing
```bash
npm run build    # Build the app with PWA features
npm run preview  # Serve the built app (required for PWA testing)
```

### 2. Browser Testing
1. Open `http://localhost:4173` in Chrome/Edge
2. Look for install prompt in address bar
3. Open DevTools > Application > Service Workers to verify
4. Test online requirement: Disconnect internet to see offline warning

### 3. Mobile Testing (Android)
1. Open Chrome browser on your Android phone
2. Navigate to your PWA URL (must be HTTPS in production)
3. Look for "Install app" banner or tap menu (⋮) > "Add to Home screen"
4. **For Android 12+**: Look for "Install app" in the address bar
5. Follow the installation prompts
6. Check your home screen - the app icon should appear
7. Test online-only functionality and offline warning

### 4. Troubleshooting Android Installation
If the app doesn't appear on your Android home screen:

**Common Issues:**
- ❌ **Not using HTTPS**: PWA requires HTTPS (except localhost)
- ❌ **Missing manifest**: Service worker or manifest not loading
- ❌ **Invalid icons**: Icons must be proper PNG files
- ❌ **Browser cache**: Clear Chrome browser cache and try again

**Android-Specific Fixes:**
1. **Clear Chrome Data**: Settings > Apps > Chrome > Storage > Clear Cache
2. **Check Chrome Version**: Update Chrome to latest version
3. **Manual Install**: Chrome menu > "Add to Home screen" > "Install"
4. **Restart Phone**: Sometimes requires a device restart
5. **Check App Drawer**: Look in Android app drawer, not just home screen

## PWA Components

### 1. PWABadge Component (`/src/components/PWABadge.jsx`)
- Shows install prompts
- Handles update notifications
- **Displays offline warnings when internet is lost**
- Manages service worker registration for network-only requests

### 2. Updated Files
- `vite.config.js` - PWA plugin configuration
- `index.html` - PWA meta tags and theme colors
- `App.jsx` - PWA badge component integration

## Configuration Details

### Manifest Settings
```json
{
  "name": "PCM Admin Dashboard",
  "short_name": "PCM Admin",
  "description": "Online-Only Progressive Web App for PCM Administration",
  "display": "standalone",
  "orientation": "portrait-primary",
  "theme_color": "#228be6",
  "background_color": "#ffffff",
  "categories": ["business", "productivity", "utilities"],
  "icons": [
    { "src": "pwa-72x72.png", "sizes": "72x72", "type": "image/png" },
    { "src": "pwa-96x96.png", "sizes": "96x96", "type": "image/png" },
    { "src": "pwa-144x144.png", "sizes": "144x144", "type": "image/png" },
    { "src": "pwa-192x192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "pwa-512x512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "pwa-512x512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ]
}
```

### Service Worker Features
- **Network-only requests** - no offline caching
- Navigation route handling for online requests
- Automatic cleanup of outdated caches
- Skip waiting for immediate activation
- **Requires internet connection to function**

## Browser Support
- ✅ Chrome (Desktop & Mobile)
- ✅ Edge (Desktop & Mobile)  
- ✅ Safari (iOS 11.3+)
- ✅ Firefox (Desktop & Mobile)
- ✅ Samsung Internet

## Production Deployment
1. Build the app: `npm run build`
2. Deploy the `dist` folder to your web server
3. Ensure HTTPS is enabled (required for PWA)
4. Test installation prompts in production

## Benefits for Users
- **Fast Loading**: Direct network requests for real-time data
- **Always Current**: No stale cached content - always fresh data
- **Install Anywhere**: Works on phones, tablets, desktops
- **Automatic Updates**: Always get the latest version
- **Native Feel**: Full-screen, app-like experience
- **Online Security**: Requires active connection for enhanced security

Your PCM Admin Dashboard is now a fully functional **Online-Only** PWA! 🎉

## Important Notes
⚠️ **This PWA requires an active internet connection to function**
- App will show warning when offline
- No content is cached for offline use
- All requests go through the network
- Perfect for applications requiring real-time data and security

## Android Installation Guide

### Step-by-Step Installation on Android:
1. **Open Chrome**: Use Chrome browser on your Android device
2. **Visit the App**: Navigate to your PWA URL (must be HTTPS)
3. **Look for Install Options**:
   - Install banner appears automatically, OR
   - Tap Chrome menu (⋮) > "Install app" or "Add to Home screen"
4. **Confirm Installation**: Tap "Install" when prompted
5. **Find Your App**: Check home screen or app drawer for "PCM Admin"

### Android Requirements:
- ✅ Android 5.0+ (API level 21+)
- ✅ Chrome 76+ or Samsung Internet 10.1+
- ✅ HTTPS connection (required for installation)
- ✅ Valid web app manifest
- ✅ Service worker registration

### Troubleshooting Android Issues:
- **App not showing on home screen**: Check app drawer or restart device
- **Install prompt not appearing**: Clear Chrome cache and revisit
- **Installation fails**: Ensure HTTPS and valid manifest
- **App opens in browser**: Check manifest display mode is "standalone"
