import React, {useEffect, useState} from 'react';
import cx from "../auth.module.scss"
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import ConfirmationPassword from "./confirmationPassword";

const ForgotPassword = () => {

    const [confirmation, setConfirmation] = useState(false)
    const [login, setLogin] = useState('')
    const [loginDirty, setLoginDirty] = useState(false)
    const [loginError, setLoginError] = useState('Введите логин')
    const [validForm, setValidForm] = useState(false)

    useEffect(() => {
        if (loginError) {
            setValidForm(false)
        } else {
            setValidForm(true)
        }
    }, [loginError])


    const loginHandler = (e) => {
        setLogin(e.target.value)
        if (e.target.value === '') {
            setLoginError('Введите логин')
        } else {
            setLoginError('')
        }
    }

    return (
        <div>
            {
                !confirmation
                    ? <div className={cx.wrapper}>
                        <div className={cx.container}>
                            <Card className={cx.card}>
                                <Card.Header className={cx.cardHeader}>Забыл пароль</Card.Header>
                                <Card.Body className={cx.cardBody}>
                                    {(loginDirty && loginError) && <div>{loginError}</div>}
                                    <Form.Group className={cx.formGroup}>
                                        <Form.Control
                                            onBlur={ () => setLoginDirty(true)}
                                            value={login}
                                            onChange={e => loginHandler(e)}
                                            type="text"
                                            placeholder="Логин"
                                        />
                                    </Form.Group>
                                    <div className={cx.buttonsBlock}>

                                        <Button
                                            disabled={!validForm}
                                            onClick={() => setConfirmation(true)}
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