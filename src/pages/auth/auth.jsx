import React, {useEffect, useMemo, useState} from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Api from '../../api/index';


import cx from "./auth.module.scss"
import {Link} from "react-router-dom";

const Auth = () => {

    const [login, setLogin] = useState('')
    const [loginDirty, setLoginDirty] = useState(false)
    const [loginError, setLoginError] = useState('Введите логин')
    const [password, setPassword] = useState('')
    const [passwordDirty, setPasswordDirty] = useState(false)
    const [passwordError, setPasswordError] = useState('Введите пароль')
    const [formValid, setFormValid] = useState(false)


    useEffect(() => {
        if (loginError || passwordError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [loginError, passwordError])

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'login': {
                setLoginDirty(true)
                break
            }
            case 'password': {
                setPasswordDirty(true)
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
        if (formValid) {
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
                            {(loginDirty && loginError) && <div>{loginError}</div>}
                            <Form.Control
                                name="login"
                                onBlur={e => blurHandler(e)}
                                value={login}
                                onChange={(e) => loginHandler(e)}
                                type="text"
                                placeholder="Логин"
                            />
                        </Form.Group>
                        <Form.Group>
                            {(passwordDirty && passwordError) && <div>{passwordError}</div>}
                            <Form.Control
                                name={"password"}
                                onBlur={e => blurHandler(e)}
                                value={password}
                                onChange={(e) => passwordHandler(e)}
                                type="password"
                                placeholder="Пароль"
                                className={cx.form2}
                            />
                            <Form.Text className="text-muted text-left">
                                <Link className={cx.link} to={"/forgot-password"}>
                                    Забыл пароль
                                </Link>
                            </Form.Text>
                        </Form.Group>
                        <div className={cx.buttonsBlock}>
                            <Button
                                disabled={!formValid}
                                className={cx.button}
                                variant="secondary"
                                onClick={auth}
                            >
                                Войти
                            </Button>{' '}
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