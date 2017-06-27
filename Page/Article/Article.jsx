import React from "react";

import css from "./Article.css"
import Button from "../../BaseComponent/Button/Button.jsx";
import TextInput from "../../BaseComponent/TextInput/TextInput.jsx";
import List from "../../BaseComponent/List/List.jsx";
import Nav from "../../Common/Component/Nav/Nav.jsx";

import CutIcon from "material-design-icons/content/svg/production/ic_content_cut_48px.svg";

class Entry extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            title:"浙江大学举办双一流争霸赛",
            category:"军事",
            source:"浙大小字报",
            date:"2017/6/9"
        };
    }
    componentDidMount(){

    }
    render(){
        return(
            <div className={css.background}>
                <Nav/>
                <div className={css.content}>
                    <div className={css.cutButton + " " + css.cutBack}/>
                    <div className={css.article + " " + "typo"}>
                        <h1>{this.state.title}</h1>
                        <h2 className="serif"
                            style={{
                                color: "#999",
                                fontSize: "1em",
                                paddingBottom: "2em",
                                borderBottom: "3px double #eee"
                            }}
                        >
                            {this.state.category + "　来源:" + this.state.source + "　" + this.state.date}
                        </h2>
                        <ol id="table">
                            <li><a href="#section1">关于 <i className="serif">Typo.css</i></a></li>
                            <li><a href="#section2">排版实例</a>
                                <ul>
                                    <li><a href="#section2-1">例1：论语学而篇第一</a></li>
                                    <li><a href="#section2-2">例2：英文排版</a></li>
                                </ul>
                            </li>
                            <li><a href="#section3">附录</a>
                                <ul>
                                    <li><a href="#appendix1"><i className="serif">Typo.css</i> 排版偏重点</a></li>
                                    <li><a href="#appendix2">开源许可</a></li>
                                </ul>
                            </li>
                        </ol>

                        <h2 id="section1">一、关于 <i className="serif">Typo.css</i></h2>

                        <p><i className="serif">Typo.css</i> 的目的是，在一致化浏览器排版效果的同时，构建最适合中文阅读的网页排版。</p>
                        <h4>现状和如何去做：</h4>

                        <p className="typo-first">排版是一个麻烦的问题 <sup><a href="#appendix1"># 附录一</a></sup>，需要精心设计，而这个设计却是常被视觉设计师所忽略的。前端工程师更常看到这样的问题，但不便变更。因为在多个 OS 中的不同浏览器渲染不同，改动需要多的时间做回归测试，所以改变变得更困难。而像我们一般使用的
                            Yahoo、Eric Meyer 和 Alice base.css 中采用的 Reset 都没有很好地考虑中文排版。<i className="serif">Typo.css</i> 要做的就是解决中文排版的问题。</p>


                    </div>
                    <div className={css.cutButton}>
                        <object type="image/svg+xml" data={CutIcon} className={css.cutIcon}/>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports=Entry;

class LoginForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentDidMount(){

    }
    render(){
        return(
            <div className={css.container}>
                <div className={css.title}>登录 CUTCUT</div>
                <div>
                    <div>
                        <TextInput style={{width:"235px"}} placeholder="用户名"/>
                    </div>
                    <div>
                        <TextInput style={{width:"235px"}} placeholder="密码"/>
                    </div>
                </div>
                <div>
                    <Button text="登录" style={{
                        fontSize: '19px',
                        fontWeight: '400px',
                        letterSpacing:'4px',
                        width:"235px",
                        margin:"30px 0"
                    }}
                            primary={true}/>
                </div>
            </div>
        )
    }
}

class Interest extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            choice:["军事","军事","军事","军事","军事","军事","军事"],
            activeState:[]
        };
    }
    componentDidMount(){

    }
    handleActiveState(state){
        this.setState({activeState:state});
    }
    render(){
        return(
            <div className={css.container}>
                <div className={css.title}>兴趣</div>
                <List data={this.state.choice} activeState={this.state.activeState}
                      activeStateChange={this.handleActiveState.bind(this)}/>
                <div>
                    <Button text="Enjoy it!"
                            width={"360px"}
                            height={"50px"}
                            style={{
                                fontSize: '19px',
                                fontWeight: '400px',
                                letterSpacing:'4px',
                                margin:"30px 0"
                            }}
                            primary={true}/>
                </div>

            </div>
        )
    }
}
