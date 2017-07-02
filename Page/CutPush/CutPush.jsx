import React from "react";
import Button from "../../BaseComponent/Button/Button.jsx";
import TextArea from "../../BaseComponent/TextArea/TextArea.jsx";

import css from "./CutPush.css"
import Nav from "../../Common/Component/Nav/Nav.jsx";
import {Cropper} from 'react-image-cropper'

class CutPush extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            comment:"",
            src:this.props.location.query.src,
            id:this.props.location.query.id,
            cutList:[]
        };
    }
    componentDidMount(){

    }
    submit(){

        let comment = this.state.comment;
        let id = this.state.id;
        let cutList = this.state.cutList;

        let dataURI = this.refs.cropper.crop();
        let binary = atob(dataURI.split(',')[1]);
        let array = [];
        for(let i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
        }
        let blob = new Blob(new Uint8Array(array), {type:'image/png'});

        let formData = new FormData();
        formData.append("image",blob);
        formData.append("id",id);
        formData.append("cutList", cutList);
        formData.append("comment", comment);
        console.log(formData);
        $.ajax({
            type: 'POST',
            url:"http://127.0.0.1:3000/cutPush",
            data:formData,
            cors: true,
            contentType:'multipart/form-data',
            success: (result) => {
                result = JSON.parse(result);
                //todo
                console.log(result);
            }
        });
    }

    render(){
        return(
            <div className={css.background}>
                <Nav/>
                <div className={css.content}>
                    <Cropper
                        src={this.state.src}
                        ref="cropper"
                        width={"100%"}
                        fixedRatio={false}
                        allowNewSelection={true}
                    />
                </div>
                <div className={css.commentDiv}>
                    <TextArea ref="comment" onChange={(e)=>{
                        this.setState({comment:e.target.value})
                    }}/>
                    <Button className={css.button} primary={true} text="Submit" click={this.submit.bind(this)}/>
                </div>

            </div>
        )
    }
}

module.exports=CutPush;


