import { ipcMain } from 'electron'

export function initBrowserWindowEvent(win){
    ipcMain.on('set-title', (event, title) => {
        // win.title = title
       win.setTitle(title)
    })
    ipcMain.handle('get-title', () => {
        return win.title
    })
    ipcMain.handle('set-shadow', (event, flag) => {
        win.shadow = flag
        return { key: 'shadow', value: win.shadow };
    })
    ipcMain.handle('setMenuBarVisible', (event, flag) => {
        win.menuBarVisible = flag
        return { key: 'menuBarVisible', value: win.menuBarVisible };
    })
    ipcMain.handle('setKiosk', (event, flag) => {
        win.kiosk = flag
        return { key: 'kiosk', value: win.kiosk };
    })
    ipcMain.handle('setMinimizable', (event, flag) => {
        win.minimizable = flag
        return { key: 'minimizable', value: win.minimizable };
    })
    ipcMain.handle('setMaximizable', (event, flag) => {
        win.maximizable = flag
        return { key: 'maximizable', value: win.maximizable };
    })
    ipcMain.handle('setFullScreenable', (event, flag) => {
        win.fullScreenable = flag
        return { key: 'fullScreenable', value: win.fullScreenable };
    })
    ipcMain.handle('setResizable', (event, flag) => {
        win.resizable = flag
        return { key: 'resizable', value: win.resizable };
    })
    ipcMain.handle('setClosable', (event, flag) => {
        win.closable = flag
        return { key: 'closable', value: win.closable };
    })
    ipcMain.handle('setMovable', (event, flag) => {
        win.movable = flag
        return { key: 'movable', value: win.movable };
    })
    ipcMain.handle('setSimpleFullScreen', (event, flag) => {
        win.simpleFullScreen = flag
        return { key: 'simpleFullScreen', value: win.simpleFullScreen };
    })
    ipcMain.handle('setFullScreen', (event, flag) => {
        win.fullScreen = flag
        return { key: 'fullScreen', value: win.fullScreen };
    })
}
