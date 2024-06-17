const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false, // This is good for security reasons
      contextIsolation: true, // Recommended for security
      enableRemoteModule: false, // Recommended for security
      webSecurity: true, // Only enable this for development
    },
  });

  // Load the index.html of the Angular app.
  win.loadFile(
    path.join(__dirname, "../frontend/dist/frontend/browser/index.html")
  );

  win.webContents.openDevTools();
}

app.whenReady().then(createWindow);
