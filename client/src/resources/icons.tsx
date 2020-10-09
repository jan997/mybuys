import { TypeProps } from "../utils/utlls";


import React, { HTMLAttributes, SVGProps } from "react";


export function SVG_ViewList(props:TypeProps){
    return ( <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width={24} height={24} viewBox="0 0 172 172" style={{fill: '#000000'}}><g fill="none" fillRule="nonzero" stroke="none" strokeWidth={1} strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit={10} strokeDashoffset={0} fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{mixBlendMode: 'normal'}}><path d="M0,172v-172h172v172z" fill="none" /><g className="fill"><path d="M21.5,32.25c-5.93706,0 -10.75,4.81294 -10.75,10.75c0,5.93706 4.81294,10.75 10.75,10.75c5.93706,0 10.75,-4.81294 10.75,-10.75c0,-5.93706 -4.81294,-10.75 -10.75,-10.75zM50.16667,35.83333v14.33333h107.5v-14.33333zM21.5,75.25c-5.93706,0 -10.75,4.81294 -10.75,10.75c0,5.93706 4.81294,10.75 10.75,10.75c5.93706,0 10.75,-4.81294 10.75,-10.75c0,-5.93706 -4.81294,-10.75 -10.75,-10.75zM50.16667,78.83333v14.33333h107.5v-14.33333zM21.5,118.25c-5.93706,0 -10.75,4.81294 -10.75,10.75c0,5.93706 4.81294,10.75 10.75,10.75c5.93706,0 10.75,-4.81294 10.75,-10.75c0,-5.93706 -4.81294,-10.75 -10.75,-10.75zM50.16667,121.83333v14.33333h107.5v-14.33333z" /></g></g></svg>);
}

export function SVG_Delete({className="",center=false,size=24, ...rest}:{size?: number, className?:string, center?: boolean}&TypeProps  & React.HTMLAttributes<SVGElement>){
    return (<svg xmlns="http://www.w3.org/2000/svg" {...rest} className={`${className} ${center?"wh-center":""} `}  x="0px" y="0px" width={size} height={size} viewBox="0 0 172 172" ><g fill="none" fillRule="nonzero" stroke="none" strokeWidth={1} strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit={10}  strokeDashoffset={0} fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{mixBlendMode: 'normal'}}><path d="M0,172v-172h172v172z" fill="none" /><g id="original-icon" className="fill"><path d="M71.66667,14.33333l-7.16667,7.16667h-35.83333v14.33333h21.5h71.66667h21.5v-14.33333h-35.83333l-7.16667,-7.16667zM35.83333,50.16667v93.16667c0,7.88333 6.45,14.33333 14.33333,14.33333h71.66667c7.88333,0 14.33333,-6.45 14.33333,-14.33333v-93.16667z" /></g></g></svg>);
} 

export function SVG_Salir({className="",center=false,size=24, ...rest}:{size?: number, className?:string, center?: boolean}&TypeProps  & React.HTMLAttributes<SVGElement>){
    return (<svg xmlns="http://www.w3.org/2000/svg" {...rest} className={`${className} ${center?"wh-center":""} `} x="0px" y="0px" width={24} height={24} viewBox="0 0 172 172" style={{fill: '#000000'}}><g fill="none" fillRule="nonzero" stroke="none" strokeWidth={1} strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit={10} strokeDashoffset={0} fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{mixBlendMode: 'normal'}}><path d="M0,172v-172h172v172z" fill="none" /><g fill="1"><path d="M28.66667,14.33333v100.33333h20.22433h0.00717c1.97083,0 3.784,-0.91017 4.988,-2.50117l1.763,-2.322l10.95783,8.42083l-1.763,2.31483c-3.612,4.76583 -9.99033,8.42083 -15.94583,8.42083c-0.00717,0 -0.01433,0 -0.0215,0h-20.21v28.66667h43.42283l12.05433,-31.51183c0.72383,-1.85617 0.48017,-3.8915 -0.53033,-5.547l-20.2315,-14.1685c-5.31767,-3.89867 -6.74383,-11.223 -3.28233,-16.8345l13.3085,-23.32033l-6.59333,-1.0965c-1.505,-0.52317 -3.2465,-0.41567 -4.773,0.344l-20.53967,10.277l-5.66883,-11.309l20.54683,-10.28417c4.59383,-2.29333 10.54217,-3.64783 15.40833,-1.97083l8.03383,2.93117l11.008,4.90917c3.79833,1.6985 6.9445,4.67983 8.84367,8.385l5.06683,6.923c1.08933,2.11417 2.91683,3.44 5.289,3.44h18.97017v14.33333l-18.64767,-0.01433c-7.13083,0 -13.588,-3.94167 -16.856,-10.2985l-2.72333,-4.042l-11.30183,20.37483l12.5345,11.27317c5.31767,5.32483 6.99467,13.29417 4.26417,20.28883l-10.26983,26.918h57.33333v-143.33333zM98.642,57.33333c-6.9875,0 -12.64917,-5.66167 -12.64917,-12.64917c0,-6.9875 5.66167,-12.64917 12.64917,-12.64917c6.9875,0 12.64917,5.66167 12.64917,12.64917c0,6.9875 -5.66167,12.64917 -12.64917,12.64917z" /></g></g></svg>
    );
} 

