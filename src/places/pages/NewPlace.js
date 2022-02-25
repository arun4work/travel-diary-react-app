import React, {useContext} from 'react';
import {useHistory} from 'react-router-dom';
import Input from '../../common/components/UIElements/Input';
import Button from '../../common/components/UIElements/Button';
import {VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from '../../util/validator';
import useForm from '../../hooks/form-hook';
import useHttp from '../../hooks/http-hook';
import LoadingSpinner from '../../common/components/UIElements/LoadingSpinner';
import Modal from '../../common/components/UIElements/Modal';
import AuthContext from '../../common/context/auth-context';
import ImageUpload from '../../common/components/UIElements/ImageUpload';

import styles from './PlaceForm.module.css';

const initialFormState = {
    inputs: {
        title: {value: '', isValid: false},
        description: {value: '', isValid: false},
        address: {value: '', isValid: false},
        image: {value: null, isValid: false},
    },
    isFormValid: false,
};

const NewPlace = () => {
    const {isLoading, error, request, clearError} = useHttp();
    const authCtx = useContext(AuthContext);
    const history = useHistory();
    // const [state, dispatch] = useReducer(formReducer, initialFormState);

    // const inputHandler = useCallback((id, value, isValid) => {
    //     dispatch({type: 'INPUT_CHANGE', id, value, isValid});
    // }, []);

    const [formState, inputHandler] = useForm(initialFormState);

    // const customInputHandler = useCallback((id, value, isValid) => {
    //     console.log(id, value);
    // },)
    const submitHandler = async (event) => {
        event.preventDefault();
        //console.log('form submission data', formState.inputs);
        const formData = new FormData();
        formData.append('title', formState.inputs.title.value);
        formData.append('description', formState.inputs.description.value);
        formData.append('address', formState.inputs.address.value);
        // formData.append('creator', authCtx.userId);
        formData.append('image', formState.inputs.image.value);
        const result = await request(process.env.REACT_APP_SERVER_URL + '/api/places', 'POST', formData, {
            Authorization: `Bearer ${authCtx.authToken}`,
        });
        //console.log('created place', result);
        if (result) {
            history.push('/');
        }
    };

    return (
        <React.Fragment>
            <Modal onCancel={clearError} header='An Error Occurred!' show={!!error} footer={<Button onClick={clearError}>Okay</Button>}>
                <p>{error}</p>
            </Modal>
            <form className={styles['place-form']} onSubmit={submitHandler}>
                {isLoading && <LoadingSpinner asOverlay />}
                <Input id='title' title='Title' placeholder={`Input title`} validators={[VALIDATOR_REQUIRE()]} onInput={inputHandler} errorText={'Please input title.'} />
                <Input
                    id='description'
                    type='textarea'
                    title='Description'
                    placeholder={`Description`}
                    validators={[VALIDATOR_MINLENGTH(6)]}
                    onInput={inputHandler}
                    errorText={'Please input a valid description (minimum 6 characters).'}
                />
                <Input id='address' title='Address' placeholder={`Address`} validators={[VALIDATOR_REQUIRE()]} onInput={inputHandler} errorText={'Please input description.'} />
                <ImageUpload id='image' onInput={inputHandler} errorText={`Please upload valid image.`} />
                <Button disabled={!formState.isFormValid}>Add Place</Button>
            </form>
        </React.Fragment>
    );
};

export default NewPlace;
