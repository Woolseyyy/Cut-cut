import React from "react";

import css from "./Board.css"
import Button from "../../BaseComponent/Button/Button.jsx";
import TextInput from "../../BaseComponent/TextInput/TextInput.jsx";
import List from "../../BaseComponent/List/List.jsx";
import Nav from "../../Common/Component/Nav/Nav.jsx";
import DefaultImg from "./static/default-img.jpg";

import CutIcon from "material-design-icons/content/svg/production/ic_content_cut_48px.svg";

class Board extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            area:{
                title:'推荐',
                description:'你的心思我来猜'
            },
            data:[
                {
                    _id:0,
                    title:"吴昊潜满绩了1",
                    category:"军事",
                    source:"浙大学报",
                    sourceAddress:"'http://cms-bucket.nosdn.127.net",
                    date:"2017/6/28",
                    abstract:"吴昊潜满级了好厉害啊我要给他生猴子！生猴子！吴昊潜满级了好厉害啊我要给他生猴子！生猴子！吴昊潜满级了好厉害啊我要给他生猴子！生猴子！吴昊潜满级了好厉害啊我要给他生猴子！生猴子！吴昊潜满级了好厉害啊我要给他生猴子！生猴子！",
                    author:'吴朝晖',
                    img:'http://cms-bucket.nosdn.127.net/catchpic/1/11/11099d5e7f8c6b46f890c29d72924e1f.jpg?imageView&thumbnail=550x0'
                },
                {
                    _id:1,
                    title:"吴昊潜满绩了2",
                    category:"军事",
                    source:"浙大学报",
                    sourceAddress:"'http://cms-bucket.nosdn.127.net",
                    date:"2017/6/28",
                    abstract:"吴昊潜满级了好厉害啊我要给他生猴子！生猴子！吴昊潜满级了好厉害啊我要给他生猴子！生猴子！吴昊潜满级了好厉害啊我要给他生猴子！生猴子！吴昊潜满级了好厉害啊我要给他生猴子！生猴子！吴昊潜满级了好厉害啊我要给他生猴子！生猴子！",
                    author:'吴朝晖',
                    img:'http://cms-bucket.nosdn.127.net/catchpic/1/11/11099d5e7f8c6b46f890c29d72924e1f.jpg?imageView&thumbnail=550x0'
                },{
                    _id:2,
                    title:"吴昊潜满绩了3",
                    category:"军事",
                    source:"浙大学报",
                    sourceAddress:"'http://cms-bucket.nosdn.127.net",
                    date:"2017/6/28",
                    abstract:"吴昊潜满级了好厉害啊我要给他生猴子！生猴子！吴昊潜满级了好厉害啊我要给他生猴子！生猴子！",
                    author:'吴朝晖',
                    img:'http://cms-bucket.nosdn.127.net/catchpic/1/11/11099d5e7f8c6b46f890c29d72924e1f.jpg?imageView&thumbnail=550x0'
                },{
                    _id:2,
                    title:"吴昊潜满绩了4",
                    category:"军事",
                    source:"浙大学报",
                    sourceAddress:"'http://cms-bucket.nosdn.127.net",
                    date:"2017/6/28",
                    abstract:"吴昊潜满级了好厉害啊我要给他生猴子！生猴子！吴昊潜满级了好厉害啊我要给他生猴子！生猴子！",
                    author:'吴朝晖',
                    img:'http://cms-bucket.nosdn.127.net/catchpic/1/11/11099d5e7f8c6b46f890c29d72924e1f.jpg?imageView&thumbnail=550x0'
                },{
                    _id:2,
                    title:"吴昊潜满绩了5",
                    category:"军事",
                    source:"浙大学报",
                    sourceAddress:"'http://cms-bucket.nosdn.127.net",
                    date:"2017/6/28",
                    abstract:"吴昊潜满级了好厉害啊我要给他生猴子！生猴子！吴昊潜满级了好厉害啊我要给他生猴子！生猴子！",
                    author:'吴朝晖',
                    img:'http://cms-bucket.nosdn.127.net/catchpic/1/11/11099d5e7f8c6b46f890c29d72924e1f.jpg?imageView&thumbnail=550x0'
                },{
                    _id:2,
                    title:"吴昊潜满绩了6",
                    category:"军事",
                    source:"浙大学报",
                    sourceAddress:"'http://cms-bucket.nosdn.127.net",
                    date:"2017/6/28",
                    abstract:"吴昊潜满级了好厉害啊我要给他生猴子！生猴子！吴昊潜满级了好厉害啊我要给他生猴子！生猴子！",
                    author:'吴朝晖',
                    img:'http://cms-bucket.nosdn.127.net/catchpic/1/11/11099d5e7f8c6b46f890c29d72924e1f.jpg?imageView&thumbnail=550x0'
                },{
                    _id:2,
                    title:"吴昊潜满绩了7",
                    category:"军事",
                    source:"浙大学报",
                    sourceAddress:"'http://cms-bucket.nosdn.127.net",
                    date:"2017/6/28",
                    abstract:"吴昊潜满级了好厉害啊我要给他生猴子！生猴子！吴昊潜满级了好厉害啊我要给他生猴子！生猴子！",
                    author:'吴朝晖',
                    img:'http://cms-bucket.nosdn.127.net/catchpic/1/11/11099d5e7f8c6b46f890c29d72924e1f.jpg?imageView&thumbnail=550x0'
                },{
                    _id:2,
                    title:"吴昊潜满绩了8",
                    category:"军事",
                    source:"浙大学报",
                    sourceAddress:"'http://cms-bucket.nosdn.127.net",
                    date:"2017/6/28",
                    abstract:"吴昊潜满级了好厉害啊我要给他生猴子！生猴子！吴昊潜满级了好厉害啊我要给他生猴子！生猴子！",
                    author:'吴朝晖',
                    img:'http://cms-bucket.nosdn.127.net/catchpic/1/11/11099d5e7f8c6b46f890c29d72924e1f.jpg?imageView&thumbnail=550x0'
                },{
                    _id:2,
                    title:"吴昊潜满绩了9",
                    category:"军事",
                    source:"浙大学报",
                    sourceAddress:"'http://cms-bucket.nosdn.127.net",
                    date:"2017/6/28",
                    abstract:"吴昊潜满级了好厉害啊我要给他生猴子！生猴子！吴昊潜满级了好厉害啊我要给他生猴子！生猴子！",
                    author:'吴朝晖',
                    img:'http://cms-bucket.nosdn.127.net/catchpic/1/11/11099d5e7f8c6b46f890c29d72924e1f.jpg?imageView&thumbnail=550x0'
                },{
                    _id:2,
                    title:"吴昊潜满绩了10",
                    category:"军事",
                    source:"浙大学报",
                    sourceAddress:"'http://cms-bucket.nosdn.127.net",
                    date:"2017/6/28",
                    abstract:"吴昊潜满级了好厉害啊我要给他生猴子！生猴子！吴昊潜满级了好厉害啊我要给他生猴子！生猴子！",
                    author:'吴朝晖',
                    img:'http://cms-bucket.nosdn.127.net/catchpic/1/11/11099d5e7f8c6b46f890c29d72924e1f.jpg?imageView&thumbnail=550x0'
                }
            ]

        };
    }
    componentDidMount(){

    }
    render(){
        return(
            <div className={css.background}>
                <Nav/>
                <div className={css.content}>
                    <div className={css.area}>
                        <div  className={css.areaTitle}>{this.state.area.title}</div>
                        <div  className={css.areaDescription}>{this.state.area.description}</div>
                    </div>
                    <Paper data={this.state.data}/>
                </div>
            </div>
        )
    }
}

