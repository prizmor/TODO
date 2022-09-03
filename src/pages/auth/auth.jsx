import React, {useEffect, useMemo, useState} from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Api from '../../api/index';


import cx from "./auth.module.scss"
import {Link} from "react-router-dom";
import FormError from "../../ui/formError/FormError";

const Auth = () => {

    const [login, setLogin] = useState("")
    const [loginDirty, setLoginDirty] = useState(false)
    const [loginError, setLoginError] = useState("")
    const [password, setPassword] = useState("")
    const [passwordDirty, setPasswordDirty] = useState(false)
    const [passwordError, setPasswordError] = useState("")
    const [validForm, setValidForm] = useState(false)


    useEffect(() => {
        if (loginError || passwordError || !login || !password) {
            setValidForm(false)
        } else {
            setValidForm(true)
        }
    }, [loginError, passwordError, login, password])

    const blurHandler = (e) => {
        switch (e.target.name) {
            case "login": {
                setLoginDirty(true)
                if (!login) {
                    setLoginError("Введите логин")
                }
                break
            }
            case "password": {
                setPasswordDirty(true)
                if (!password) {
                    setPasswordError("Введите пароль")
                }
                break
            }
        }
    }

    const onButtonClick = () => {
        if (!login) {
            setLoginError("Введите логин")
        }
        if (!password) {
            setPasswordError("Введите пароль")
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
    }


    const auth = async () => {
        if (validForm) {
            try {
                const res = await Api.Auth.Login(login, password);
                console.log("ok");
            } catch (e) {
                console.log("err");
            }
        }
    }

    return (
        <div className={cx.wrapper}>
            <div className={cx.container}>
                <Card className={cx.card}>
                    <Card.Header className={cx.cardHeader}>Авторизация</Card.Header>
                    <Card.Body className={cx.cardBody}>
                        <Form.Group className={cx.formGroup}>
                            <Form.Control
                                name="login"
                                onBlur={e => blurHandler(e)}
                                value={login}
                                onChange={(e) => loginHandler(e)}
                                type="text"
                                placeholder="Логин"
                            />
                            { loginDirty ? (loginDirty && loginError) && <FormError error={loginError}/>
                                         : (loginError) && <FormError error={loginError}/>
                            }
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                name={"password"}
                                onBlur={e => blurHandler(e)}
                                value={password}
                                onChange={(e) => passwordHandler(e)}
                                type="password"
                                placeholder="Пароль"
                                className={cx.form2}
                            />
                            { passwordDirty ? (passwordDirty && passwordError) && <FormError error={passwordError}/>
                                            : (passwordError) && <FormError error={passwordError}/>
                            }
                            <Form.Text className={`${cx.forgotPass} text-muted text-left`} >
                                <Link className={cx.link} to={"/forgot-password"}>
                                    Забыл пароль
                                </Link>
                            </Form.Text>
                        </Form.Group>
                        <div className={cx.buttonsBlock}>
                            <div onClick={onButtonClick}>
                                <Button
                                    disabled={!validForm}
                                    className={cx.button}
                                    variant="secondary"
                                    onClick={auth}
                                >
                                    Войти
                                </Button>{' '}
                            </div>
                            <Form.Text className="text-muted text-center">
                                <Link className={cx.link} to={"/register"}>
                                    Регистрация
                                </Link>
                            </Form.Text>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

export default Auth;