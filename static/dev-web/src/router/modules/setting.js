import Layout from '@/components/Layout'

const settingRouter = {
  path: '/setting',
  component: Layout,
  redirect: '/setting/base',
  name: 'Setting',
  meta: {
    title: 'setting',
    icon: 'cog',
  },
  children: [
    {
      path: 'base',
      component: () => import('@/views/setting'),
      name: 'SettingBase',
      meta: {
        title: 'settingBase',
        icon: 'cog',
      }
    },
  ]
};


export default settingRouter