module.exports=Board;

class Paper extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            mediaType:3
        };
    }
    componentDidMount(){
        this.getWindowWidth();
        window.onresize=this.getWindowWidth.bind(this);
    }
    getWindowWidth(){
        let winWidth = 0;
        if (window.innerWidth)
            winWidth = window.innerWidth;
        else if ((document.body) && (document.body.clientWidth))
            winWidth = document.body.clientWidth;

        if(winWidth>=1600){
            this.setState({mediaType:4})
        }
        else if(winWidth>=992){
            this.setState({mediaType:3})
        }
        else if(winWidth>=768){
            this.setState({mediaType:2})
        }
        else if(winWidth<768){
            this.setState({mediaType:1})
        }
    }
    render(){
        switch(this.state.mediaType){
            case 4: {
                let number = 0;
                let data = [];
                let cleanUp = ()=>{
                    if(data.length===1){
                        return <NewsRow type={1} data={data}/>
                    }
                    else if(data.length===2){
                        return (
                            <div>
                                <NewsRow type={1} data={[data[0]]}/>
                                <NewsRow type={1} data={[data[1]]}/>
                            </div>
                        )
                    }
                    else if(data.length===3){
                        return <NewsRow type={4} data={data}/>
                    }
                };
                return (
                    <div>
                        {
                            this.props.data.map((item, key) => {
                                if (number === 0) {
                                    data = [];
                                    let rand = Math.random();
                                    if (rand < 0.2) {
                                        number = 1;
                                    }
                                    else if (rand < 0.7) {
                                        number = 3;
                                    }
                                    else {
                                        number = 4;
                                    }
                                }

                                if (number === 1) {
                                    data = [item];
                                    number = 0;
                                    return (<NewsRow type={1} data={data}/>)
                                }
                                else if (number === 3) {
                                    if (data.length < number) {
                                        data.push(item);
                                    }
                                    if (data.length === number) {
                                        number = 0;
                                        return (<NewsRow type={4} data={data}/>)
                                    }
                                    else {
                                        return (key===this.props.data.length-1)?cleanUp():null;
                                    }
                                }
                                else if (number === 4) {
                                    if (data.length < number) {
                                        data.push(item);
                                    }
                                    if (data.length === number) {
                                        number = 0;
                                        return (<NewsRow type={5} data={data}/>)
                                    }
                                    else {
                                        return (key===this.props.data.length-1)?cleanUp():null;
                                    }
                                }
                                else {
                                    return null;
                                }

                            })
                        }
                    </div>
                )
            }
            case 3: {
                let number = 0;
                let data = [];
                let cleanUp = ()=>{
                    if(data.length===1){
                        return <NewsRow type={1} data={data}/>
                    }
                    else if(data.length===2){
                        return <NewsRow type={2} data={data}/>
                    }
                };
                return (
                    <div>
                        {
                            this.props.data.map((item, key) => {
                                if (number === 0) {
                                    data = [];
                                    let rand = Math.random();
                                    if (rand < 0.2) {
                                        number = 1;
                                    }
                                    else if (rand < 0.6) {
                                        number = 2;
                                    }
                                    else {
                                        number = 3;
                                    }
                                }

                                if (number === 1) {
                                    data = [item];
                                    number = 0;
                                    return (<NewsRow type={1} data={data}/>)
                                }
                                else if (number === 2) {
                                    if (data.length < number) {
                                        data.push(item);
                                    }
                                    if (data.length === number) {
                                        number = 0;
                                        return (<NewsRow type={2} data={data}/>)
                                    }
                                    else {
                                        return (key===this.props.data.length-1)?cleanUp():null;
                                    }
                                }
                                else if (number === 3) {
                                    if (data.length < number) {
                                        data.push(item);
                                    }
                                    if (data.length === number) {
                                        number = 0;
                                        return (<NewsRow type={3} data={data}/>)
                                    }
                                    else {
                                        return (key===this.props.data.length-1)?cleanUp():null;
                                    }
                                }
                                else {
                                    return null;
                                }

                            })
                        }
                    </div>
                )
            }
            case 2: {
                let number = 0;
                let data = [];
                let cleanUp = ()=>{
                    if(data.length===1){
                        return <NewsRow type={1} data={data}/>
                    }
                };
                return (
                    <div>
                        {
                            this.props.data.map((item, key) => {
                                if (number === 0) {
                                    data = [];
                                    let rand = Math.random();
                                    if (rand < 0.5) {
                                        number = 1;
                                    }
                                    else {
                                        number = 2;
                                    }
                                }

                                if (number === 1) {
                                    data = [item];
                                    number = 0;
                                    return (<NewsRow type={1} data={data}/>)
                                }
                                else if (number === 2) {
                                    if (data.length < number) {
                                        data.push(item);
                                    }
                                    if (data.length === number) {
                                        number = 0;
                                        return (<NewsRow type={6} data={data}/>)
                                    }
                                    else {
                                        return (key===this.props.data.length-1)?cleanUp():null;
                                    }
                                }
                                else {
                                    return null;
                                }

                            })
                        }
                    </div>
                )
            }
            case 1: {
                return (
                    <div>
                        {
                            this.props.data.map((item, key) => {
                                return (<NewsRow type={7} data={[item]}/>)
                            })
                        }
                    </div>
                )
            }
        }
    }
}

