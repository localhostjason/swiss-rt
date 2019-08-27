import Layout from '@/components/Layout'

const ReservationRouter = {
  path: '/reservation',
  component: Layout,
  redirect: '/reservation/complete',
  name: 'Reservation',
  meta: {
    title: '预约管理',
    icon: 'timer'
  },
  children: [
    {
      path: 'complete',
      component: () => import('@/views/reservation/complete'),
      name: 'ReservationAwait',
      meta: {
        title: '已完成',
        icon: 'envelope-open'
      }
    },
    {
      path: 'confirm',
      component: () => import('@/views/reservation/confirm'),
      name: 'ReservationComplete',
      meta: {
        title: '预约信息',
        icon: 'envelope-closed'
      }
    },
  ]
};
export default ReservationRouter
