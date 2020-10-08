import React, { ReactElement, ReactFragment } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom'


type MyProps = {
    sleep?: boolean,
    _key:string,
    content(... awfw:any): JSX.Element
};

type MyState = {

};

export function RemoteRun(key:string, ...awf:any){
    if(RemoteUpdate.forceUpdates && RemoteUpdate.forceUpdates[key]){
        const args = [];
        const _args = [...arguments as any];

        for (let index = 1; index < _args.length; index++) {
            args.push(_args[index]);
        }
        RemoteUpdate.forceUpdates[key](...args);
    }
}

export class RemoteUpdate extends React.Component<MyProps, MyState> {

    sleep =false;
    parse:any = [];

    constructor(props:any){
        super(props);
    }

    static forceUpdates:any = [];

    componentWillMount(){
        const {sleep=false} = this.props;
        if(sleep) this.sleep = true;
    }
    componentDidMount(){
        const {_key} = this.props;
        const _this = this;

        if(!RemoteUpdate.forceUpdates) RemoteUpdate.forceUpdates = {
            run: function(key:string){
                if(RemoteUpdate.forceUpdates && RemoteUpdate.forceUpdates[key]){
                    const args = [];
                    const _args = [...arguments as any];

                    console.log(_args);

                    for (let index = 1; index < _args.length; index++) {
                        args.push(_args[index]);
                    }
                    RemoteUpdate.forceUpdates[key](...args);
                }
            }
        };

        RemoteUpdate.forceUpdates[_key] =  function (){
            _this.sleep = false;
            _this.parse = arguments as {};
            _this.forceUpdate();
        }
    }
    componentWillUnmount(){
        const {_key} = this.props;
        delete RemoteUpdate.forceUpdates[_key];
    }

    render(){
        const {content,children} = this.props;
        if(this.sleep){
            return null;
        }
        if(!content){
            return children;
        }
        const {parse} = this;

        return content(...parse);
    }
}
