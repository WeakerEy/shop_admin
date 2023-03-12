export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/Login',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        component: './404',
      },
    ],
  },
  {
    path:'/',
    redirect:'/dashboard'
  },
  {
    path:'/dashboard',
    name:'desboard',
    icon:'PieChartOutlined',
    component:'@/pages/Dashboard/index'
  },
  {
    path:'/usertable',
    name:'usertable',
    icon:'UserOutlined',
    component:'./user/UserTable'
  },
  {
    component: './404',
  },
];
