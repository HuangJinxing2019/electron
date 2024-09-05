import { ipcMain } from 'electron'

export function initBrowserWindowEvent(win){
    ipcMain.on('set-title', (event, title) => {
       win.setTitle(title)
    })
}
