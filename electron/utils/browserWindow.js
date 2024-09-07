import {BrowserWindow, ipcMain, nativeImage} from 'electron'

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
    // 获取所有打开的窗口的数组
    ipcMain.handle('getAllWindows', () => {
        return { key: 'getAllWindows', value: BrowserWindow.getAllWindows().map(item => ({id: item.id, title: item.title }))};
    })
    // 获取所有打开的窗口的数组
    ipcMain.handle('getFocusedWindow', () => {
        const brow = BrowserWindow.getFocusedWindow()
        return { key: 'getFocusedWindow', value: brow && { id: brow.id, title: brow.title } || null };
    })
    // 获取所有打开的窗口的数组
    ipcMain.handle('fromId', (event, id) => {
        const brow = BrowserWindow.fromId(id)
        return { key: 'fromId', value: brow && { id: brow.id, title: brow.title } || null };
    })
    ipcMain.handle('instanceMethod', (event, key, value) => {
        if(key === 'setOverlayIcon' && value && value[0]){
            value[0] = nativeImage.createFromPath(value[0])
        } else if(key === 'setThumbarButtons'){
            value = [
                {
                    icon: nativeImage.createFromPath('electron/assets/images/logo.png'),
                    click: fn,
                    tooltip: 'tooltip 提示文字',
                    // flags: ['enabled', 'disabled', 'dismissonclick', 'nobackground', 'hidden', 'noninteractive']
                }
            ]
        } else if(key === 'setAppDetails'){
            value = [
                {
                    appId: 1,
                    appIconPath: nativeImage.createFromPath('electron/assets/images/logo.png'),
                }
            ]
        } else if(key === 'setIcon'){
            value =  nativeImage.createFromPath(value)
        }
        return Array.isArray(value) && key !== 'setShape' && key !== 'setThumbarButtons' && key !== 'setAppDetails' ? win[key](value[0], value[1], value[2]) : win[key](value);
    })
}
function fn(e){
    console.log(e)
}
