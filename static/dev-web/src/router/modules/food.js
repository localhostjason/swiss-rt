import Layout from '@/components/Layout'

const foodRouter = {
  path: '/food',
  component: Layout,
  children: [
    {
      path: 'info',
      component: () => import('@/views/food/info'),
      name: 'FoodInfo',
      meta: {
        title: '菜品管理',
        icon: 'list'
      }
    },
  ]
};
export default foodRouter
