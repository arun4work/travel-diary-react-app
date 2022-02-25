import React, {useContext, Suspense} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
//import NewPlace from './places/pages/NewPlace';
import Users from './user/pages/Users';
import MainNavigation from './common/components/Navigation/MainNavigation';
//import UserPlaces from './places/pages/UserPlaces';
//import UpdatePlace from './places/pages/UpdatePlace';
//import Auth from './user/pages/Auth';
import AuthContext from './common/context/auth-context';
import LoadingSpinner from './common/components/UIElements/LoadingSpinner';

//const Users = React.lazy(() => import('./user/pages/Users'));
const NewPlace = React.lazy(() => import('./places/pages/NewPlace'));
const UserPlaces = React.lazy(() => import('./places/pages/UserPlaces'));
const UpdatePlace = React.lazy(() => import('./places/pages/UpdatePlace'));
const Auth = React.lazy(() => import('./user/pages/Auth'));

const App = () => {
    const authCtx = useContext(AuthContext);
    let routes;
    if (authCtx.authToken) {
        routes = (
            <Switch>
                <Route path='/' exact>
                    <Users />
                </Route>
                <Route path='/:userId/places' exact>
                    <UserPlaces />
                </Route>
                <Route path='/places/new' exact>
                    <NewPlace />
                </Route>

                <Route path='/places/:placeId'>
                    <UpdatePlace />
                </Route>
                <Redirect to='/' />
            </Switch>
        );
    } else {
        routes = (
            <Switch>
                <Route path='/' exact>
                    <Users />
                </Route>

                <Route path='/auth' exact>
                    <Auth />
                </Route>
                <Route path='/:userId/places' exact>
                    <UserPlaces />
                </Route>
                <Redirect to='/auth' />
            </Switch>
        );
    }
    return (
        <main>
            <Router>
                <MainNavigation />
                <Suspense
                    fallback={
                        <div className='center'>
                            <LoadingSpinner />
                        </div>
                    }
                >
                    {routes}
                </Suspense>
            </Router>
        </main>
    );
};

export default App;