export function SVG_Close({className="",center=false,size=24, ...rest}:{size?: number, className?:string, center?: boolean}&TypeProps  & React.HTMLAttributes<SVGElement>){
    return (<svg xmlns="http://www.w3.org/2000/svg" {...rest} className={`${className} ${center?"wh-center":""} `}  x="0px" y="0px" width={size} height={size} viewBox="0 10 172 172" ><g fill="none" fillRule="nonzero" stroke="none" strokeWidth={1} strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit={10}  strokeDashoffset={0} fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{mixBlendMode: 'normal'}}><path d="M0,172v-172h172v172z" fill="none" /><g fill="#ffffff"><path d="M45.74349,34.28802c-4.66401,0.00578 -8.85992,2.83567 -10.61285,7.15775c-1.75292,4.32207 -0.71362,9.27524 2.62873,12.52819l32.02604,32.02604l-32.02604,32.02604c-2.99552,2.87604 -4.20218,7.14678 -3.15461,11.16516c1.04756,4.01838 4.18566,7.15647 8.20404,8.20403c4.01838,1.04756 8.28912,-0.1591 11.16516,-3.15462l32.02604,-32.02604l32.02604,32.02604c2.87603,2.99556 7.14679,4.20225 11.1652,3.1547c4.0184,-1.04756 7.15652,-4.18567 8.20408,-8.20408c1.04756,-4.0184 -0.15913,-8.28917 -3.1547,-11.1652l-32.02604,-32.02604l32.02604,-32.02604c3.39139,-3.29657 4.4111,-8.33702 2.56778,-12.6926c-1.84331,-4.35558 -6.17151,-7.13275 -10.89903,-6.99334c-2.97902,0.08876 -5.80647,1.33381 -7.88333,3.47135l-32.02604,32.02604l-32.02604,-32.02604c-2.16155,-2.22196 -5.13056,-3.4742 -8.23047,-3.47135z" /></g></g></svg>);
} 

export function SVG_Up({className="",center=false,size=24, ...rest}:{size?: number, className?:string, center?: boolean}&TypeProps  & React.HTMLAttributes<SVGElement>){
    return (<svg xmlns="http://www.w3.org/2000/svg" {...rest} className={`${className} ${center?"wh-center":""} `}  x="0px" y="0px" width={size} height={size} viewBox="0 0 226 226" ><g fill="none" fillRule="nonzero" stroke="none" strokeWidth={1} strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit={10}  strokeDashoffset={0} fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{mixBlendMode: 'normal'}}><path d="M0,226v-226h226v226z" fill="none" /><g className="fill"><path d="M187.60354,160.86021c1.19121,-2.40596 0.90871,-5.28275 -0.71567,-7.41563l-68.27083,-89.45833c-2.67433,-3.503 -8.55033,-3.503 -11.22937,0l-68.27083,89.45833c-1.62908,2.13288 -1.90688,5.00967 -0.71567,7.41563c1.1865,2.41067 3.64425,3.93146 6.328,3.93146h136.54167c2.68375,0 5.1415,-1.52079 6.33271,-3.93146z" /></g></g></svg>);
} 

export function SVG_Down({className="",center=false,size=24, ...rest}:{size?: number, className?:string, center?: boolean}&TypeProps  & React.HTMLAttributes<SVGElement>){
    return (<svg xmlns="http://www.w3.org/2000/svg" {...rest} className={`${className} ${center?"wh-center":""} `}  x="0px" y="0px" width={size} height={size} viewBox="0 0 172 172" ><g fill="none" fillRule="nonzero" stroke="none" strokeWidth={1} strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit={10}  strokeDashoffset={0} fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{mixBlendMode: 'normal'}}><path d="M0,172v-172h172v172z" fill="none" /><g className="fill"><path d="M137.95833,46.58333h-103.91667c-2.0425,0 -3.913,1.15742 -4.81958,2.99208c-0.90658,1.83108 -0.69158,4.0205 0.54467,5.64375l51.95833,68.08333c1.02125,1.333 2.59792,2.11417 4.27492,2.11417c1.677,0 3.25367,-0.78117 4.27133,-2.11417l51.95833,-68.08333c1.23983,-1.62325 1.45125,-3.81267 0.54467,-5.64375c-0.903,-1.83467 -2.7735,-2.99208 -4.816,-2.99208z" /></g></g></svg>);
} 

