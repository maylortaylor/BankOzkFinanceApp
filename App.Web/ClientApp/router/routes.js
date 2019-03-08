import HomePage from 'components/home-page'
import LoginPage from 'components/login/login';
export const routes = [
  {
    name: 'home',
    path: '/',
    component: HomePage,
    display: 'Home',
    redirect: {
      name: "login"
    },
    icon: ['fas', 'home']
  },
  {
    name: 'login',
    path: '/login',
    component: LoginPage,
    display: 'Login',
    icon: ['fa', 'sign-in-alt']
  },
];

