import React from 'react';
import cx from "../auth.module.scss";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useMemo, useState} from "react";

const RegisterConfirmation = ({setConfirmation}) => {

    const [code, setCode] = useState('')
    const [disabled, setDisabled] = useState(false)

    useMemo(() => {
        if (code === '') {
            setDisabled(true)
        } else {
            setDisabled(false)
        }
    }, [code])

    return (
        <div>
            <div className={cx.wrapper}>
                <div className={cx.container}>
                    <Card className={cx.card}>
                        <Card.Header className={cx.cardHeader}>Подтверждение</Card.Header>
                        <Card.Body className={cx.cardBody}>
                            <Form.Group className={cx.formGroup}>
                                <Form.Control
                                    value={code}
                                    onChange={e=> setCode(e.target.value)}
                                    type="text"
                                    placeholder="Код с почты"
                                />
                            </Form.Group>
                            <div className={cx.buttonsBlock}>
                                <Button className={cx.button}
                                        disabled={disabled} variant="secondary">Подтвердить</Button>{' '}
                                <Button
                                    onClick={()=> setConfirmation(false)}
                                    className={cx.button}
                                    variant="secondary"
                                >
                                    Назад
                                </Button>{' '}
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default RegisterConfirmation;