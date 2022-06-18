import { lazy } from "react";

// Lazy load your page components
const Home = lazy(() => import("../pages/home/home"));
const Login = lazy(() => import("../pages/auth/login/login"));
const register = lazy(() => import("../pages/auth/register/register"));
const SavedPost=lazy(()=>import("../components/SavedPost/SavedPost"))

/*
 * Route path: URLs
 */
export const paths = {
  home: "/home",
  login: "/auth/login",
  register: "/auth/register",
  savedPost:"/savedpost"
};

/*
 * Routes: path & lazy loaded component
 */
export const routes: any[] = [
  {
    path: paths.home,
    component: Home,
  },
  {
    path: paths.login,
    component: Login,
  },
  {
    path: paths.register,
    component: register,
  },

  {
    path: paths.savedPost,
    component: SavedPost,
  },
];
