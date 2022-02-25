import React from 'react';
import Card from '../../common/components/UIElements/Card';
import Button from '../../common/components/UIElements/Button';
import PlaceItem from './PlaceItem';

import styles from './PlaceList.module.css';

const PlaceList = (props) => {
    if (props.items.length === 0) {
        return (
            <div className='center'>
                <Card>
                    <h2>No places found. Maybe create one?</h2>
                    <Button to='/places/new'>Add Place</Button>
                </Card>
            </div>
        );
    }

    return (
        <ul className={styles['place-list']}>
            {props.items.map((place) => {
                return (
                    <PlaceItem
                        key={place._id}
                        id={place._id}
                        address={place.address}
                        title={place.title}
                        image={`${process.env.REACT_APP_SERVER_URL}/${place.imageUrl}`}
                        description={place.description}
                        coordinate={place.location}
                        creatorId={place.creator}
                        onDelete={props.onDelete}
                    />
                );
            })}
        </ul>
    );
};

export default PlaceList;
