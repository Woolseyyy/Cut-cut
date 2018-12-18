import React from "react";

import css from "./Button.css"

import JsonAdd from "../../util/JsonAdd.js";


class Button extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            hover:false
        };
    }
    componentDidMount(){

    }
    handleMouseEnter(){
        this.setState({hover:true});
    }
    handleMouseOut(){
        this.setState({hover:false});
    }
    render(){
        let backgroundColor;
        let color;
        let height = "32px";
        let width = "150px";
        if(this.props.primary===true){
            backgroundColor = (!this.state.hover)?"rgb(227, 57, 57)":"#ff7a62";
            color = "rgb(255, 255, 255)";
        }
        else if(this.props.second===true){

        }
        else{

        }
        let style={
            background:(this.props.backgroundColor)?this.props.backgroundColor:backgroundColor,
            color:(this.props.color)?this.props.color:color,
            height:(this.props.height)?this.props.height:height,
            width:(this.props.width)?this.props.width:width,
            lineHeight:(this.props.height)?this.props.height:height,
            textAlign:"center"
        };
        style = JsonAdd(style, this.props.style);
        return(
            <div style={style}
                 className={css.button + " " + this.props.className}
                 onMouseEnter={this.handleMouseEnter.bind(this)}
                 onMouseOut={this.handleMouseOut.bind(this)}
                 onClick={this.props.onClick}
            >
                {this.props.text}
            </div>
        )
    }
}

module.exports=Button;