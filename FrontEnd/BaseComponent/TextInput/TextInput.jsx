import React from "react";

import css from "./TextInput.css"

import JsonAdd from "../../util/JsonAdd.js";


class Button extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount(){

    }
    render(){
        let style={
            height:(this.props.height)?this.props.height:"36px",
            lineHeight:(this.props.height)?this.props.height:"36px"
        };
        let type=(this.props.type)?this.props.type:'text';
        style = JsonAdd(style, this.props.style);
        return(
            <input type={type}
                   className={css.input + " " + this.props.className}
                   style={style}
                   placeholder={this.props.placeholder}
                   onChange={this.props.onChange}
                   onBlur={this.props.onBlur}
            />
        )
    }
}

module.exports=Button;