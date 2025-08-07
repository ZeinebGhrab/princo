"use strict";
const electron = require("electron");
const path = require("node:path");
const fs = require("fs");
process.env.DIST = path.join(__dirname, "../dist");
process.env.VITE_PUBLIC = electron.app.isPackaged ? process.env.DIST : path.join(process.env.DIST, "../public");
let win;
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
electron.ipcMain.handle("getPrinters", async () => {
  var _a;
  const printers = await ((_a = electron.BrowserWindow.getFocusedWindow()) == null ? void 0 : _a.webContents.getPrintersAsync());
  return printers;
});
electron.ipcMain.handle("printTestPage", async (_event, printerName, pdfBase64) => {
  try {
    if (!pdfBase64 || pdfBase64.trim() === "") {
      const emptyPageContent = `
        <html>
          <body>
            <h1>Ceci est une page de test</h1>
            <p>Si vous voyez cela, c'est une page de test.</p>
          </body>
        </html>
      `;
      const printWindow2 = new electron.BrowserWindow({
        show: false,
        webPreferences: {
          nodeIntegration: true
        }
      });
      printWindow2.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(emptyPageContent)}`);
      const printSettings2 = {
        silent: true,
        deviceName: printerName
      };
      printWindow2.webContents.on("did-finish-load", () => {
        printWindow2.webContents.print(printSettings2, (success, errorType) => {
          if (!success) {
            console.error("Erreur lors de l'impression de la page de test:", errorType);
          } else {
            console.log("Impression de la page de test réussie!");
          }
          printWindow2.close();
        });
      });
      return true;
    }
    const pdfData = Buffer.from(pdfBase64, "base64");
    const pdfPath = path.join(__dirname, "ticket");
    fs.writeFileSync(pdfPath, pdfData);
    const printSettings = {
      silent: true,
      deviceName: printerName,
      canPrint: true
    };
    const printWindow = new electron.BrowserWindow({
      show: false,
      webPreferences: {
        nodeIntegration: true
      }
    });
    printWindow.loadFile(path.join(__dirname, "ticket"));
    printWindow.webContents.once("did-finish-load", () => {
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
electron.ipcMain.handle("downloadPdf", async (_event, pdfBase64) => {
  try {
    const pdfData = Buffer.from(pdfBase64, "base64");
    const pdfPath = path.join(__dirname, "ticket");
    fs.writeFileSync(pdfPath, pdfData);
    const printWindow = new electron.BrowserWindow({
      show: true,
      webPreferences: {
        nodeIntegration: true
      }
    });
    printWindow.loadFile(path.join(__dirname, "ticket"));
    printWindow.webContents.downloadURL(`file://${pdfPath}`);
    printWindow.webContents.session.on("will-download", (_event2, item) => {
      item.once("done", (event, state) => {
        fs.unlinkSync(pdfPath);
        printWindow.close();
      });
    });
  } catch (error) {
    console.error("Erreur lors du chargement du ticket :", error);
    return null;
  }
});
function createWindow() {
  win = new electron.BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(__dirname, "index.html"));
  }
}
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
    win = null;
  }
});
electron.app.on("activate", () => {
  if (electron.BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
electron.app.whenReady().then(createWindow);
