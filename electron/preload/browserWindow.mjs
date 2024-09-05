import { contextBridge, ipcRenderer } from 'electron/renderer'

contextBridge.exposeInMainWorld('browserWindowAPI', {
    setTitle: (title) => ipcRenderer.send('set-title', title),
})
