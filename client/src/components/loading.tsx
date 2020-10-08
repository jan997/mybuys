import React from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom'
import { TypeProps } from '../utils/utlls';

export function Loading({title, margin}:{title?:string, margin?:number} & TypeProps){
    return (
        <div className="componen_loading">
            <div className="conteiner text-center" >
                <div className="lds-ripple" style={{margin: `${margin}px 0px`}}  ><div></div><div></div></div>
                
            </div>
        </div>
    );
}