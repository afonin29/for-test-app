import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import { privateRoutes, publicRoutes } from '../routes';
import { LOGIN_PATH, PROFILE_PATH } from '../utils/constants';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../index'

const AppRouter = () => {
    const [user] = useAuthState(auth);

    return (user !== null) ? (
        <Switch>
            {privateRoutes.map(({path, Component})=>
            <Route key={path} path={path} component={Component} exact={true} />
            )}
            <Redirect to={PROFILE_PATH}/>
        </Switch>
    )
    :
    (
        <Switch>
            {publicRoutes.map(({path, Component})=>
            <Route key={path} path={path} component={Component} exact={true} />
            )}
            <Redirect to={LOGIN_PATH}/>
        </Switch>
    )
};

export default AppRouter;