class NewsRow extends React.Component{
    /*
     props ------->
     num:Number
     data:[{
     title:"text",
     category:"text",
     source:"text",
     date:Date,
     abstract:"text",
     img:'url'
     }]
     */
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount(){

    }
    render(){
        let newsProducer = ()=>{
            switch(this.props.type) {
                case 1:
                    return (
                        <table width="100%">
                            <tbody>
                            <tr>
                                <td><NewsLarge data={this.props.data[0]}/></td>
                            </tr>
                            </tbody>
                        </table>
                    );
                case 2:
                    return (
                        <table width="100%">
                            <tbody>
                            <tr>
                                <td width="66.67%" height="100%"><NewsMiddle data={this.props.data[0]}/></td>
                                <td width="33.3%" height="100%"><NewsSmall data={this.props.data[1]}/></td>
                            </tr>
                            </tbody>
                        </table>
                    );
                case  3:
                    return (
                        <table width="100%">
                            <tbody>
                            <tr>
                                <td width="33.33%" height="100%"><NewsSmall data={this.props.data[0]}/></td>
                                <td width="33.33%" height="100%"><NewsSmall data={this.props.data[1]}/></td>
                                <td width="33.33%" height="100%"><NewsSmall data={this.props.data[2]}/></td>
                            </tr>
                            </tbody>
                        </table>
                    );
                case 4:
                    return (
                        <table width="100%">
                            <tbody>
                            <tr>
                                <td width="50%" height="100%"><NewsMiddle data={this.props.data[0]}/></td>
                                <td width="25%" height="100%"><NewsSmall data={this.props.data[1]}/></td>
                                <td width="25%" height="100%"><NewsSmall data={this.props.data[2]}/></td>
                            </tr>
                            </tbody>
                        </table>
                    );
                case 5:
                    return (
                        <table width="100%">
                            <tbody>
                            <tr>
                                <td width="25%" height="100%"><NewsSmall data={this.props.data[0]}/></td>
                                <td width="25%" height="100%"><NewsSmall data={this.props.data[1]}/></td>
                                <td width="25%" height="100%"><NewsSmall data={this.props.data[2]}/></td>
                                <td width="25%" height="100%"><NewsSmall data={this.props.data[3]}/></td>
                            </tr>
                            </tbody>
                        </table>
                    );
                case 6:
                    return (
                        <table width="100%">
                            <tbody>
                            <tr>
                                <td width="50%" height="100%"><NewsSmall data={this.props.data[0]}/></td>
                                <td width="50%" height="100%"><NewsSmall data={this.props.data[1]}/></td>
                            </tr>
                            </tbody>
                        </table>
                    );
                case 7:
                    return (
                        <table width="100%">
                            <tbody>
                            <tr>
                                <td><NewsMobile data={this.props.data[0]}/></td>
                            </tr>
                            </tbody>
                        </table>
                    );

                default:
                    return <div/>
            }
        };
        return(
            <div className={css.newsRow}>
                {
                    newsProducer()
                }
            </div>
        )
    }
}

