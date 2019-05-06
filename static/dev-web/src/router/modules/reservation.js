import Layout from '@/components/Layout'

const ReservationRouter = {
  path: '/reservation',
  component: Layout,
  redirect: '/reservation/complete',
  name: 'Reservation',
  meta: {
    title: 'reservation',
    icon: 'timer'
  },
  children: [
    {
      path: 'await',
      component: () => import('@/views/reservation'),
      name: 'ReservationAwait',
      meta: {
        title: 'reservationAwait',
        icon: 'envelope-open'
      }
    },
    {
      path: 'complete',
      component: () => import('@/views/reservation'),
      name: 'ReservationComplete',
      meta: {
        title: 'reservationComplete',
        icon: 'envelope-closed'
      }
    },
  ]
};
export default ReservationRouter
