import React, {useMemo, useState} from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import cx from "./auth.module.scss"
import {Link} from "react-router-dom";

const Auth = () => {

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [disabled, setDisabled] = useState(false)

    useMemo(() => {
        if (login === '' || password === '') {
            setDisabled(true)
        } else {
            setDisabled(false)
        }
    }, [password, login])

    return (
        <div className={cx.wrapper}>
            <div className={cx.container}>
                <Card className={cx.card}>
                    <Card.Header className={cx.cardHeader}>Авторизация</Card.Header>
                    <Card.Body className={cx.cardBody}>
                        <Form.Group className={cx.formGroup}>
                            <Form.Control
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                                type="text"
                                placeholder="Логин"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                                disabled={disabled}
                                className={cx.button}
                                variant="secondary"
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