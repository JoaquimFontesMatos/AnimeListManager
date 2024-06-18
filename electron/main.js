const { app, BrowserWindow } = require("electron");
const { spawn } = require("child_process");
const path = require("path");

function createWindow() {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      webSecurity: true,
    },
  });

  // Load the frontend URL.
  win.loadURL(`http://localhost:8080/index.html`);

  // Open the DevTools.
  win.webContents.openDevTools();
}

app.whenReady().then(() => {
  // Start the Express server from the backend directory
  const serverNode = spawn("node", [
    path.join(__dirname, "backend/bin/www"),
  ]);

  serverNode.stdout.on("data", (data) => {
    console.log(`Server: ${data}`);
  });

  serverNode.stderr.on("data", (data) => {
    console.error(`Server Error: ${data}`);
  });

  serverNode.on("close", (code) => {
    console.log(`Server process exited with code ${code}`);
  });

  createWindow();
});