class NewsSmall extends React.Component{
    /*
    props ------->
    data:{
         _id:
         title:"text",
         category:"text",
         source:"text",
         date:Date,
         abstract:"text",
         img:'url'
     }
     */
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount(){

    }
    render(){
        let img = (this.props.data.img)? this.props.data.img:DefaultImg;
        let imgBack = {
            backgroundImage: 'url('+img+')'
        };

        return(
            <div className={css.news}>
                <div className={css.newsSource}
                    onClick={()=>{window.open(this.props.sourceAddress)}}
                >出自　{this.props.data.source}</div>
                <div className={css.newsImg} style={imgBack} alt="news image"
                     onClick={()=>{window.location.href="#/article?id="+this.props.data._id}}
                />
                <div className={css.newsCategory}
                     onClick={()=>{window.location.href="#/board?id="+this.props.data.category}}
                >{this.props.data.category}</div>
                <div className={css.newsArticle} onClick={()=>{window.location.href="#/article?id="+this.props.data._id}}>
                    <div className={css.newsTitle}>{this.props.data.title}</div>
                    <div className={css.newsAuthor}>{this.props.data.author}</div>
                    <div className={css.newsAbstract}>{this.props.data.abstract}</div>
                </div>
            </div>
        )
    }
}

class NewsMiddle extends React.Component{
    /*
     props ------->
     data:{
     _id:
     title:"text",
     category:"text",
     source:"text",
     date:Date,
     abstract:"text",
     img:'url'
     }
     */
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount(){

    }
    render(){
        let img = (this.props.data.img)? this.props.data.img:DefaultImg;
        let imgBack = {
            backgroundImage: 'url('+img+')'
        };

        return(
            <div className={css.news}>
                <div className={css.newsSource}
                     onClick={()=>{window.open(this.props.sourceAddress)}}
                >出自　{this.props.data.source}</div>
                <div className={css.newsImgMiddle} style={imgBack} alt="news image"
                     onClick={()=>{window.location.href="#/article?id="+this.props.data._id}}
                />
                <div className={css.newsCategory}
                     onClick={()=>{window.location.href="#/board?id="+this.props.data.category}}
                >{this.props.data.category}</div>
                <div className={css.newsArticle} onClick={()=>{window.location.href="#/article?id="+this.props.data._id}}>
                    <div className={css.newsTitle}>{this.props.data.title}</div>
                </div>
            </div>
        )
    }
}

