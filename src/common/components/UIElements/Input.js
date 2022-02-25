import React, {useState, useEffect} from 'react';
import {validate} from '../../../util/validator';

import styles from './Input.module.css';

const Input = (props) => {
    const [value, setValue] = useState(props.value || '');
    const [isValid, setIsValid] = useState(props.initialValidity || false);
    const [isTouched, setIsTouched] = useState(false);

    const {onInput, id} = props;
    useEffect(() => {
        onInput(id, value, isValid);
    }, [id, value, isValid, onInput]);

    const changeHandler = (event) => {
        setValue(event.target.value);
        setIsValid(validate(event.target.value, props.validators));
    };

    const blurHandler = (event) => {
        setIsTouched(true);
    };

    const element =
        props.element === 'textarea' ? (
            <textarea id={props.id} placeholder={props.placeholder} rows={props.rows || 3} value={value} onChange={changeHandler} onBlur={blurHandler} />
        ) : (
            <input id={props.id} type={props.type} placeholder={props.placeholder} value={value} onChange={changeHandler} onBlur={blurHandler} />
        );

    return (
        <div className={`${styles['form-control']} ${!isValid && isTouched && styles['form-control--invalid']}`}>
            <label htmlFor={props.id}>{props.title}</label>
            {element}
            {!isValid && isTouched && <p>{props.errorText}</p>}
        </div>
    );
};

export default Input;
