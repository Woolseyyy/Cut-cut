import React from "react";

import css from "./Article.css"
import Button from "../../BaseComponent/Button/Button.jsx";
import TextInput from "../../BaseComponent/TextInput/TextInput.jsx";
import List from "../../BaseComponent/List/List.jsx";
import Nav from "../../Common/Component/Nav/Nav.jsx";

import CutIcon from "material-design-icons/content/svg/production/ic_content_cut_48px.svg";

class Article extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data:{
                title:"",
                category:"",
                source:"",
                date:new Date(),
                content:[]
            }
        };
    }
    componentDidMount(){
        $.get("http://127.0.0.1:3000/article?id="+this.props.location.query.id, function(result){
            var data = JSON.parse(result).news;
            data.date = new Date(data.date);
            this.setState({data:data});
        }.bind(this));
    }
    cut(){
        $.ajax({
            type: 'POST',
            url:"http://127.0.0.1:3000/screenShoot",
            data:JSON.stringify({
                //url:window.location.href
                url:this.state.data.sourceAddress
            }),
            contentType:"application/json",
            success: (result) => {
                result = JSON.parse(result);
                let url = result.body.url;
                console.log(url);
            }
        });
    }
    render(){
        return(
            <div className={css.background}>
                <Nav/>
                <div className={css.content}>
                    <div className={css.cutButton + " " + css.cutBack}/>
                    <div className={css.article + " " + "typo"}>
                        <h1>{this.state.data.title}</h1>
                        <h2 className="serif"
                            style={{
                                color: "#999",
                                fontSize: "1em",
                                paddingBottom: "2em",
                                borderBottom: "3px double #eee"
                            }}
                        >
                            {this.state.data.category + "　　来源:"}
                            <a href={this.state.data.sourceAddress}>{this.state.data.source}</a>
                            {"　　" + this.state.data.date.getFullYear() + '-' + this.state.data.date.getMonth() + '-' + this.state.data.date.getDate() + "　"
                                + this.state.data.date.getHours() + ":" + this.state.data.date.getMinutes() + ":" + this.state.data.date.getSeconds()
                            }
                        </h2>
                        {
                            this.state.data.content.map((item, key)=>{
                                if(item.type==="text"){
                                    return(
                                        <p>{item.data}</p>
                                    )
                                }
                                else if (item.type==="img"){
                                    return(
                                        <p><img src={item.src} alt={item.alt}/></p>
                                    )
                                }
                                else{
                                    return null;
                                }
                            })
                        }
                    </div>
                    <div className={css.cutButton} onClick={this.cut.bind(this)}>
                        <span className={css.cutIcon}>content_cut</span>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports=Article;
