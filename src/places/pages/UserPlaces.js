import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import PlaceList from '../components/PlaceList';
import useHttp from '../../hooks/http-hook';
import LoadingSpinner from '../../common/components/UIElements/LoadingSpinner';
import Modal from '../../common/components/UIElements/Modal';
import Button from '../../common/components/UIElements/Button';

const UserPlaces = (props) => {
    const userId = useParams().userId;
    const [places, setPlaces] = useState([]);
    const {isLoading, error, request, clearError} = useHttp();

    useEffect(() => {
        const requestData = async () => {
            const result = await request(`${process.env.REACT_APP_SERVER_URL}/api/places/user/${userId}`);
            // console.log(result);
            if (result) {
                setPlaces(result);
            }
        };
        requestData();
    }, [userId, request]);

    const deletePlaceHandler = (placeId) => {
        setPlaces((prevPlaces) => prevPlaces.filter((place) => place._id !== placeId));
    };

    return (
        <React.Fragment>
            <Modal onCancel={clearError} header='An Error Occurred!' show={!!error} footer={<Button onClick={clearError}>Okay</Button>}>
                <p>{error}</p>
            </Modal>
            {isLoading && (
                <div className='center'>
                    <LoadingSpinner asOverlay />
                </div>
            )}
            {!isLoading && !error && <PlaceList items={places} onDelete={deletePlaceHandler} />}
        </React.Fragment>
    );
};

export default UserPlaces;
