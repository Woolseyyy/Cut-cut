var React=require("react");
var ReactDOM=require("react-dom");
var routeObj=require("react-router");
var Router=routeObj.Router;
var hashHistory=routeObj.hashHistory;
import injectTapEventPlugin from 'react-tap-event-plugin';

var style=require('./Common/init.css');

injectTapEventPlugin();

class App extends React.Component{
    render(){
        return(
            <div>
                {this.props.children}
            </div>
        )
    }
}

var rootRoute={
    childRoutes:[{
        path:'/',
        component:App,
        indexRoute:require("./Page/Entry"),
        childRoutes:[
            require("./Page/Entry"),
            require("./Page/Article"),
            require("./Page/Board"),
            require("./Page/Editor"),
            require("./Page/CutView"),
            require("./Page/CutPush"),
            require("./Page/Profile")
        ]
    }]
};

class Root extends React.Component{
    render(){
        return(
            <Router
                history={hashHistory}
                routes={rootRoute}
            />
        )
    }
}

ReactDOM.render(
    <Root />,
    document.getElementById("app")
);
