import React, {useState, useEffect} from 'react';
import cx from "../auth.module.scss";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import RegisterConfirmation from "./registerConfirmation";
import Api from '../../../api/index';
import FormError from "../../../ui/formError/FormError";

const Register = () => {
    const [confirmation, setConfirmation] = useState(false)
    const [login, setLogin] = useState("")
    const [loginError, setLoginError] = useState("")
    const [loginDirty, setLoginDirty] = useState(false)
    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("")
    const [emailDirty, setEmailDirty] = useState(false)
    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [passwordDirty, setPasswordDirty] = useState(false)
    const [repeatPassword, setRepeatPassword] = useState("")
    const [repeatPasswordError, setRepeatPasswordError] = useState("")
    const [repeatPasswordDirty, setRepeatPasswordDirty] = useState(false)
    const [validForm, setValidForm] = useState(false)

    useEffect(() => {
        if (loginError || emailError || passwordError || repeatPasswordError || !login || !email || !password ) {
            setValidForm(false)
        } else {
            setValidForm(true)
        }
    }, [loginError, emailError, passwordError, repeatPasswordError, login, email, password])

    const blurHandler = (e) => {
        switch (e.target.name) {
            case "login" : {
                setLoginDirty(true)
                if (!login) {
                    setLoginError("Введите логин")
                }
                break
            }
            case "email" : {
                setEmailDirty(true)
                if (!email) {
                    setEmailError("Введите email")
                }
                break
            }
            case "password" : {
                setPasswordDirty(true)
                if (!login) {
                    setPasswordError("Введите пароль")
                }
                break
            }
            case "repeatPassword" : {
                setRepeatPasswordDirty(true)
                if (!email) {
                    setRepeatPasswordError("Введите пароль")
                }
                break
            }
        }
    }

    const onButtonClick = () => {
        if (!login) {
            setLoginError("Введите логин")
        }
        if (!email) {
            setEmailError("Введите email")
        }
        if (!password) {
            setPasswordError("Введите пароль")
        }
        if (!repeatPassword) {
            setRepeatPasswordError("Введите пароль")
        }
    }

    const loginHandler = (e) => {
        setLogin(e.target.value)
        if (e.target.value) {
            setLoginError("")
        } else {
            setLoginError("Введите логин")
        }
    }

    const emailHandler = (e) => {
        setEmail(e.target.value)
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|(([a-zA-Z\-\d]+\.)+[a-zA-Z]{2,}))$/
        if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailError("Некорректный емейл")
            if (!e.target.value) {
                setEmailError("Введите емейл")
            }
        } else {
            setEmailError("")
        }
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
        if (e.target.value.length < 4 || e.target.value.length > 20) {
            setPasswordError("Пароль должен быть больше 4 и меньше 20")
            if (!e.target.value) {
                setPasswordError("Введите пароль")
            }
        } else {
            setPasswordError("")
        }
        if (e.target.value !== repeatPassword) {
            setRepeatPasswordError("Пароли не совпадают")
        } else {
            setRepeatPasswordError("")
        }

    }

    const repeatPasswordHandler = (e) => {
        setRepeatPassword(e.target.value)
        if (!e.target.value) {
            setRepeatPasswordError("Введите пароль")
        }
        if (e.target.value !== password) {
            setRepeatPasswordError("Пароли не совпадают")
        } else {
            setRepeatPasswordError("")
        }
    }

    const register = async () => {
        if (validForm) {
            try {
                const res = await Api.Auth.Register(login, password, email);
                console.log("ok");
            } catch (e) {
                console.log("err");
            }
        }
    }

    return (

        <div>
            {
                !confirmation
                    ? <div className={cx.wrapper}>
                        <div className={cx.container}>
                            <Card className={cx.card}>
                                <Card.Header className={cx.cardHeader}>Регистрация</Card.Header>
                                <Card.Body className={cx.cardBody}>
                                    <Form.Group className={cx.formGroup}>
                                        <Form.Control
                                            onBlur={e => blurHandler(e)}
                                            name="login"
                                            value={login}
                                            onChange={e => loginHandler(e)}
                                            type="text"
                                            placeholder="Логин"
                                        />
                                        {loginDirty ? (loginDirty && loginError) && <FormError error={loginError}/>
                                            : (loginError) && <FormError error={loginError}/>
                                        }
                                    </Form.Group>
                                    <Form.Group className={cx.formGroup}>
                                        <Form.Control
                                            onBlur={e => blurHandler(e)}
                                            name="email"
                                            value={email}
                                            onChange={e => emailHandler(e)}
                                            type="email"
                                            placeholder="Почта"
                                            className={cx.form2}
                                        />
                                        {emailDirty ? (emailDirty && emailError) && <FormError error={emailError}/>
                                            : (emailError) && <FormError error={emailError}/>
                                        }
                                    </Form.Group>
                                    <Form.Group className={cx.formGroup}>
                                        <Form.Control
                                            onBlur={e => blurHandler(e)}
                                            name="password"
                                            value={password}
                                            onInput={e => passwordHandler(e)}
                                            type="password"
                                            placeholder="Пароль"
                                        />
                                        {passwordDirty ? (passwordDirty && passwordError) &&
                                            <FormError error={passwordError}/>
                                            : (passwordError) && <FormError error={passwordError}/>
                                        }
                                    </Form.Group>
                                    <Form.Group className={cx.formGroup}>
                                        <Form.Control
                                            onBlur={e => blurHandler(e)}
                                            name="repeatPassword"
                                            value={repeatPassword}
                                            onInput={e => repeatPasswordHandler(e)}
                                            type="password"
                                            placeholder="Повторить пароль"
                                            className={cx.form2}
                                        />
                                        {repeatPasswordDirty
                                            ? (repeatPasswordDirty && repeatPasswordError)
                                            && <FormError error={repeatPasswordError}/>
                                            : (repeatPasswordError) && <FormError error={repeatPasswordError}/>
                                        }
                                    </Form.Group>
                                    <div className={cx.buttonsBlock}>
                                        <div onClick={onButtonClick}>
                                            <Button
                                                onClick={() => {
                                                    setConfirmation(true)
                                                    register();
                                                }}
                                                className={cx.button}
                                                variant="secondary"
                                                disabled={!validForm}
                                            >
                                                Регистрация
                                            </Button>{' '}
                                        </div>
                                        <Form.Text className="text-muted text-center">
                                            <Link className={cx.link} to={"/auth"}>
                                                Войти
                                            </Link>
                                        </Form.Text>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                    : <RegisterConfirmation setConfirmation={setConfirmation}/>

            }
        </div>
    );
};

export default Register;