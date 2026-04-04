const { app, BrowserWindow } = require('electron');
const path = require('path');

// Die ID muss EXAKT so in der package.json unter appId stehen
app.setAppUserModelId("com.crumbl.clicker");

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    title: "CrumblClicker",
    // Wir nehmen das icon.png aus dem Hauptverzeichnis, 
    // da dieses mit in die App gepackt wird.
    icon: path.join(__dirname, 'icon.png'), 
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  win.loadFile('index.html');
  
  win.on('ready-to-show', () => {
    win.setTitle("CrumblClicker");
    win.show();
  });
}

// Fix für Linux/Gnome, damit die App-ID beim Starten sofort greift
app.whenReady().then(() => {
  // Verknüpft das Fenster eindeutig mit der Desktop-Datei
  if (process.platform === 'linux') {
      app.setName('crumblclicker'); 
  }
  createWindow();
});

// Beenden, wenn alle Fenster geschlossen sind (außer auf macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
