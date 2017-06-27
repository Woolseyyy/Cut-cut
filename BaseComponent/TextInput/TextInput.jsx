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
        style = JsonAdd(style, this.props.style);
        return(
            <input type="text" className={css.input + " " + this.props.className} style={style} placeholder={this.props.placeholder}/>
        )
    }
}

module.exports=Button;