export function SVG_Logo({className="",center=false,size=24, ...rest}:{size?: number, className?:string, center?: boolean}&TypeProps  & React.HTMLAttributes<SVGElement>){
    return (<svg xmlns="http://www.w3.org/2000/svg" {...rest} className={`${className} ${center?"wh-center":""} `}  x="0px" y="0px" width={size} height={size} viewBox="0 0 172 172" ><g fill="none" fillRule="nonzero" stroke="none" strokeWidth={1} strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit={10}  strokeDashoffset={0} fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{mixBlendMode: 'normal'}}><path d="M0,172v-172h172v172z" fill="none" /><g className="fill"><path d="M119.14583,86v3.23933c0,16.24683 -3.59767,26.0795 -10.69267,34.53617c-7.16667,8.54267 -16.4475,12.255 -29.89933,12.37683l-1.51217,0.01433v-48.27467l23.29167,-9.05867v-14.33333l-23.29167,9.05867v-14.33333l23.29167,-9.05867v-14.33333l-23.29167,9.05867v-23.392h-17.91667v30.358l-23.29167,9.05867v14.33333l23.29167,-9.05867v14.33333l-23.29167,9.05867v14.33333l23.29167,-9.05867v55.642h19.006c11.5455,0 21.81533,-2.4295 30.51567,-7.23117c8.6645,-4.78017 15.44417,-11.77483 20.15983,-20.79767c4.7515,-9.0945 7.23117,-19.91617 7.36017,-32.17117v-4.3z" /></g></g></svg>);
} 

