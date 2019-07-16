import Layout from '@/components/Layout'

const storyRouter = {
  path: '/story',
  component: Layout,
  redirect: '/story/food',
  name: 'Story',
  meta: {
    title: '故事管理',
    icon: 'layers'
  },
  children: [
    {
      path: 'type',
      component: () => import('@/views/story/food'),
      name: 'StoryFood',
      meta: {
        title: '餐厅故事',
        icon: 'bell'
      }
    },
    {
      path: 'info',
      component: () => import('@/views/story/room'),
      name: 'StoryRoom',
      meta: {
        title: '房间故事',
        icon: 'fork'
      }
    },
  ]
};
export default storyRouter
