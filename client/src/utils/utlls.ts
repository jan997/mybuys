import { useHistory } from "react-router-dom";
import * as H from 'history';
import { type } from "os";

export function SetTitle(title:string){
    document.title = `${title} - MyBuy`
}

export type TypeHistory = H.History;

export function GetHistory(props:{to(history:TypeHistory):void}){
    const history = useHistory();
    props.to(history);
    return null;
}

export type TypeProps = Readonly<{children?: React.ReactNode;}>;