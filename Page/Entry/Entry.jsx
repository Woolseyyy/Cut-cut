import React from "react";

import css from "./Entry.css"
import Button from "../../BaseComponent/Button/Button.jsx";
import TextInput from "../../BaseComponent/TextInput/TextInput.jsx";
import List from "../../BaseComponent/List/List.jsx";

class Entry extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            state:'login'
        };
    }
    componentDidMount(){

    }
    changeState(state){
        this.setState({state:state});
    }
    router(){
        if(this.state.state==='login') return <LoginForm changeState={this.changeState.bind(this)}/>;
        else if(this.state.state==='sign') return <SignForm changeState={this.changeState.bind(this)}/>;
        else if(this.state.state==='interest') return <Interest/>;
        else return null;
    }
    render(){
        return(
            <div className={css.background}>
                <div className={css.mask}/>
                {
                    this.router()
                }

            </div>
        )
    }
}

module.exports=Entry;

class LoginForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            user:"",
            password:""
        };
    }
    componentDidMount(){

    }
    submit(){
        let user = this.state.user;
        let password = this.state.password;
        $.ajax({
            type: 'POST',
            url:"http://127.0.0.1:3000/login",
            data:JSON.stringify({
                user:user,
                password:password
            }),
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            contentType:"application/json",
            success: (result) => {
                result = JSON.parse(result);
                if(result.code===200){
                    console.log(result.interest);
                    localStorage.interest = result.interest;
                    window.location.href="#/board";
                }
                else {
                    //todo
                    console.log(result);
                }
            }
        });
    }
    render(){
        return(
            <div className={css.container}>
                <div className={css.title}>登录 CUTCUT</div>
                <div>
                    <div>
                        <TextInput style={{width:"235px"}} placeholder="用户名"
                            onChange={(e)=>{
                                let value = e.target.value;
                                this.setState({user:value});
                            }}
                        />
                    </div>
                    <div>
                        <TextInput style={{width:"235px"}} placeholder="密码" type="password"
                                   onChange={(e)=>{
                                       let value = e.target.value;
                                       this.setState({password:value});
                                   }}
                        />
                    </div>
                </div>
                <table style={{width:'235px', marginTop:'10px'}}><tbody>
                    <tr>
                        <td style={{textAlign:'left'}} className={css.a} onClick={()=>{this.props.changeState("sign");}}>没有账号</td>
                        <td style={{textAlign:'right'}}  className={css.a}>忘记密码</td>
                    </tr>
                </tbody></table>
                <div>
                    <Button text="登录" style={{
                        fontSize: '19px',
                        fontWeight: '400px',
                        letterSpacing:'4px',
                        width:"235px",
                        margin:"30px 0"
                    }}
                            primary={true}
                            onClick={this.submit.bind(this)}
                    />
                </div>
            </div>
        )
    }
}

class SignForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            user:'',
            password:'',
            confirm:'',
            email:''
        };
    }
    componentDidMount(){

    }
    error(text){
        alert(text);
    }
    submit(){
        let user = this.state.user;
        let password = this.state.password;
        let confirm = this.state.confirm;
        let email = this.state.email;
        if(password===confirm){
            $.ajax({
                type: 'POST',
                url:"http://127.0.0.1:3000/sign",
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                data:JSON.stringify({
                    user:user,
                    password:password,
                    email:email
                }),
                contentType:"application/json",
                success: (result) => {
                    result = JSON.parse(result);
                    if(result.code===200){
                        this.props.changeState("interest");
                    }
                    else {
                        //todo
                        console.log(result);
                    }
                }
            });
        }
        else{
            this.error("密码不一致");
        }
    }
    render(){
        return(
            <div className={css.container}>
                <div className={css.title}>注册 CUTCUT</div>
                <div>
                    <div>
                        <TextInput style={{width:"235px"}} placeholder="用户名"
                                   onChange={(e)=>{
                                       let value = e.target.value;
                                       this.setState({user:value});
                                   }}
                                   onBlur={(e)=>{
                                       if(this.state.user.length < 6){
                                           this.error('用户名至少6位');
                                       }
                                   }}
                        />
                    </div>
                    <div>
                        <TextInput style={{width:"235px"}} placeholder="密码" type="password"
                                   onChange={(e)=>{
                                       let password = e.target.value;
                                       this.setState({password:password});
                                   }}
                                   onBlur={(e)=>{
                                       if(this.state.password.length < 6){
                                           this.error('密码至少6位');
                                       }
                                   }}
                        />
                    </div>
                    <div>
                        <TextInput style={{width:"235px"}} placeholder="确认密码" type="password"
                                   onChange={(e)=>{
                                       let confirm = e.target.value;
                                       this.setState({confirm:confirm});
                                   }}
                                   onBlur={(e)=>{
                                       if(this.state.password!==this.state.confirm){
                                           this.error('密码不一致');
                                       }
                                   }}
                        />
                    </div>
                    <div>
                        <TextInput style={{width:"235px"}} placeholder="邮箱"
                                   onChange={(e)=>{
                                       let email = e.target.value;
                                       this.setState({email:email});
                                   }}
                                   onBlur={(e)=>{
                                       let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
                                       if(!reg.test(this.state.email)){
                                           this.error('邮箱地址不正确');
                                       }
                                   }}
                        />
                    </div>
                </div>
                <table style={{width:'235px', marginTop:'10px'}}><tbody>
                <tr>
                    <td style={{textAlign:'right'}} className={css.a} onClick={()=>{this.props.changeState("login");}}>已有账号</td>
                </tr>
                </tbody></table>
                <div>
                    <Button text="注册" style={{
                        fontSize: '19px',
                        fontWeight: '400px',
                        letterSpacing:'4px',
                        width:"235px",
                        margin:"30px 0"
                    }}
                            primary={true}
                        onClick={this.submit.bind(this)}
                    />

                </div>
            </div>
        )
    }
}

class Interest extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            choice:[],
            activeState:[],
        };
    }
    componentDidMount(){
        $.get("http://127.0.0.1:3000/interestList", function(result){
            result = JSON.parse(result);
            let data = result.list;
            localStorage.interest = result.interest;
            this.setState({choice:data});
        }.bind(this));
    }
    handleActiveState(state){
        this.setState({activeState:state});
    }
    submit(){
        let activeState = this.state.activeState;
        let interest = [];
        for(let key in activeState){
            if(activeState[key]===true){
                interest.push(this.state.choice[key]);
            }
        }
        $.ajax({
            type: 'POST',
            url:"http://127.0.0.1:3000/interest",
            data:JSON.stringify({
                interest:interest
            }),
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            contentType:"application/json",
            success: (result) => {
                result = JSON.parse(result);
                if(result.code===200){
                    window.location.href="#/board";
                }
                else {
                    //todo
                    console.log(result);
                }
            }
        });
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
                            primary={true}
                            onClick={this.submit.bind(this)}
                    />
                </div>

            </div>
        )
    }
}
