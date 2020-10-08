import React from 'react';
import { TypeProps } from '../utils/utlls';
import { GET, IMRestSetting, PET, POST, TypeRest } from './mres';
//import { Link, Redirect, withRouter } from 'react-router-dom'

export enum RMode{
    Default = "default",
    Loading = "loading",
    Complete = "complete",
    Error = "error"
}

type MyProps = {
    path: string,
    type: TypeRest,
    resquest_setting?: IMRestSetting,
    data?: any,

    _key?: string,

    RAW?(data:any):JSX.Element,

    LOADING?(ajax:AJAX):JSX.Element | JSX.Element,
    OK?<t = any>(raw:t, ajax: AJAX):JSX.Element | JSX.Element,
    OKB?<t = any>(raw:t, ajax: AJAX):JSX.Element | JSX.Element,
    ERR?<t = any>(raw:t, ajax: AJAX):JSX.Element | JSX.Element,
};

type MyState = {  
    mode: RMode,
    data: any,
    error: any,
    cound: number
};

export function GetAjax(key:string):AJAX|undefined{
    if(AJAX.all_ajax[key]) return AJAX.all_ajax[key] as AJAX;
    return undefined;
}

export class AJAX extends React.Component<MyProps & TypeProps, MyState> {
    static all_ajax:any={};

    state:MyState = {
        mode : RMode.Loading,
        data: undefined,
        error: undefined,
        cound: 0
    }

    path?:string;
    _key?:string;
    first?:boolean;

    
    
    async reload({update=true, reset=false}={}){
        const _cound = update? (this.state.cound + 1): 0;
        if(reset) this.setState({mode: RMode.Loading, data: null , cound: _cound});
        this.path = this.props.path;
        const _ok = this.props.RAW?this.props.RAW: (n1:any)=>{};

        if( this.props._key!==undefined ) {AJAX.all_ajax[this.props._key] = this; this._key = this.props._key;}

        //if(this.props.type === undefined) this.props.type = "get"; 
        if(this.props.type === TypeRest.POST){
            try {
                var result1 = await POST(this.props.path, this.props.data, this.props.resquest_setting);
                _ok(result1);
                this.setState({mode:RMode.Complete, data: result1 , cound: _cound});
            } catch (error) {
                this.setState({mode:RMode.Error, error: error, cound: _cound});
            }
        }
        if(this.props.type === TypeRest.GET){
            try {
                var result2 = await GET(this.props.path, this.props.resquest_setting);
                _ok(result2);
                this.setState({mode:RMode.Complete, data: result2, cound: _cound});
            } catch (error) {
                this.setState({mode:RMode.Error, error: error, cound: _cound});
            }
        }
        if(this.props.type === TypeRest.PET){
            try {
                var result3 = await PET(this.props.path, this.props.data, this.props.resquest_setting);
                _ok(result3);
                this.setState({mode:RMode.Complete, data: result3, cound: _cound});
            } catch (error) {
                this.setState({mode:RMode.Error, error: error, cound: _cound});
            }
        }
        return true;
    }

    async componentDidMount() {
        this.first = true;
        await this.reload();
    }

    async componentDidUpdate(){
        if(this.path !== this.props.path || this._key !== this.props._key){
            this.setState({mode:RMode.Loading, error: null, data: null});
            await this.reload();
        }
    }
    
    componentWillUnmount() {

    }

    render(){
        const {LOADING, ERR, OK,OKB=false} = this.props;
        const {mode,data, error} = this.state;
        //const {first} = this;
        this.first = false;

        const OKB2 = OKB;

        if(LOADING && mode === RMode.Loading) return LOADING(this);

        if(ERR && mode === RMode.Error) return ERR(error,this);
        
        if(OK && mode === RMode.Complete){
            if(OKB2){
                return <OKB2 r={data} _this={this}/>
            }
            return (OK(data,this));
        }
        return null;
    }
}