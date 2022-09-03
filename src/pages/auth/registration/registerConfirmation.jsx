import React, {useEffect, useState} from 'react';
import cx from "../auth.module.scss";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormError from "../../../ui/formError/FormError";

const RegisterConfirmation = ({setConfirmation}) => {

    const [code, setCode] = useState("")
    const [codeDirty, setCodeDirty] = useState(false)
    const [codeError, setCodeError] = useState("")
    const [validForm, setValidForm] = useState(false)

    useEffect(() => {
        if (!code || codeError) {
            setValidForm(false)
        } else {
            setValidForm(true)
        }
    }, [code, codeError])

    const blurHandler = () => {
        setCodeDirty(true)
        if (!code) {
            setCodeError("Введите код")
        }
    }

    const codeHandler = (e) => {
        setCode(e.target.value)
        if (e.target.value === "") {
            setCodeError("Введите код")
        } else {
            setCodeError("")
        }
    }

    const onButtonClick = () => {
        if (!code) {
            setCodeError("Введите код")
        }
    }

    return (
        <div>
            <div className={cx.wrapper}>
                <div className={cx.container}>
                    <Card className={cx.card}>
                        <Card.Header className={cx.cardHeader}>Подтверждение</Card.Header>
                        <Card.Body className={cx.cardBody}>
                            <Form.Group className={cx.formGroup}>
                                <Form.Control
                                    onBlur={blurHandler}
                                    value={code}
                                    onInput={e => codeHandler(e)}
                                    type="text"
                                    placeholder="Код с почты"
                                />
                                {codeDirty ? (codeDirty && codeError) && <FormError error={codeError}/>
                                    : (codeError) && <FormError error={codeError}/>
                                }
                            </Form.Group>
                            <div className={cx.buttonsBlock}>
                                <div onClick={onButtonClick}>
                                    <Button className={cx.button}
                                            disabled={!validForm} variant="secondary">Подтвердить</Button>{' '}
                                    <Button
                                        onClick={() => setConfirmation(false)}
                                        className={cx.button}
                                        variant="secondary"
                                    >
                                        Назад
                                    </Button>{' '}
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default RegisterConfirmation;