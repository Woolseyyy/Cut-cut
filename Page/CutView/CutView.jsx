import React from "react";
import { Editor, Raw } from 'slate';

import css from "./CutView.css"
import Nav from "../../Common/Component/Nav/Nav.jsx";

class EditorPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            id:null,
            state:initialState,
            wait:"",
            title:""
        };
    }
    componentDidMount(){
        let id = this.props.location.query.id;

        $.get("http://127.0.0.1:3000/cut?id="+id, (result)=>{
            let cut = JSON.parse(result).cut;
            let state = Raw.deserialize(cut.state);
            let title = cut.title;
            this.setState({state:state,id:id,title:title});
        });


    }

    renderEditor(){
        return (
            <div className={css["editor"]}>
                <Editor
                    spellCheck
                    schema={schema}
                    state={this.state.state}
                />
            </div>
        )
    }
    edit(){
        window.location.href="#/editor?create=0&id="+this.state.id;
    }
    render(){
        return(
            <div className={css.background}>
                <Nav/>
                <div className={css.content}>
                    <div className={css["title"]}>
                        <input value={this.state.title} type="text" readOnly={true}/>
                    </div>
                    {this.renderEditor()}
                    <div className={css["menu-right"]}>
                        <span className={css["button"]} onClick={this.edit.bind(this)}>
                            <span className={css["material-icons"]}>edit</span>
                        </span>
                    </div>
                </div>

            </div>
        )
    }
}

module.exports=EditorPage;

const initialState = Raw.deserialize({
    nodes: [
        {
            kind: 'block',
            type: 'paragraph',
            nodes: [
                {
                    kind: 'text',
                    text: 'A line of text in a paragraph.'
                }
            ]
        }
    ]
}, { terse: true });

const DEFAULT_NODE = 'paragraph';

const schema = {
    nodes: {
        'block-quote': props => <blockquote {...props.attributes}>{props.children}</blockquote>,
        'bulleted-list': props => <ul {...props.attributes}>{props.children}</ul>,
        'heading-one': props => <h1 {...props.attributes}>{props.children}</h1>,
        'heading-two': props => <h2 {...props.attributes}>{props.children}</h2>,
        'list-item': props => <li {...props.attributes}>{props.children}</li>,
        'numbered-list': props => <ol {...props.attributes}>{props.children}</ol>,
        'image': (props) => {
            const { node, state } = props;
            const active = state.isFocused && state.selection.hasEdgeIn(node);
            const src = node.data.get('src');
            const className = active ? css['active'] : null;
            return (
                <img src={src} className={className} {...props.attributes} />

            )
        },
    },
    marks: {
        bold: {
            fontWeight: 'bold'
        },
        code: {
            fontFamily: 'monospace',
            backgroundColor: '#eee',
            padding: '3px',
            borderRadius: '4px'
        },
        italic: {
            fontStyle: 'italic'
        },
        underlined: {
            textDecoration: 'underline'
        }
    },
    rules: [
        // Rule to insert a paragraph block if the document is empty.
        {
            match: (node) => {
                return node.kind === 'document'
            },
            validate: (document) => {
                return document.nodes.size ? null : true
            },
            normalize: (transform, document) => {
                const block = Block.create(defaultBlock);
                transform.insertNodeByKey(document.key, 0, block)
            }
        },
        // Rule to insert a paragraph below a void node (the image) if that node is
        // the last one in the document.
        {
            match: (node) => {
                return node.kind === 'document'
            },
            validate: (document) => {
                const lastNode = document.nodes.last();
                return lastNode && lastNode.isVoid ? true : null
            },
            normalize: (transform, document) => {
                const block = Block.create(defaultBlock);
                transform.insertNodeByKey(document.key, document.nodes.size, block)
            }
        }
    ]
};

