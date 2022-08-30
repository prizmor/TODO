import React from 'react';
import cx from "../auth.module.scss"
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import {useState, useMemo} from "react";
import ConfirmationPassword from "./confirmationPassword";

const ForgotPassword = () => {

    const [confirmation, setConfirmation] = useState(false)
    const [login, setLogin] = useState('')
    const [disabled, setDisabled] = useState(false)

    useMemo(() => {
        if (login === '') {
            setDisabled(true)
        } else {
            setDisabled(false)
        }
    }, [login])

    return (
        <div>
            {
                !confirmation
                    ? <div className={cx.wrapper}>
                    <div className={cx.container}>
                        <Card className={cx.card}>
                            <Card.Header className={cx.cardHeader}>Забыл пароль</Card.Header>
                            <Card.Body className={cx.cardBody}>
                                <Form.Group className={cx.formGroup}>
                                    <Form.Control
                                        value={login}
                                        onChange={e => setLogin(e.target.value)}
                                        type="text"
                                        placeholder="Логин"
                                    />
                                </Form.Group>
                                <div className={cx.buttonsBlock}>

                                    <Button
                                        disabled={disabled}
                                        onClick={()=>setConfirmation(true)}
                                        className={cx.button}
                                        variant="secondary"
                                    >
                                        Отправить письмо на почту
                                    </Button>{' '}
                                    <Link className={cx.link} to={"/auth"}>
                                        <Button
                                            className={cx.button}
                                            variant="outline-secondary"
                                        >
                                            Назад
                                        </Button>{' '}
                                    </Link>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
                    : <ConfirmationPassword setConfirmation={setConfirmation}/>

            }
        </div>
    );
};

export default ForgotPassword;