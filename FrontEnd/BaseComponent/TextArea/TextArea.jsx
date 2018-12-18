import React from "react";

import css from "./TextArea.css"

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
            minHeight:(this.props.height)?this.props.height:"100px",
        };
        style = JsonAdd(style, this.props.style);
        return(
            <textarea className={css.input + " " + this.props.className} style={style} placeholder={this.props.placeholder}
                onChange={this.props.onChange}
            />
        )
    }
}

module.exports=Button;