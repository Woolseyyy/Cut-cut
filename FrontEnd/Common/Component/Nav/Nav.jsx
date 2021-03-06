import React from "react";

import css from "./Nav.css"

import CollectionIcon from 'material-design-icons/image/svg/production/ic_photo_album_48px.svg';
import SearchIcon from 'material-design-icons/action/svg/production/ic_search_48px.svg';


class Nav extends React.Component{
    constructor(props) {
        super(props);
        let tags = ["推荐"].concat(localStorage.interest.split(','));
        let selected = tags.indexOf(this.props.selected);
        selected = (selected===-1)?0:selected;
        this.state = {
            selected:selected,
            tags:tags
        };
    }
    componentDidMount(){

    }
    handleClick(index){
        this.setState({selected:index});
        window.location.href = "#/board?id="+this.state.tags[index];
        history.go(0);
    }
    render(){

        return(
            <div className={css.container}>
                <div className={css.nav}>
                    <div className={css.left}>
                        <div className={css.tagContainer}>
                            {this.state.tags.map((item,key)=>{
                                return(
                                    <Tag key={key} index={key} text={item} active={key===this.state.selected}  onClick={this.handleClick.bind(this)}/>
                                )
                            })}
                        </div>
                    </div>
                    <div className={css.right}>
                        <div className={css.toolContainer}>
                            <embed src={SearchIcon} className={css.icon}/>
                            <embed src={CollectionIcon} className={css.icon} onClick={()=>window.location.href="#/profile"}/>
                            <img src={require("./static/text_avatar.jpg")} className={css.avatar}onClick={()=>window.location.href="#/profile"}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports=Nav;

class Tag extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            hover:false,
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
        let className;
        if(this.props.active===true){
            className = css.tagActive;
        }
        else if(this.state.hover){
            className = css.tagHover;
        }
        else{
            className = css.tagDefault;
        }
        return(
            <div className={className}
                 onMouseEnter={this.handleMouseEnter.bind(this)}
                 onMouseOut={this.handleMouseOut.bind(this)}
                 onClick={()=>{this.props.onClick(this.props.index)}}>
                {this.props.text}
            </div>
        )
    }
}
