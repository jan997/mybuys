import { useHistory, useParams,useLocation } from "react-router-dom";
import * as H from 'history';
import { type } from "os";

export function SetTitle(title:string){
    document.title = `${title} - MyBuy`
}

export type TypeHistory = H.History;
export type TypeParams = H.Path;

export function GetHistory(props:{to(history:TypeHistory):void}){
    const history = useHistory();
    props.to(history);
    return null;
}

export function GetParams(props:{to(history:{}):void}){
    const params = useParams();
    props.to(params);
    return null;
}
export function useQuery(obj:any):URLSearchParams {
  return new URLSearchParams(obj.search);
}

export function GetQuery(props:{to(history:URLSearchParams):void}){
    const query = useQuery(useLocation());
    props.to(query);
    return null;
}

export function formatNumber(num:number) {
    return new Intl.NumberFormat("de-DE").format(num);
}

export type TypeProps = Readonly<{children?: React.ReactNode;}>;