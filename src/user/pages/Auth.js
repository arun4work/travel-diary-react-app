import React, {useState, useContext} from 'react';
import Input from '../../common/components/UIElements/Input';
import Button from '../../common/components/UIElements/Button';
import Card from '../../common/components/UIElements/Card';
import useForm from '../../hooks/form-hook';
import {VALIDATOR_REQUIRE, VALIDATOR_EMAIL, VALIDATOR_MINLENGTH} from '../../util/validator';
import AuthContext from '../../common/context/auth-context';
import LoadingSpinner from '../../common/components/UIElements/LoadingSpinner';
import Modal from '../../common/components/UIElements/Modal';
import useHttp from '../../hooks/http-hook';
import ImageUpload from '../../common/components/UIElements/ImageUpload';

import styles from './Auth.module.css';

const initialFormState = {
    inputs: {
        email: {value: '', isValid: false},
        password: {value: '', isValid: false},
    },
    isFormValid: false,
};

const Auth = (props) => {
    const [formState, inputHandler, setFormData] = useForm(initialFormState);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const {isLoading, error, request, clearError} = useHttp();
    // const [isLoading, setIsLoading] = useState(false);
    // const [error, setError] = useState(null);

    const authCtx = useContext(AuthContext);

    const switchLoginModeHandler = (event) => {
        event.preventDefault();
        let inputs = JSON.parse(JSON.stringify(formState.inputs));
        if (!isLoginMode) {
            delete inputs.name;
            delete inputs.image;
        } else {
            inputs.name = {value: '', isValid: false};
            inputs.image = {value: null, isValid: false};
        }
        console.log(inputs);
        setFormData(inputs);
        setIsLoginMode((isLoginMode) => !isLoginMode);
    };

    const authSubmitHandler = async (event) => {
        event.preventDefault();
        //console.log(formState.inputs);
        if (isLoginMode) {
            const result = await request(
                process.env.REACT_APP_SERVER_URL + '/api/user/login',
                'POST',
                JSON.stringify({
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value,
                }),
                {
                    'Content-Type': 'application/json',
                }
            );
            //console.log('login', result);
            if (result) {
                authCtx.logIn({userId: result._id, authToken: result.authToken});
            }
        } else {
            const formData = new FormData();
            formData.append('name', formState.inputs.name.value);
            formData.append('email', formState.inputs.email.value);
            formData.append('password', formState.inputs.password.value);
            formData.append('image', formState.inputs.image.value);
            const result = await request(process.env.REACT_APP_SERVER_URL + '/api/user/signup', 'POST', formData);
            //console.log('signup', result);
            if (result) {
                authCtx.logIn({userId: result._id, authToken: result.authToken});
            }
        }
    };

    const errorHandler = () => {
        clearError(null);
    };

    return (
        <React.Fragment>
            <Modal onCancel={errorHandler} header='An Error Occurred!' show={!!error} footer={<Button onClick={errorHandler}>Okay</Button>}>
                <p>{error}</p>
            </Modal>
            <Card className={styles.authentication}>
                {isLoading && <LoadingSpinner asOverlay />}
                <form onSubmit={authSubmitHandler}>
                    {!isLoginMode && <Input id='name' placeholder='name' onInput={inputHandler} validators={[VALIDATOR_REQUIRE()]} errorText={`Please input name.`} />}
                    <Input
                        type='email'
                        id='email'
                        placeholder='email'
                        onInput={inputHandler}
                        validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
                        errorText={`Please input valid email.`}
                    />
                    <Input
                        type='password'
                        id='password'
                        placeholder='password'
                        onInput={inputHandler}
                        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)]}
                        errorText={`Please input valid passowrd.`}
                    />
                    {!isLoginMode && <ImageUpload id='image' center onInput={inputHandler} errorText={`Please browse a valid image.`} />}
                    <Button type='submit' disabled={!formState.isFormValid}>
                        {isLoginMode ? `LOGIN` : 'SIGNUP'}{' '}
                    </Button>
                    <Button type='button' inverse onClick={switchLoginModeHandler}>
                        Switch to {isLoginMode ? `SINGUP` : 'LOGIN'}
                    </Button>
                </form>
            </Card>
        </React.Fragment>
    );
};

export default Auth;
