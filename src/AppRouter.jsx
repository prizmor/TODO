import React from "react";
import {Routes, Route, Redirect} from "react-router-dom";
import {publicRoutes} from "./Routes/Routes";

const AppRouter = () => {

    return (
        <div>
            <Routes>
                {publicRoutes.map( r => (
                    <Route key={r.path} exact={r.exact} path={r.path} element={r.element}/>
                ))}
            </Routes>
        </div>
    )
}

export default AppRouter;