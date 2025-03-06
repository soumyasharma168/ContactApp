import React from "react";

export default function Button(props: buttonProps){

    return(
       <button disabled={props.disabled} type={props.type} onClick={props.onClick} className={props.className}>{props.children}</button>
    )
}

interface buttonProps{
    children : string;
    type: "button"|"submit";
    className: string;
    disabled: boolean;
    onClick?(): void
}

Button.defaultProps = {
    type: "button",
    className: "btn btn-primary ",
    disabled: false
}