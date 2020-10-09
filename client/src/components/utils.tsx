
import React from 'react';
import { TypeHistory, TypeProps } from "../utils/utlls";

export enum BoxSize{
    Small = "col-12 col-sm-9 col-lg-4",
    Mediano = "col-12 col-sm-12 col-lg-8",
}

export function BoxCenter(props:{
        className?: string, 
        size?:BoxSize, 
        padding?:boolean,
        backgraund?: boolean
    } & TypeProps){
    return (
        <div className={`row ${props.className}`}>
            <div className={`${props.size||BoxSize.Small} mx-auto`}>
                <div className={`${props.backgraund===false?"":"bg-white shadow rounded"} ${props.padding===false?"":"py-3 px-4"}`}>
                    {props.children}
                </div>
            </div>
        </div>
    );
}