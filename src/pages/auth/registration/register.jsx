import React, {useState, useMemo} from 'react';
import cx from "../auth.module.scss";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import RegisterConfirmation from "./registerConfirmation";
import Api from '../../../api/index';

const Register = () => {
    const [confirmation, setConfirmation] = useState(false)
    const [login, setLogin] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [disabled, setDisabled] = useState(false)

    useMemo(() => {
        if (login === '' || email === '' || password === '' || repeatPassword === '' ) {
            setDisabled(true)
        } else {
            setDisabled(false)
        }
    }, [login, email, password, repeatPassword])


    const register = async () => {
        if (!disabled)
        {
            try{
                const res = await Api.Auth.Register(login, password, email);
                console.log("ok");
            }
            catch(e){
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
                                            value={login}
                                            onChange={e=> setLogin(e.target.value)}
                                            type="text"
                                            placeholder="Логин"
                                        />
                                    </Form.Group>
                                    <Form.Group className={cx.formGroup}>
                                        <Form.Control
                                            value={email}
                                            onChange={e=> setEmail(e.target.value)}
                                            type="email"
                                            placeholder="Почта"
                                            className={cx.form2}
                                        />
                                    </Form.Group>
                                    <Form.Group className={cx.formGroup}>
                                        <Form.Control
                                            value={password}
                                            onChange={e=> setPassword(e.target.value)}
                                            type="password"
                                            placeholder="Пароль"
                                        />
                                    </Form.Group>
                                    <Form.Group className={cx.formGroup}>
                                        <Form.Control
                                            value={repeatPassword}
                                            onChange={e=> setRepeatPassword(e.target.value)}
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
                                            disabled={disabled}
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