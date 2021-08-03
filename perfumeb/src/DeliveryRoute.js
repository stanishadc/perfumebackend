import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./Auth";

export const DeliveryRoute = ({ component: Component, ...rest }) => {
    return (
        <Route{...rest}
            render={(props) => {
                if (localStorage.getItem('perfumeDeliveryId') != 'null') {
                    return <Component{...props} />
                }
                else {
                    return (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                    );
                }
            }
            } />
    )
}