import Layout from '@/components/Layout'

const foodRouter = {
  path: '/food',
  component: Layout,
  redirect: '/food/type',
  name: 'Food',
  meta: {
    title: 'food',
    icon: 'list'
  },
  children: [
    {
      path: 'type',
      component: () => import('@/views/food/type'),
      name: 'FoodType',
      meta: {
        title: 'foodType',
        icon: 'file'
      }
    },
    {
      path: 'info',
      component: () => import('@/views/food/info'),
      name: 'FoodInfo',
      meta: {
        title: 'foodInfo',
        icon: 'list-rich'
      }
    },
  ]
};
export default foodRouter
