import React from 'react';
import cx from "../auth.module.scss";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const ConfirmationPassword = ({setConfirmation}) => {
    return (
        <div className={cx.wrapper}>
            <div className={cx.container}>
                <Card className={cx.card}>
                    <Card.Header className={cx.cardHeader}>Забыл пароль</Card.Header>
                    <Card.Body className={cx.cardBody}>
                        <Card.Text>
                            К вам на почту было отправлено письмо с ссылкой на востановление пароля
                        </Card.Text>
                            <Button
                                onClick={() => setConfirmation(false)}
                                className={cx.button}
                                variant="secondary"
                            >
                                Назад
                            </Button>{' '}
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

export default ConfirmationPassword;