import Layout from '@/components/Layout'

const storyRouter = {
  path: '/story',
  component: Layout,
  redirect: '/story/food',
  name: 'Story',
  meta: {
    title: 'story',
    icon: 'layers'
  },
  children: [
    {
      path: 'type',
      component: () => import('@/views/story/food'),
      name: 'StoryFood',
      meta: {
        title: 'storyFood',
        icon: 'bell'
      }
    },
    {
      path: 'info',
      component: () => import('@/views/story/room'),
      name: 'StoryRoom',
      meta: {
        title: 'storyRoom',
        icon: 'fork'
      }
    },
  ]
};
export default storyRouter
