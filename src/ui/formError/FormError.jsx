import React from 'react';
import cx from "./formError.module.scss"

const FormError = ({error}) => {
    return (
        <div className={cx.error}>
            {error}
        </div>
    );
};

export default FormError;