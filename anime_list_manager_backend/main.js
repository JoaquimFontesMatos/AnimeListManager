const { app, BrowserWindow } = require("electron");
const { exec } = require("child_process");
const http = require('http');
const kill = require('tree-kill'); // Import the tree-kill package
const axios = require('axios'); // You can use any library to make HTTP requests

let serverProcess; // Keep a reference to the server process

function createWindow() {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  const loadURL = () => {
    http.get('http://localhost:4200', (res) => {
      if (res.statusCode === 200) {
        win.loadURL("http://localhost:4200");
      } else {
        setTimeout(loadURL, 1000);
      }
    }).on('error', () => {
      setTimeout(loadURL, 1000);
    });
  };

  loadURL();
}

app.whenReady().then(createWindow);