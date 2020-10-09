

import { Console } from 'console';
import React from 'react';
import { TypeProps } from '../utils/utlls';

export enum SMode{
    Default = "default",
    Loading = "loading",
    Complete = "complete",
    Error = "error"
}

type MyProps<T=any,C=any> = {
    task(config:C | undefined,slep:SLEP<T,C>): Promise<T>,
    _key?: string,

    RAW?(data:T, ajax: SLEP<T,C>):Promise<void>|void,

    LOADING?(ajax:SLEP<T,C>):JSX.Element,
    OK?(raw:T, slep: SLEP<T,C>):JSX.Element,
    ERR?(raw:T, slep: SLEP<T,C>):JSX.Element,
};

type MyState<TypeResponse> = {  
    mode: SMode,
    data?: TypeResponse,
    error?: any,
    cound: number
};

export function GetSlep<T=any,R=any>(key:string):SLEP<T,R>|undefined{
    if(SLEP.all_slep[key]) return SLEP.all_slep[key] as SLEP<T,R>;
    return undefined;
}

export class SLEP<TypeResponse=any, TypeConfig=any> extends React.Component<MyProps<TypeResponse,TypeConfig> & TypeProps, MyState<TypeResponse>> {
    static all_slep: any={};

    mound?:boolean = false;
    first?:boolean = true;
    task?: (config: TypeConfig|undefined, slep: SLEP<TypeResponse,TypeConfig>) => Promise<TypeResponse>;
    _key?:string;
    data?:TypeConfig;

    first_data?:MyState<TypeResponse>;


    state:MyState<TypeResponse>={
        mode: SMode.Loading,
        data: undefined,
        error: undefined,
        cound: 0
    };

    constructor(props:MyProps){
        super(props);
        if(props._key) SLEP.all_slep[props._key] = this;
        this.reload();
    }

    async reload({update=true, reset=false,value,value_fusion}: {update?:boolean, reset?:boolean, value?:TypeConfig,value_fusion?:boolean}={}){
        const _cound = update? (this.state.cound + 1): this.state.cound;
        
        if(reset===true) this.Update({mode: SMode.Loading, data: undefined , cound: _cound});

        if(value){
            if(value_fusion && this.data) Object.assign<TypeConfig,TypeConfig>(this.data,value)
            else this.data = value;
        }
        
        const {task,_key,RAW} = this.props;

        this.task = task;
        this._key = _key;

        var state: Pick<MyState<TypeResponse>,any>;
        try {
            const result = await task(this.data,this);
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
        this.mound = false;
        if(this.props._key && this.props._key in SLEP.all_slep) delete SLEP.all_slep[this.props._key];
    }

    // async componentDidUpdate(){
    //     if(this.task !== this.props.task || this._key !== this.props._key){
    //         await this.reload({reset: true});
    //     }
    // }

    render(){
        const {LOADING, ERR, OK} = this.props;
        const {mode,data, error} = this.first ? this.first_data || this.state : this.state;

        if(LOADING && mode === SMode.Loading) return LOADING(this);

        if(OK && mode === SMode.Complete && data) return OK(data,this);

        if(ERR && mode === SMode.Error) return ERR(error,this);

        this.first = false;

        return null;
    }
}