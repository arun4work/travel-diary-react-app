import React, {useEffect, useState, useContext} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import Input from '../../common/components/UIElements/Input';
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH} from '../../util/validator';
import Button from '../../common/components/UIElements/Button';
import useForm from '../../hooks/form-hook';
import useHttp from '../../hooks/http-hook';
import LoadingSpinner from '../../common/components/UIElements/LoadingSpinner';
import Modal from '../../common/components/UIElements/Modal';
import AuthContext from '../../common/context/auth-context';

import styles from './PlaceForm.module.css';

const initialFormState = {
    inputs: {
        title: {value: '', isValid: false},
        description: {value: '', isValid: false},
    },
    isFormValid: false,
};

const UpdatePlace = (props) => {
    const placeId = useParams().placeId;
    const history = useHistory();
    const authCtx = useContext(AuthContext);

    const [formState, inputHandler, setFormData] = useForm(initialFormState);
    const {isLoading, error, request, clearError} = useHttp();
    const [loadedPlace, setLoadedPlace] = useState(null);

    //Temp- get from backend by fetch api call
    useEffect(() => {
        const sendRequest = async () => {
            const result = await request(`${process.env.REACT_APP_SERVER_URL}/api/places/${placeId}`);
            if (result) {
                setLoadedPlace(result);
            }
        };
        sendRequest();
    }, [placeId, setFormData, request]);

    const updateHandler = async (event) => {
        event.preventDefault();
        console.log('updated place info', formState.inputs);
        const result = await request(
            `${process.env.REACT_APP_SERVER_URL}/api/places/${placeId}`,
            'PATCH',
            JSON.stringify({
                title: formState.inputs.title.value,
                description: formState.inputs.description.value,
            }),
            {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authCtx.authToken}`,
            }
        );
        if (result) {
            history.push(`/${authCtx.userId}/places`);
        }
    };

    return (
        <React.Fragment>
            <Modal onCancel={clearError} header='An Error Occurred!' show={!!error} footer={<Button onClick={clearError}>Okay</Button>}>
                <p>{error}</p>
            </Modal>
            {isLoading && <LoadingSpinner asOverlay />}
            {!isLoading && loadedPlace && (
                <form className={styles['place-form']} onSubmit={updateHandler}>
                    <Input
                        id='title'
                        title='Title'
                        value={loadedPlace.title}
                        initialValidity={true}
                        placeholder={`Input title`}
                        validators={[VALIDATOR_REQUIRE()]}
                        onInput={inputHandler}
                        errorText={'Please input title.'}
                    />
                    <Input
                        id='description'
                        type='textarea'
                        title='Description'
                        value={loadedPlace.description}
                        initialValidity={true}
                        placeholder={`Description`}
                        validators={[VALIDATOR_MINLENGTH(6)]}
                        onInput={inputHandler}
                        errorText={'Please input a valid description (minimum 6 characters).'}
                    />
                    <Button disabled={!formState.isFormValid}>Update Place</Button>
                </form>
            )}
        </React.Fragment>
    );
};
export default UpdatePlace;
