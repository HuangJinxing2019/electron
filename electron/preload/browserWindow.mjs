import { contextBridge, ipcRenderer } from 'electron/renderer'

contextBridge.exposeInMainWorld('browserWindowAPI', {
    getContext: (callback) => ipcRenderer.on('on-init-browser', (_event, ctx) => callback(ctx)),
    setTitle: (title) => ipcRenderer.send('set-title', title),
    getTitle: () => ipcRenderer.invoke('get-title'),
    setShadow: (flag) => ipcRenderer.invoke('set-shadow', flag),
    setMenuBarVisible: (flag) => ipcRenderer.invoke('setMenuBarVisible', flag),
    setKiosk: (flag) => ipcRenderer.invoke('setKiosk', flag),
    setMinimizable: (flag) => ipcRenderer.invoke('setMinimizable', flag),
    setMaximizable: (flag) => ipcRenderer.invoke('setMaximizable', flag),
    setFullScreenable: (flag) => ipcRenderer.invoke('setFullScreenable', flag),
    setResizable: (flag) => ipcRenderer.invoke('setResizable', flag),
    setClosable: (flag) => ipcRenderer.invoke('setClosable', flag),
    setMovable: (flag) => ipcRenderer.invoke('setMovable', flag),
    setSimpleFullScreen: (flag) => ipcRenderer.invoke('setSimpleFullScreen', flag),
    setFullScreen: (flag) => ipcRenderer.invoke('setFullScreen', flag),
})