export function SVG_Logo2({className="",center=false,size=24, ...rest}:{size?: number, className?:string, center?: boolean}&TypeProps  & React.HTMLAttributes<SVGElement>){
    return (<svg xmlns="http://www.w3.org/2000/svg" {...rest} className={`${className} ${center?"wh-center":""} `}  x="0px" y="0px" width={size} height={size} viewBox="0 0 172 172" ><g fill="none" fillRule="nonzero" stroke="none" strokeWidth={1} strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit={10}  strokeDashoffset={0} fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{mixBlendMode: 'normal'}}><path d="M0,172v-172h172v172z" fill="none" /><g className="fill"><path d="M81.1625,6.9875c-5.0525,0 -8.58656,4.01781 -11.0725,7.525c-2.29781,3.225 -6.03344,3.3325 -13.0075,3.3325c-3.70875,0 -8.46562,0.34938 -11.395,2.4725c4.36719,7.32344 10.06469,12.77906 15.265,14.19c2.75469,0.7525 4.97188,0.25531 6.9875,-1.3975c3.34594,-3.17125 7.05469,-6.58437 11.61,-6.235c3.23844,0.22844 6.10063,2.21719 9.46,6.45c0.60469,0.73906 1.46469,1.11531 2.4725,1.1825c1.78719,0.12094 4.00438,-0.94062 5.9125,-2.6875c2.01563,-1.80062 4.34031,-3.64156 6.7725,-5.59c3.93719,-3.15781 10.92469,-8.73437 12.04,-11.395c-1.02125,-0.61812 -2.43219,-1.075 -4.4075,-1.075c-2.72781,0 -5.375,0.67188 -7.955,1.29c-2.20375,0.52406 -4.25969,0.9675 -6.02,0.9675c-1.55875,0 -2.70094,-0.33594 -3.5475,-1.1825c-5.29437,-5.50937 -9.19125,-7.8475 -13.115,-7.8475zM118.1425,23.3275c-2.64719,2.66063 -6.03344,5.36156 -9.675,8.2775c-2.29781,1.84094 -4.56875,3.70875 -6.45,5.375c-3.31906,3.03688 -7.36375,4.66281 -11.0725,4.4075c-2.88906,-0.20156 -5.33469,-1.51844 -7.2025,-3.7625c-2.63375,-3.3325 -4.11187,-3.92375 -4.73,-3.9775c-1.505,-0.04031 -4.23281,2.52625 -6.45,4.6225c-2.76812,2.28438 -5.92594,3.44 -9.245,3.44c-1.38406,0 -2.74125,-0.25531 -4.1925,-0.645c-2.80844,-0.76594 -5.57656,-2.32469 -8.2775,-4.4075c3.38625,3.60125 8.18344,9.9975 9.03,18.92c7.12188,4.4075 23.66344,11.85188 43,0.9675c1.08844,-0.61812 2.35156,-1.505 3.7625,-2.4725c0.1075,-0.08062 0.20156,-0.13437 0.3225,-0.215c-0.94062,-12.77906 6.5575,-22.65562 7.525,-23.865l0.3225,-0.43c1.16906,-1.84094 2.51281,-4.01781 3.3325,-6.235zM131.4725,44.72c-6.73219,-0.30906 -12.73875,2.01563 -17.63,4.73c-0.09406,1.06156 -0.05375,2.10969 0,3.225c1.54531,0.63156 3.07719,1.41094 4.6225,2.15c7.2025,3.46688 14.25719,8.21031 20.64,13.975c0.08063,0.01344 0.13438,0 0.215,0c0.84656,0 1.69313,-0.33594 2.365,-0.9675c1.38406,-1.30344 1.41094,-3.45344 0.1075,-4.8375c-5.92594,-6.26187 -13.23594,-9.01656 -20.425,-9.5675c5.67063,-2.28437 12.30875,-2.91594 19.78,1.1825c1.66625,0.91375 3.70875,0.26875 4.6225,-1.3975c0.91375,-1.66625 0.26875,-3.70875 -1.3975,-4.6225c-4.59562,-2.51281 -8.85531,-3.68187 -12.9,-3.87zM111.585,59.0175c-0.36281,0.24188 -0.72562,0.51063 -1.075,0.7525c-1.58562,1.08844 -2.94281,1.97531 -4.1925,2.6875c-8.46562,4.77031 -16.54156,6.5575 -23.7575,6.5575c-12.52375,0 -22.4675,-5.11969 -27.4125,-8.2775c-21.8225,9.3525 -41.3875,36.64406 -41.3875,59.985c0,37.5175 24.32188,44.3975 72.24,44.3975c47.91813,0 72.24,-6.88 72.24,-44.3975c0,-27.78875 -23.19312,-52.33906 -46.655,-61.705zM86.86,86c15.99063,0 17.93906,12.95375 17.845,19.4575h-6.45c-0.1075,-4.43437 -0.98094,-13.76 -10.965,-13.76c-8.94937,0 -10.8575,7.68625 -10.8575,9.89c0,5.34813 3.52063,10.70969 3.9775,11.61h11.9325v3.3325h-10.32c0.40313,0.80625 1.505,3.49375 1.505,5.6975c0,8.29094 -7.60562,13.27625 -8.7075,14.19l0.1075,0.215c1.31688,-0.55094 4.42094,-2.2575 7.955,-2.2575c4.50156,0 10.26625,2.4725 13.545,2.4725c2.9025,0 5.75125,-2.09625 6.665,-2.795l3.3325,4.945c-1.505,1.33031 -4.98531,3.44 -11.0725,3.44c-4.68969,0 -10.22594,-3.01 -15.48,-3.01c-3.80281,0 -6.36937,1.8275 -7.525,2.58l-3.5475,-4.945c1.06156,-0.69875 8.2775,-5.40187 8.2775,-13.4375c0,-2.74125 -1.37062,-6.08719 -1.8275,-7.095h-6.45v-3.44h4.4075c-1.00781,-1.70656 -3.5475,-5.46906 -3.5475,-11.7175c0,-5.2675 3.41313,-15.3725 17.2,-15.3725z" /></g></g></svg>);
} 















(global as any).SVGParse = (html:string, name:string):string=>{
    
    let result = html;

    result = result.replace("strokeDasharray","");
    result = result.replace("style={{fill: '#000000'}}","");
    
    result = (result as any).replaceAll(/2000\/svg\"/g,"$& {...rest} className={`${className} ${center?\"wh-center\":\"\"} `} ") 

    result = (result as any).replaceAll(/(width|height)\=\{[\d]+\}/g,"$1={size}");

    result = (result as any).replaceAll(/fill\=\"\#34495e\"/g, "className=\"fill\"");
    result = (result as any).replaceAll(/fill\=\"\#95a5a6\"/g, "className=\"fill1\"");
    result = (result as any).replaceAll(/fill\=\"\#ecf0f1\"/g, "className=\"fill2\"");
    result = (result as any).replaceAll(/fill\=\"\#9b59b6\"/g, "className=\"fill3\""); 
    result = (result as any).replaceAll(/fill\=\"\#3498db\"/g, "className=\"fill4\"");

    result = `

export function SVG_${name?name:"D"+parseInt(1000+Math.random()*9999+"")}({className="",center=false,size=24, ...rest}:{size?: number, className?:string, center?: boolean}&TypeProps  & React.HTMLAttributes<SVGElement>){
    return (${result});
} 

    `

    return result;
}
// export function SVG_ViewList2(props:TypeProps){
//     return ( );
// } 