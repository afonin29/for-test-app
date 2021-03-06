import { LOGIN_PATH, POSTS_PATH, REGISTER_PATH } from "./utils/constants"
import { PROFILE_PATH } from "./utils/constants"
import Login from "./components/Login"
import Profile from "./components/Profile"
import Register from "./components/Register"
import Posts from "./components/Posts"

export const publicRoutes = [
    {
        path: LOGIN_PATH,
        Component: Login
    },
    {
        path: REGISTER_PATH,
        Component: Register
    }
]

export const privateRoutes = [
    {
        path: PROFILE_PATH,
        Component: Profile
    },
    {
        path: POSTS_PATH,
        Component: Posts
    }
    
]