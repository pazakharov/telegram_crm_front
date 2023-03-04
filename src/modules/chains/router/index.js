
/* Layout */
import Layout from '@/layout'

export default
{
  component: Layout,
  redirect: '/chains/main',
  path: '/chains',
  meta: { title: 'Chains', icon: 'el-icon-s-help' },
  children: [
    {
      path: 'main',
      name: 'chains',
      component: () => import('@/modules/chains/views/index'),
      meta: {
        title: 'Цепочки и сообщения',
        icon: 'el-icon-link' }
    }]
}
