import {useReducer, useCallback} from 'react';

const formReducer = (state, action) => {
    switch (action.type) {
        case 'INPUT_CHANGE':
            state = {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.id]: {
                        value: action.value,
                        isValid: action.isValid,
                    },
                },
            };
            state.isFormValid = Object.keys(state.inputs).every((input) => {
                return state.inputs[input].isValid === true;
            });

            return state;

        case 'SET_FORM_DATA':
            state = {
                ...state,
                inputs: {
                    ...state.inputs,
                    ...action.inputs,
                },
            };
            state.isFormValid = Object.keys(state.inputs).every((input) => {
                return state.inputs[input].isValid === true;
            });
            return state;

        default:
            return state;
    }
};
const useForm = (initialFormState) => {
    const [state, dispatch] = useReducer(formReducer, initialFormState);

    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({type: 'INPUT_CHANGE', id, value, isValid});
    }, []);

    const setFormData = useCallback((inputs) => {
        dispatch({type: 'SET_FORM_DATA', inputs: inputs});
    }, []);

    return [state, inputHandler, setFormData];
};

export default useForm;
