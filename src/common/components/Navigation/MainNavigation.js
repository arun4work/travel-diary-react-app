import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import Backdrop from '../UIElements/Backdrop';

import styles from './MainNavigation.module.css';

const MainNavigation = (props) => {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);

    const openDrawer = () => {
        setDrawerIsOpen(true);
    };

    const closeDrawer = () => {
        setDrawerIsOpen(false);
    };

    return (
        <React.Fragment>
            {drawerIsOpen && <Backdrop onClick={closeDrawer} />}

            <SideDrawer show={drawerIsOpen} onClick={closeDrawer}>
                <NavLinks />
            </SideDrawer>

            <MainHeader>
                <button className={styles['main-navigation__menu-btn']} onClick={openDrawer}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <h1 className={styles['main-navigation__title']}>
                    <Link to='/'>TravelDiary</Link>
                </h1>
                <nav className={styles['main-navigation__header-nav']}>
                    <NavLinks />
                </nav>
            </MainHeader>
        </React.Fragment>
    );
};

export default MainNavigation;
