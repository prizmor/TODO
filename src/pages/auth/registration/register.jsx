import React, {useState, useMemo, useRef, useEffect} from 'react';
import cx from "../auth.module.scss";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import RegisterConfirmation from "./registerConfirmation";
import Api from '../../../api/index';

const Register = () => {
    const [confirmation, setConfirmation] = useState(false)
    const [login, setLogin] = useState("")
    const [loginError, setLoginError] = useState("Введите логин")
    const [loginDirty, setLoginDirty] = useState(false)
    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("Введите email")
    const [emailDirty, setEmailDirty] = useState(false)
    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState("Введите пароль")
    const [passwordDirty, setPasswordDirty] = useState(false)
    const [repeatPassword, setRepeatPassword] = useState("")
    const [repeatPasswordError, setRepeatPasswordError] = useState("Введите пароль")
    const [repeatPasswordDirty, setRepeatPasswordDirty] = useState(false)
    const [validForm, setValidForm] = useState(false)

    const passwordRef = useRef()

    const blurHandler = (e) => {
        switch (e.target.name) {
            case "login" : {
                setLoginDirty(true)
                break
            }
            case "email" : {
                setEmailDirty(true)
                break
            }
            case "password" : {
                setPasswordDirty(true)
                break
            }
            case "repeatPassword" : {
                setRepeatPasswordDirty(true)
                break
            }
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
        }
        else {
            setRepeatPasswordError("")
        }
    }


    useEffect(() => {
        if (loginError|| emailError || passwordError || repeatPasswordError) {
            setValidForm(false)
        } else {
            setValidForm(true)
        }
    }, [loginError, emailError, passwordError, repeatPasswordError])


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
                                        {(loginDirty && loginError) && <div>{loginError}</div>}
                                        <Form.Control
                                            onBlur={e => blurHandler(e)}
                                            name="login"
                                            value={login}
                                            onChange={e => loginHandler(e)}
                                            type="text"
                                            placeholder="Логин"
                                        />
                                    </Form.Group>
                                    <Form.Group className={cx.formGroup}>
                                        {(emailDirty && emailError) && <div>{emailError}</div>}
                                        <Form.Control
                                            onBlur={e => blurHandler(e)}
                                            name="email"
                                            value={email}
                                            onChange={e => emailHandler(e)}
                                            type="email"
                                            placeholder="Почта"
                                            className={cx.form2}
                                        />
                                    </Form.Group>
                                    <Form.Group className={cx.formGroup}>
                                        {(passwordDirty && passwordError) && <div>{passwordError}</div>}
                                        <Form.Control
                                            onBlur={e => blurHandler(e)}
                                            name="password"
                                            ref={passwordRef}
                                            value={password}
                                            onInput={e => passwordHandler(e)}
                                            type="password"
                                            placeholder="Пароль"
                                        />
                                    </Form.Group>
                                    <Form.Group className={cx.formGroup}>
                                        {(repeatPasswordDirty && repeatPasswordError) && <div>{repeatPasswordError}</div>}
                                        <Form.Control
                                            onBlur={e => blurHandler(e)}
                                            name="repeatPassword"
                                            value={repeatPassword}
                                            onInput={e => repeatPasswordHandler(e)}
                                            type="password"
                                            placeholder="Повторить пароль"
                                            className={cx.form2}
                                        />
                                    </Form.Group>
                                    <div className={cx.buttonsBlock}>
                                        <Button
                                            onClick={() => {
                                                //setConfirmation(true)
                                                register();
                                            }}
                                            className={cx.button}
                                            variant="secondary"
                                            disabled={!validForm}
                                        >
                                            Продолжить
                                        </Button>{' '}
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