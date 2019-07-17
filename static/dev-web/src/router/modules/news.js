import Layout from '@/components/Layout'

const NewsRouter = {
  path: '/news',
  component: Layout,
  name: 'News',
  children: [
    {
      path: 'list',
      component: () => import('@/views/news'),
      name: 'NewsList',
      meta: {
        title: '新闻资讯',
        icon: 'list-rich'
      }
    },
  ]
};
export default NewsRouter
