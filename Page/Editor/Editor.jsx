import React from "react";

import css from "./Editor.css"
import Nav from "../../Common/Component/Nav/Nav.jsx";

class Editor extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data:{
                type:'new',
                id:''
            }
        };
    }
    componentDidMount(){

    }
    render(){
        return(
            <div className={css.background}>
                <Nav/>
                <div className={css.content}>

                </div>
            </div>
        )
    }
}

module.exports=Editor;
