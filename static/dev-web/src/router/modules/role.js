import Layout from '@/components/Layout'

const roleRouter = {
  path: '/role',
  component: Layout,
  redirect: '/role/info',
  name: 'Role',
  meta: {
    title: 'roleManage',
    icon: 'shield',
  },
  children: [
    {
      path: 'info',
      component: () => import('@/views/role/info'),
      name: 'RoleInfo',
      meta: {
        title: 'roles',
        icon: 'list',
      }
    },
    {
      path: 'manage',
      component: () => import('@/views/role/users'),
      name: 'RoleUsers',
      meta: {
        title: 'users',
        icon: 'key'
      }
    }
  ]
};


export default roleRouter
