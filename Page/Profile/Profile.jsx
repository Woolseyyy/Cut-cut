import React from "react";

import css from "./Profile.css"
import Button from "../../BaseComponent/Button/Button.jsx";
import TextInput from "../../BaseComponent/TextInput/TextInput.jsx";
import List from "../../BaseComponent/List/List.jsx";
import Nav from "../../Common/Component/Nav/Nav.jsx";

import CutIcon from "material-design-icons/content/svg/production/ic_content_cut_48px.svg";

class Article extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            user:{
                avatar:require('./static/avatar.jpg'),
                username:'',
                email:''
            },
            cuts:[]
        };
    }
    componentDidMount(){
        $.ajax({
            type: 'GET',
            url:"http://127.0.0.1:3000/profile",
            xhrFields:{
                withCredentials:true
            },
            success: (result) => {
                result= JSON.parse(result);
                let user = result.user;
                user.avatar = null;
                this.setState({user:user, cuts:result.cuts});
            }
        });
        // $.get("http://127.0.0.1:3000/article?id="+this.props.location.query.id, function(result){
        //     var data = JSON.parse(result).news;
        //     data.date = new Date(data.date);
        //     this.setState({data:data});
        // }.bind(this));
    }
    render(){
        return(
            <div className={css.background}>
                <Nav/>
                <div className={css.content}>
                    <div className={css.avatar} style={{backgroundImage: 'url('+this.state.user.avatar+')'}}/>
                    <div className={css.username}>
                        {this.state.user.username}
                    </div>
                    <div className={css.email}>
                        {this.state.user.email}
                    </div>
                    <div className={css.title}>剪报册</div>
                    <table width='100%'>
                        <tbody>
                        {
                            this.state.cuts.map((item, key)=>{
                                return(
                                    <tr key={key} className={css.cut} onClick={()=>{
                                        window.location.href="#/editor?create=0&id="+item._id
                                    }}>
                                        <td>
                                            {item.title}
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                    <div className={css.addButton} onClick={()=>{
                            window.location.href="#/editor?create=1"
                    }}>
                        <span className={css.addIcon}>add</span>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports=Article;
