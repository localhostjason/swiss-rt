import Layout from '@/components/Layout'

const roleRouter = {
  path: '/users',
  component: Layout,
  redirect: '/users/roles',
  meta: {
    title: 'roleManage',
    icon: 'cog',
  },
  children: [
    {
      path: 'roles',
      component: () => import('@/views/role/info'),
      name: 'Roles',
      meta: {
        title: 'roles',
        icon: 'list',
      }
    },
    {
      path: 'manage',
      component: () => import('@/views/role/users'),
      name: 'Users',
      meta: {
        title: 'users',
        icon: 'key'
      }
    }
  ]
};


export default roleRouter
