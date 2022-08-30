import Auth from "../pages/auth/auth";
import Register from "../pages/auth/registration/register";
import ForgotPassword from "../pages/auth/forgot-password/forgotPassword";

export const privateRoutes = [

]

export const publicRoutes = [
    {exact: true, path:"/auth", element:<Auth/>},
    {exact: true, path:'/register', element:<Register/>},
    {exact: true, path:'/forgot-password', element:<ForgotPassword/>},
    {exact: true, path:'*', element:<Auth/>},
]