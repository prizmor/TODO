import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import cx from "./auth.module.scss"
import {Link} from "react-router-dom";

const Auth = () => {
    return (
        <div className={cx.wrapper}>
            <div className={cx.container}>
                <Card className={cx.card}>
                    <Card.Header  className={cx.cardHeader}>Авторизация</Card.Header>
                    <Card.Body className={cx.cardBody}>
                        <Form.Group className={cx.formGroup}>
                            <Form.Control
                                type="text"
                                placeholder="Логин"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
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
                            <Button className={cx.button} variant="secondary">Войти</Button>{' '}
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