import React from 'react';
import styles from './Avatar.module.css';

const Avatar = (props) => {
    return (
        <div
            className={`${styles.avatar} ${props.className}`}
            styles={props.styles}
        >
            <img
                src={props.image}
                alt={props.name}
                styles={{width: props.width, height: props.height}}
            />
        </div>
    );
};

export default Avatar;
