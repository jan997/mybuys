
import React from 'react';
import { TypeHistory, TypeProps } from "../utils/utlls";

export function BoxCenter(props:{className?: string} & TypeProps){
    return (
        <div className={`row ${props.className}`}>
            <div className="col-12 col-sm-9 col-lg-4 mx-auto">
                <div className="bg-white shadow rounded py-3 px-4">
                    {props.children}
                </div>
            </div>
        </div>
    );
}