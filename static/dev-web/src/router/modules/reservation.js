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
      path: 'await',
      component: () => import('@/views/reservation'),
      name: 'ReservationAwait',
      meta: {
        title: '已预约',
        icon: 'envelope-open'
      }
    },
    {
      path: 'complete',
      component: () => import('@/views/reservation'),
      name: 'ReservationComplete',
      meta: {
        title: '待确认',
        icon: 'envelope-closed'
      }
    },
  ]
};
export default ReservationRouter
