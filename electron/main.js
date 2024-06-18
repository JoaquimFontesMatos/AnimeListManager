const { app, BrowserWindow } = require("electron");
const httpServer = require("http-server");
const path = require("path");


app.whenReady().then(() => {
  server = httpServer.createServer({
    root: path.join(__dirname, "../frontend/dist/frontend/browser"),
  });

  server.listen(8080, () => {
    console.log("Server listening on port 8080");
  });

  createWindow();
});

function createWindow() {
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

  win.loadURL(`http://localhost:8080/index.html`);

  win.webContents.openDevTools();
}