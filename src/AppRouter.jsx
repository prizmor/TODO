import React, { useEffect } from "react";
import {Routes, Route, Redirect} from "react-router-dom";
import {publicRoutes} from "./Routes/Routes";
import { useStore, useDispatch } from 'react-redux'
import { connect } from "react-redux";
import { isLogin } from "./redux/reducers/authReducer";

const AppRouter = () => {

    const store = useStore();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!store.getState().auth.auth)
        {
            if (localStorage.getItem("token"))
            {
                dispatch(isLogin(true));
            }
        }
    })

    return (
        <div>
            {store.getState().auth.auth && 'init'}
            <Routes>
                {publicRoutes.map( r => (
                    <Route key={r.path} exact={r.exact} path={r.path} element={r.element}/>
                ))}
            </Routes>
        </div>
    )
}

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps)(AppRouter);