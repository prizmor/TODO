import React, {useState} from 'react';
import cx from "../auth.module.scss";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import RegisterConfirmation from "./registerConfirmation";

const Register = () => {
    const [confirmation, setConfirmation] = useState(false)

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
                                            type="text"
                                            placeholder="Логин"
                                        />
                                    </Form.Group>
                                    <Form.Group className={cx.formGroup}>
                                        <Form.Control
                                            type="email"
                                            placeholder="Почта"
                                            className={cx.form2}
                                        />
                                    </Form.Group>
                                    <Form.Group className={cx.formGroup}>
                                        <Form.Control
                                            type="password"
                                            placeholder="Пароль"
                                        />
                                    </Form.Group>
                                    <Form.Group className={cx.formGroup}>
                                        <Form.Control
                                            type="password"
                                            placeholder="Повторить пароль"
                                            className={cx.form2}
                                        />
                                    </Form.Group>
                                    <div className={cx.buttonsBlock}>
                                        <Button
                                            onClick={() => setConfirmation(true)}
                                            className={cx.button}
                                            variant="secondary"
                                        >
                                            Продолжить
                                        </Button>{' '}
                                        <Form.Text className="text-muted text-center">
                                            <Link className={cx.link}to={"/auth"}>
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