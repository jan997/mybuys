import { error } from "console";
import React from "react";
import {Link, NavLink} from "react-router-dom";
import { ICategory } from "../../../api/category";
import { SVG_Close } from "../../../resources/icons";
import { CategoryIcon } from "./icon";
import { M5235 } from "./input_category";

type MyProps = {
    category: ICategory,
    active?: boolean,
    select?(ic:ItemCategory):void,
    trans?:boolean,
    mode?: M5235
}; 
 
type MyState = { 
};

export class ItemCategory extends React.Component<MyProps, MyState> {
    state: MyState = {
    };

    Click(e:React.MouseEvent<HTMLDivElement, MouseEvent>){
        if(this.props.select && this.props.mode !==M5235.Edit) this.props.select(this);
    }

    render() {
        const {category,trans,mode = M5235.Normal} = this.props;
        return (<>
            <div className={`item-category py-2  ${mode == M5235.Edit?"edit":"normal"} m-1 text-center ${this.props.active?"active":""}`} onClick={this.Click.bind(this)}>
                
                <div className="option">
                    {mode===M5235.Normal?null:(
                        <div className="close">
                            <SVG_Close size={22}/>
                        </div>
                    )}
                </div>
                <div className="" style={{opacity:trans?0.5:1}}>
                    <CategoryIcon category={category} className="mx-auto"/>
                </div>
                <div className="text mt-1">
                    {category.name}
                </div>
            </div>
        </>);
    }
} 