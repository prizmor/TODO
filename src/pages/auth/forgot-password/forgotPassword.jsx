import React, {useEffect, useState} from 'react';
import cx from "../auth.module.scss"
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import ConfirmationPassword from "./confirmationPassword";
import FormError from "../../../ui/formError/FormError";

const ForgotPassword = () => {

    const [confirmation, setConfirmation] = useState(false)
    const [login, setLogin] = useState("")
    const [loginDirty, setLoginDirty] = useState(false)
    const [loginError, setLoginError] = useState("")
    const [validForm, setValidForm] = useState(false)

    useEffect(() => {
        if (loginError || !login) {
            setValidForm(false)
        } else {
            setValidForm(true)
        }
    }, [loginError, login])

    const blurHandler = () => {
        setLoginDirty(true)
        if (!login) {
            setLoginError("Введите логин")
        }
    }

    const loginHandler = (e) => {
        setLogin(e.target.value)
        if (e.target.value === "") {
            setLoginError("Введите логин")
        } else {
            setLoginError("")
        }
    }

    const onButtonClick = () => {
        if (!login) {
            setLoginError("Введите логин")
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
                                    <Form.Group className={cx.formGroup}>
                                        <Form.Control
                                            onBlur={blurHandler}
                                            value={login}
                                            onChange={e => loginHandler(e)}
                                            type="text"
                                            placeholder="Логин"
                                        />
                                        { loginDirty ? (loginDirty && loginError) && <FormError error={loginError}/>
                                            : (loginError) && <FormError error={loginError}/>
                                        }
                                    </Form.Group>
                                    <div className={cx.buttonsBlock}>
                                        <div onClick={onButtonClick}>
                                            <Button
                                                disabled={!validForm}
                                                onClick={() => setConfirmation(true)}
                                                className={cx.button}
                                                variant="secondary"
                                            >
                                                Отправить письмо на почту
                                            </Button>{' '}
                                        </div>
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