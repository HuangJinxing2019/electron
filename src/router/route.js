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
        title: '属性介绍',
        component: () => import('@/views/browserWindow/property/index.vue')
      },
      {
        path: '/browserWindow/customWindow',
        name: 'customBrowserWindow',
        title: '定义窗口',
        meta: {
          parentPath: '/'
        },
        component: () => import('@/views/browserWindow/customWindow/index.vue')
      }
    ]
  }
]