import React from 'react';
import UserItem from './UserItem';
import Card from '../../common/components/UIElements/Card';

import styles from './UserList.module.css';

const UserList = (props) => {
    if (props.items.length === 0) {
        return (
            <div className='center'>
                <Card>
                    <h2>No users found!</h2>
                </Card>
            </div>
        );
    }

    return (
        <ul className={styles['users-list']}>
            {props.items.map((user) => {
                return <UserItem key={user._id} id={user._id} name={user.name} image={user.image} placeCount={user.places.length} />;
            })}
        </ul>
    );
};

export default UserList;
