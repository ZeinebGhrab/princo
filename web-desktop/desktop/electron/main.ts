import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'node:path'
import fs from 'fs';

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, '../dist')
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')


let win: BrowserWindow | null
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']

ipcMain.handle('getPrinters', async () => {
  const printers = await BrowserWindow.getFocusedWindow()?.webContents.getPrintersAsync();
  return printers;
});

ipcMain.handle('printTestPage', async (_event, printerName, pdfBase64) => {
  try {
    if (!pdfBase64 || pdfBase64.trim() === '') {

      const emptyPageContent = `
        <html>
          <body>
            <h1>Ceci est une page de test</h1>
            <p>Si vous voyez cela, c'est une page de test.</p>
          </body>
        </html>
      `;
      
      const printWindow = new BrowserWindow({
        show: false,
        webPreferences: {
          nodeIntegration: true
        }
      });

      printWindow.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(emptyPageContent)}`);

      const printSettings = {
        silent: true,
        deviceName: printerName,
      };
      
      printWindow.webContents.on('did-finish-load', () => {

        printWindow.webContents.print(printSettings, (success, errorType) => {
          if (!success) {
            console.error("Erreur lors de l'impression de la page de test:", errorType);
          } else {
            console.log("Impression de la page de test réussie!");
          }

          printWindow.close();
        });
      });

      return true;
    }

    const pdfData = Buffer.from(pdfBase64, 'base64');

    const pdfPath = path.join(__dirname, 'ticket');
    fs.writeFileSync(pdfPath, pdfData);

    const printSettings = {
      silent: true,
      deviceName: printerName,
      canPrint: true,
    };

    const printWindow = new BrowserWindow({
      show: false,
      webPreferences: {
        nodeIntegration: true
      }
    });

    printWindow.loadFile(path.join(__dirname, 'ticket'));

      
      printWindow.webContents.once('did-finish-load', () => {

        printWindow.webContents.print(printSettings, (success, errorType) => {
          if (!success) {
            console.error("Erreur lors de l'impression du ticket:", errorType);
          } else {
            console.log("Impression du ticket réussie!");
          }
  
          printWindow.close();
          if (pdfPath) {
            fs.unlinkSync(pdfPath); 
          }
        });
      });
           
    return true;
  } catch (error) {
    console.error("Erreur lors de l'impression", error);
    return false;
  }
});


ipcMain.handle('downloadPdf', async (_event, pdfBase64) => {
  try {
      const pdfData = Buffer.from(pdfBase64, 'base64');

      const pdfPath = path.join(__dirname, 'ticket');
      fs.writeFileSync(pdfPath, pdfData);
  
      const printWindow = new BrowserWindow({
        show: true,
        webPreferences: {
          nodeIntegration: true
        }
      });
  
      printWindow.loadFile(path.join(__dirname, 'ticket'));

      printWindow.webContents.downloadURL(`file://${pdfPath}`);

      printWindow.webContents.session.on('will-download', (_event, item) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        item.once('done', (event, state) => {
          fs.unlinkSync(pdfPath);
          printWindow.close();
        });
      });

  } catch (error) {
      console.error('Erreur lors du chargement du ticket :', error);
      return null;
  }
});

function createWindow() {
  win = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(__dirname, 'index.html'))
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(createWindow)


