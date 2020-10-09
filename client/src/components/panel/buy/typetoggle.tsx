import { render } from "@testing-library/react";
import React, { useState } from "react";
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";
import ToggleButton from "react-bootstrap/esm/ToggleButton";
import { BuyType } from "../../../api/buy";
import { TypeProps } from "../../../utils/utlls";
import { SVG_Up,SVG_Down } from "../../../resources/icons";

export function TypeToggleButtons(props:{OnChahge(type?:BuyType):void} & TypeProps) {
    const [radioValue, setRadioValue] = useState<BuyType|undefined>(undefined); 
  
    const radios = [
      { name: (<SVG_Up/>), value: BuyType.In, variant: "outline-success" },
      { name: 'Todos', value: undefined , variant:"outline-info"},
      { name: (<SVG_Down/>), value: BuyType.Out, variant: "outline-danger"},
    ];
  
    return (
      <>
        <ButtonGroup className="ToggleButton" toggle>
          {radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              type="radio"
              variant={radio.variant}
              name="radio"
              value={idx}
              checked={radioValue === radio.value}
              onChange={(e) => {
                const value = radios[parseInt(e.currentTarget.value)].value;
                setRadioValue(value);
                props.OnChahge(value); 
              }}
              
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </>
    );
  }