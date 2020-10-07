import { error } from "console";
import React from "react";
import {Link, NavLink} from "react-router-dom";
import { SetTitle } from "../../utils/utlls";

type MyProps = {
    Default(lregister:LogicRegister):void
};

type MyState = {

};

export class LogicRegister extends React.Component<MyProps, MyState> {
    state: MyState = {

    };

    componentDidMount(){
        SetTitle("404");
    }

    render() {
        const {children} = this.props;
        return (<>
            {children}
        </>);
    }
} 