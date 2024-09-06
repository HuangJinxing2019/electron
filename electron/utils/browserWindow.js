import { ipcMain } from 'electron'

export function initBrowserWindowEvent(win){
    ipcMain.on('set-title', (event, title) => {
       win.setTitle(title)
    })
    ipcMain.handle('get-title', (event) => {
        return win.title
    })
}
