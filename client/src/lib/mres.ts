var host = window.location.origin.includes(":3000")? "http://localhost:8989": window.location.origin;
host = host.replace(":8989",":2052");

interface IMRestSetting{
    color?: string,
    fast?: boolean
}
interface IMRestResponse{
    result: any,
    status: any,
    statusText: any,
    url: String
}

type TypeMRestResponse = IMRestResponse | any;

export function POST(path:string, body:any, settings?:IMRestSetting):Promise<TypeMRestResponse> {

    const host_api = host + path;

    var myHeaders = new Headers();
    //if(localStorage.token) myHeaders.append("token", localStorage.token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(body);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return SettingResquest({requestPath: host_api, requestOptions: requestOptions},settings||{});
    // return new Promise((c)=>{
    //     fetch(host_api, requestOptions)
    //     .then(response => response.text())
    //     .then(result => c(JSON.parse(result)))
    //     .catch(error => c('error', error));
    // });
};
    
export function  GET(path:string,settings?:IMRestSetting):Promise<TypeMRestResponse>{
    const host_api = host + path;

    var myHeaders = new Headers();
    if(localStorage.token) myHeaders.append("token", localStorage.token);
    
    var raw = "";
    
    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow' 
    };
    
    
    return SettingResquest({requestPath: host_api, requestOptions: requestOptions},settings||{});
    // return new Promise((c,e)=>{        
    //     fetch(host_api, requestOptions)
    //     .then(response => response.text())
    //     .then(result => c(JSON.parse(result)))
    //     .catch(error => c('error', error));
    // });
};

function serialize (obj:any) {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        if(obj[p] === undefined) continue;
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
}
  
export function SettingResquest(awgwa:any,{fast = true}:IMRestSetting):Promise<TypeMRestResponse> {
    const {requestPath, requestOptions} = awgwa;
    if(fast){
        return new Promise((c,e)=>{        
            fetch(requestPath, requestOptions)
            .then(response => response.text())
            .then(result => c(JSON.parse(result)))
            .catch(error => c(undefined));
        });
    }
    return new Promise((c,e)=>{        
        fetch(requestPath, requestOptions)
        .then(async response => {
            const awfWAF:IMRestResponse ={
                result: JSON.parse(await response.text()),
                status: response.status,
                statusText: response.statusText,
                url: response.url
            };
            c(awfWAF)
        })
        .catch(error => c(undefined));
    });
}
  
export function PET (path:string,body={},settings?:IMRestSetting){
    const s = serialize(body);
    const host_api = host + path + (s?`?${s}`:``);

    var myHeaders = new Headers();
    if(localStorage.token) myHeaders.append("token", localStorage.token);
    
    var raw = "";
    
    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow' 
    };
    
    return SettingResquest({requestPath: host_api, requestOptions: requestOptions},settings||{});

    // return new Promise((c,e)=>{        
    //     fetch(host_api, requestOptions)
    //     .then(response => response.text())
    //     .then(result => c(JSON.parse(result)))
    //     .catch(error => c('error', error));
    // });
};


export async function RPOST(path:string, obj={},settings:IMRestSetting):Promise<boolean>{
    const {color="green"} = settings;
    var {data,error} = await POST(path,obj, settings);
    if(error || (!data && !error)){
        if(!data && !error){
            console.log("Servidor no responde","red");
            return false;
        }
        console.log(error,"red");
        return false;
    }
    const {report=""} = data;
    if(report){
        console.log(report,color);
        return true;
    }
    console.log("Se produjo un error");
    return false;
}