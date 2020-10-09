import React from "react";
import { TypeProps } from "../../../utils/utlls";
import { ICategory } from "../../../api/category";

import cash from "../../../resources/vertors/categories/cash.svg";
import electronics from "../../../resources/vertors/categories/electronics.svg";
import events from "../../../resources/vertors/categories/events.svg";
import family from "../../../resources/vertors/categories/family.svg";
import food from "../../../resources/vertors/categories/food.svg";
import friends from "../../../resources/vertors/categories/friends.svg";
import gym from "../../../resources/vertors/categories/gym.svg";
import internet from "../../../resources/vertors/categories/internet.svg";
import job from "../../../resources/vertors/categories/job.svg";
import medicine from "../../../resources/vertors/categories/medicine.svg";
import movies from "../../../resources/vertors/categories/movies.svg";
import photocopies from "../../../resources/vertors/categories/photocopies.svg";
import school from "../../../resources/vertors/categories/school.svg";
import sports from "../../../resources/vertors/categories/sports.svg";
import teléfono from "../../../resources/vertors/categories/teléfono.svg";
import transport from "../../../resources/vertors/categories/transport.svg";
import plus from "../../../resources/vertors/categories/plus.svg";
import none from "../../../resources/vertors/categories/none.svg";


function ColorLuminance(hex:string, lum:number) {

	// validate hex string
	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) {
		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	}
	lum = lum || 0;

	// convert to decimal and change luminosity
	var rgb = "#", c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00"+c).substr(c.length);
	}

	return rgb;
}

export function CategoryIcon(props:{category:ICategory, type?: "out"|"in",className?:string} & TypeProps):JSX.Element{
    const get = (module: any)=>{ 
        const colorB = ((props.category?.type || props.type||"out") === "out"?"#ff8585":"#65d791");
        const colorA = props.category?.color || colorB;
        return <>
            <div className={`category-icon ${props.className||""}`} style={{backgroundColor: `${colorA}`, border: `2px solid ${ColorLuminance(props.type?colorB:colorA,0.3)}`}}>
                <img src={module}/>
            </div>
        </>;
    }

    const icon = props.category?.icon?props.category.icon:"";
    
    if(icon === "none") return get(none);
    if(icon === "plus") return get(plus);
    if(icon === "electronics") return get(electronics);
    if(icon === "events") return get(events);
    if(icon === "family") return get(family);
    if(icon === "food") return get(food);
    if(icon === "friends") return get(friends);
    if(icon === "gym") return get(gym);
    if(icon === "internet") return get(internet);
    if(icon === "job") return get(job);
    if(icon === "medicine") return get(medicine);
    if(icon === "movies") return get(movies);
    if(icon === "photocopies") return get(photocopies);
    if(icon === "school") return get(school);
    if(icon === "sports") return get(sports);
    if(icon === "teléfono") return get(teléfono);
    if(icon === "transport") return get(transport);

    return get(cash);
}