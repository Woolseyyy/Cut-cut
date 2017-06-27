import React from "react";

import css from "./List.css"

import JsonAdd from "../../util/JsonAdd.js";


class List extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            activeState:(this.props.activeState!==null)?this.props.activeState:[]
        };
    }
    componentDidMount(){

    }
    handleActiveChange(index, state){
        let activeState = this.state.activeState;
        activeState[index] = state;
        this.setState({activeState:activeState});
        if(this.props.activeStateChange){
            this.props.activeStateChange(activeState);
        }
    }
    render(){
        let style={

        };
        style = JsonAdd(style, this.props.style);
        return(
            <div style={style} className={css.List + " " + this.props.className}>
                {this.props.data.map((item, key)=>{
                    return(
                        <ListItem key={key} text={item} active={this.state.activeState[key]}
                            onActiveChange={this.handleActiveChange.bind(this)}/>
                    );
                })}
            </div>
        )
    }
}

module.exports=List;


class ListItem extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            active:(this.props.active === true),
            hover:false
        };
    }
    componentDidMount(){

    }
    handleMouseEnter(){
        if(!this.state.active){
            this.setState({hover:true})
        }
    }
    handleMouseOut(){
        this.setState({hover:false})
    }
    render(){
        let style={
            height:(this.props.height)?this.props.height:"60px",
            lineHeight:(this.props.height)?this.props.height:"60px",
            width:(this.props.width)?this.props.width:"340px"
        };
        if(this.state.active){
            style = JsonAdd(style, this.props.activeStyle);
        }
        else if(this.state.hover){
            style = JsonAdd(style, this.props.hoverStyle);
        }
        else{
            style = JsonAdd(style, this.props.style);
        }

        let className;
        if(this.state.active){
            className = css.ListItemActive;
        }
        else if(this.state.hover){
            className = css.ListItemHover;
        }
        else{
            className = css.ListItem;
        }
        return(
            <div className={className + " " + this.props.className} style={style}
                onMouseEnter={this.handleMouseEnter.bind(this)}
                onMouseOut={this.handleMouseOut.bind(this)}
                onClick={()=>{
                    this.setState({active:!this.state.active});
                    this.props.onActiveChange(this.props.key, !(this.state.active));
                }}>
                {this.props.text}
            </div>
        )
    }
}