class NewsLarge extends React.Component{
    /*
     props ------->
     data:{
     _id:
     title:"text",
     category:"text",
     source:"text",
     date:Date,
     abstract:"text",
     img:'url'
     }
     */
    constructor(props) {
        super(props);
        this.state = {
            hover:false
        };
    }
    componentDidMount(){

    }
    render(){
        let img = (this.props.data.img)? this.props.data.img:DefaultImg;
        let imgBack = {
            backgroundImage: 'url('+img+')'
        };

        return(
            <div className={css.news}>
                <div className={css.newsSource}
                     onClick={()=>{window.open(this.props.sourceAddress)}}
                >出自　{this.props.data.source}</div>
                <div className={css.newsLarge}
                     onMouseOver={()=>{this.setState({hover:true})}}
                     onMouseOut={()=>{this.setState({hover:false})}}
                     onClick={()=>{window.location.href="#/article?id="+this.props.data._id}}
                >
                    <div className={(this.state.hover)?css.newsImgLargeHover:css.newsImgLarge} style={imgBack}/>
                    <div className={css.newsArticleLarge}>
                        <div className={css.newsCategory + " " + css.newsTextFront}
                             onClick={()=>{window.location.href="#/board?id="+this.props.data.category}}
                        >{this.props.data.category}</div>
                        <div className={css.newsTitle + " " + css.newsTextFront}>{this.props.data.title}</div>
                        <div className={css.newsAuthor + " " + css.newsTextFront}>{this.props.data.author}</div>
                        <div className={css.newsAbstract + " " + css.newsTextFront}>{this.props.data.abstract}</div>
                    </div>
                </div>
            </div>
        )
    }
}
class NewsMobile extends React.Component{
    /*
     props ------->
     data:{
     _id:
     title:"text",
     category:"text",
     source:"text",
     date:Date,
     abstract:"text",
     img:'url'
     }
     */
    constructor(props) {
        super(props);
        this.state = {
            hover:false
        };
    }
    componentDidMount(){

    }
    render(){
        let img = (this.props.data.img)? this.props.data.img:DefaultImg;
        let imgBack = {
            backgroundImage: 'url('+img+')'
        };

        return(
            <div className={css.news}>
                <div className={css.newsSource}
                     onClick={()=>{window.open(this.props.sourceAddress)}}
                >出自　{this.props.data.source}</div>
                <div className={css.newsLargeMobile}
                     onMouseOver={()=>{this.setState({hover:true})}}
                     onMouseOut={()=>{this.setState({hover:false})}}
                     onClick={()=>{window.location.href="#/article?id="+this.props.data._id}}
                >
                    <div className={(this.state.hover)?css.newsImgLargeHover:css.newsImgLarge} style={imgBack}/>
                    <div className={css.newsArticleLargeMobile}>
                        <div className={css.newsCategory + " " + css.newsTextFront + " " + css.newsCategoryMobile}
                             onClick={()=>{window.location.href="#/board?id="+this.props.data.category}}
                        >{this.props.data.category}</div>
                        <div className={css.newsTitleMobile}>{this.props.data.title}</div>
                    </div>
                </div>
            </div>
        )
    }
}
