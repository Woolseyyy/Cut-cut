import React from "react";

import css from "./Entry.css"
import Button from "../../BaseComponent/Button/Button.jsx";
import TextInput from "../../BaseComponent/TextInput/TextInput.jsx";
import List from "../../BaseComponent/List/List.jsx";

class Entry extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount(){

    }
    render(){
        return(
            <div className={css.background}>
                <div className={css.mask}/>
                <Interest/>
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
