

import { Console } from 'console';
import React from 'react';
import { TypeProps } from '../utils/utlls';

export enum SMode{
    Default = "default",
    Loading = "loading",
    Complete = "complete",
    Error = "error"
}

type MyProps<T=any> = {
    task(): Promise<T>,
    _key?: string,

    RAW?(data:T, ajax: SLEP<T>):Promise<void>|void,

    LOADING?(ajax:SLEP<T>):JSX.Element,
    OK?(raw:T, ajax: SLEP<T>):JSX.Element,
    ERR?(raw:T, ajax: SLEP<T>):JSX.Element,
};

type MyState<TypeResponse> = {  
    mode: SMode,
    data?: TypeResponse,
    error?: any,
    cound: number
};

export function GetSlep<T=any>(key:string):SLEP<T>|undefined{
    if(SLEP.all_slep[key]) return SLEP.all_slep[key] as SLEP<T>;
    return undefined;
}

export class SLEP<TypeResponse=any> extends React.Component<MyProps<TypeResponse> & TypeProps, MyState<TypeResponse>> {
    static all_slep: any={};

    mound?:boolean = false;
    first?:boolean = true;
    task?: () => Promise<TypeResponse>;
    _key?:string;

    first_data?:MyState<TypeResponse>;


    state:MyState<TypeResponse>={
        mode: SMode.Loading,
        data: undefined,
        error: undefined,
        cound: 0
    };

    constructor(props:MyProps){
        super(props);
        this.reload();
    }

    async reload({update=true, reset=false}: {update?:boolean, reset?:boolean}={}){
        const _cound = update? (this.state.cound + 1): this.state.cound;

        if(reset===true) this.Update({mode: SMode.Loading, data: undefined , cound: _cound});
        
        const {task,_key,RAW} = this.props;

        this.task = task;
        this._key = _key;

        var state: Pick<MyState<TypeResponse>,any>;
        try {
            const result = await task();
            if(RAW) await RAW(result, this);

            state = {
                data: result,
                error: undefined,
                cound: _cound,
                mode:SMode.Complete
            };
        } catch (error) {
            console.log(error);
            state = {
                data: undefined,
                error: error,
                cound: _cound,
                mode:SMode.Error
            };
        }

        this.Update(state);
    }

    Update(state: Pick<MyState<TypeResponse>,any>){
        if(this.mound) this.setState(state);
        else{
            this.first_data = Object.assign({},state,this.state) as MyState<TypeResponse>;
        };
    }

    componentDidMount(){
        this.mound = true;
    }

    componentWillUnmount() {
        if(this.props._key && this.props._key in SLEP.all_slep) delete SLEP.all_slep[this.props._key];
    }

    async componentDidUpdate(){
        if(this.task !== this.props.task || this._key !== this.props._key){
            await this.reload({reset: true});
        }
    }

    render(){
        const {LOADING, ERR, OK} = this.props;
        const {mode,data, error} = this.first ? this.first_data || this.state : this.state;
        console.log(mode,data);

        if(LOADING && mode === SMode.Loading) return LOADING(this);

        if(OK && mode === SMode.Complete && data) return OK(data,this);

        if(ERR && mode === SMode.Error) return ERR(error,this);

        this.first = false;

        return null;
    }
}