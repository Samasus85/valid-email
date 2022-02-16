import React, { useEffect, useReducer, useState } from 'react';
import Button from './Button';

const emailReducer = (prevState, action) => {
    if (action.type === 'USER_INPUT') {
        return {
            value: action.val,
            isValid: action.val.includes('@'),
        };
    }
    if (action.type === 'INPUT_BLUR') {
        return {
            value: prevState.value,
            isValid: prevState.value.includes('@'),
        };
    }
    return {
        value: '',
        isValid: false,
    }
}

const passwordReducer = (prevState, action) => {
    if (action.type === 'USER_INPUT') {
        return {
            value: action.val,
            isValid: action.val.trim().length > 6
        }
    }
    if (action.type === 'INPUT_BLUR') {
        return {
            value: prevState.value,
            isValid: prevState.value.trim().length > 6,
        };
    }
    return {
        value: '',
        isValid: false,
    }
}
const Login = (props) => {
    const [emailState, dispatchEmail] = useReducer(emailReducer, {
        value: '',
        isValid: false,
    });
    const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
        value: '',
        isValid: false,
    })

    const [formIsValid, setFormIsValid] = useState(false);
    const { isValid: emailIsValid } = emailState;
    const { isValid: passwordIsValid } = passwordState;
    useEffect(() => {
        const identifier = setTimeout(() => {
            console.log('Valid');
            setFormIsValid(emailIsValid && passwordIsValid)
        }, 2500);

        return () => {
            console.log('clean up');
            clearTimeout(identifier)
        };
    }, [setFormIsValid, emailIsValid, passwordIsValid]);
    const emailChangeHandler = (event) => {
        dispatchEmail({ type: 'USER_INPUT', val: event.target.value });
    };

    const passwordChangeHandler = (event) => {
        dispatchPassword({ type: 'USER_INPUT', val: event.target.value })
    };

    const validateEmailHandler = () => {
        dispatchEmail({ type: 'INPUT_BLUR' });
    };

    const validatePasswordHandler = () => {
        dispatchPassword({ type: 'INPUT_BLUR' });
    };

    const submitHandler = (event) => {
        event.preventDefault();
        props.onLogin(emailState.value, passwordState.value);
    };

    return (
        <div className='login'>
            <form onSubmit={submitHandler}>
                <div
                    className={`'control' ${emailState.IsValid === false ? 'invalid' : ''
                        }`}
                >
                    <label htmlFor="email">E-Mail</label>
                    <input
                        type="email"
                        id="email"
                        value={emailState.value}
                        onChange={emailChangeHandler}
                        onBlur={validateEmailHandler}
                    />
                </div>
                <div
                    className={`'control' ${passwordState.IsValid === false ? 'invalid' : ''
                        }`}
                >
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={passwordState.value}
                        onChange={passwordChangeHandler}
                        onBlur={validatePasswordHandler}
                    />
                </div>
                <div className='action'>
                    <Button type="submit" className='btn' disabled={!formIsValid}>
                        Login
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Login;  