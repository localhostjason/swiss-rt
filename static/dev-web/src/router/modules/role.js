import Layout from '@/components/Layout'

const roleRouter = {
  path: '/role',
  component: Layout,
  redirect: '/role/info',
  name: 'Role',
  meta: {
    title: '权限管理',
    icon: 'shield',
  },
  children: [
    {
      path: 'info',
      component: () => import('@/views/role/info'),
      name: 'RoleInfo',
      meta: {
        title: '角色管理',
        icon: 'list',
      }
    },
    {
      path: 'manage',
      component: () => import('@/views/role/users'),
      name: 'RoleUsers',
      meta: {
        title: '账号管理',
        icon: 'key'
      }
    }
  ]
};


export default roleRouter
