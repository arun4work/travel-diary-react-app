import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';
import AuthContext from '../../context/auth-context';
import Button from '../UIElements/Button';

import styles from './NavLinks.module.css';

const NavLinks = (props) => {
    const authCtx = useContext(AuthContext);

    return (
        <ul className={styles['nav-links']}>
            <li>
                <NavLink to='/' activeClassName={styles.active} exact>
                    All Users
                </NavLink>
            </li>
            {authCtx.authToken && (
                <li>
                    <NavLink to={`/${authCtx.userId}/places`} activeClassName={styles.active}>
                        My Places
                    </NavLink>
                </li>
            )}
            {authCtx.authToken && (
                <li>
                    <NavLink to='/places/new' activeClassName={styles.active}>
                        Add Place
                    </NavLink>
                </li>
            )}
            {!authCtx.authToken && (
                <li>
                    <NavLink to='/auth' activeClassName={styles.active}>
                        Login
                    </NavLink>
                </li>
            )}

            {authCtx.authToken && (
                <li>
                    <Button onClick={authCtx.logOut}>Logout</Button>
                </li>
            )}
        </ul>
    );
};

export default NavLinks;
