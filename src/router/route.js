import Layout from '../layout/index'

export const routes = [
  {
    path: '/',
    name: 'BrowserWindow',
    component: Layout,
    title: 'BrowserWindow',
    icon: 'arcticons:styxbrowser',
    children: [
      {
        path: '',
        name: 'browserProps',
        meta: {
          parentPath: '/'
        },
        title: '实例属性',
        component: () => import('@/views/browserWindow/property/index.vue')
      },
      {
        path: '/browserWindow/customWindow',
        name: 'customBrowserWindow',
        title: '自定义窗口',
        meta: {
          parentPath: '/'
        },
        component: () => import('@/views/browserWindow/customWindow/index.vue')
      },
      {
        path: '/browserWindow/browserEvent',
        name: 'browserEvent',
        title: '实例事件',
        meta: {
          parentPath: '/'
        },
        component: () => import('@/views/browserWindow/browserEvent/index.vue')
      },
      {
        path: '/browserWindow/browserFunction',
        name: 'browserFunction',
        title: '实例方法',
        meta: {
          parentPath: '/'
        },
        component: () => import('@/views/browserWindow/browserFunction/index.vue')
      }
    ]
  },
  {
    path: '/webContents',
    name: 'webContents',
    component: Layout,
    title: 'webContents',
    icon: 'arcticons:styxbrowser',
    children: [
      {
        path: '/webContents/introduce',
        name: 'webContentsIntroduce',
        meta: {
          parentPath: '/webContents'
        },
        title: '认识与导航事件',
        component: () => import('@/views/webContents/introduce/index.vue')
      },
    ]
  }
]