import React from "react";
import { Editor, Raw } from 'slate';

import css from "./Editor.css"
import Nav from "../../Common/Component/Nav/Nav.jsx";

class EditorPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            id:null,
            create:false,
            state:initialState,
            wait:"",
            title:""
        };
    }
    componentDidMount(){
        let id = this.props.location.query.id;
        let create = this.props.location.query.create;
        if(create==='0'){
            $.get("http://127.0.0.1:3000/cut?id="+id, (result)=>{
                result = JSON.parse(result);
                let cut = result.cut;
                let state = Raw.deserialize(cut.state);
                let title = cut.title;
                this.setState({
                    state:state,
                    create:false,
                    id:id,
                    title:title});
            });
        }
        else{
            this.setState({create:true});
        }
    }
    cancel(){
        history.go(-1);
    }
    submit(){
        this.wait("提交中...");
        let data = Raw.serialize(this.state.state);
        if(this.state.create){
            $.ajax({
                type: 'POST',
                url:"http://127.0.0.1:3000/cutCreate",
                data:JSON.stringify({
                    data:data,
                    title:this.state.title
                }),
                contentType:"application/json",
                success: (result) => {
                    result = JSON.parse(result);
                    let id = result.body.cut._id;
                    console.log(result);
                    window.location.href="#/cutView?id="+id;
                }
            });
        }
        else{
            $.ajax({
                type: 'POST',
                url:"http://127.0.0.1:3000/cutEdit",
                data:JSON.stringify({
                    id:this.state.id,
                    data:data,
                    title:this.state.title
                }),
                contentType:"application/json",
                success: (result) => {
                    result = JSON.parse(result);
                    let id = result.body.cut._id;
                    console.log(result);
                    window.location.href="#/cutView?id="+id;
                }
            });
        }
    }
    wait(text){
        this.setState({wait:text});
    }

    hasMark(type) {
        const { state } = this.state;
        return state.marks.some(mark => mark.type === type)
    }

    hasBlock(type) {
        const { state } = this.state;
        return state.blocks.some(node => node.type === type)
    }

    onChange(state) {
        this.setState({ state:state })
    }
    onKeyDown(e, data, state) {
        if (!data.isMod) return;
        let mark;

        switch (data.key) {
            case 'b':
                mark = 'bold';
                break;
            case 'i':
                mark = 'italic';
                break;
            case 'u':
                mark = 'underlined';
                break;
            case '`':
                mark = 'code';
                break;
            default:
                return;
        }

        state = state
            .transform()
            .toggleMark(mark)
            .apply();

        e.preventDefault();
        return state;
    }

    onClickMark(e, type) {
        e.preventDefault();
        let { state } = this.state;
        state = state
            .transform()
            .toggleMark(type)
            .apply();

        this.setState({ state })
    }
    onClickBlock(e, type)  {
        e.preventDefault();
        let { state } = this.state;
        const transform = state.transform();
        const { document } = state;

        // Handle everything but list buttons.
        if (type !== 'bulleted-list' && type !== 'numbered-list') {
            const isActive = this.hasBlock(type);
            const isList = this.hasBlock('list-item');

            if (isList) {
                transform
                    .setBlock(isActive ? DEFAULT_NODE : type)
                    .unwrapBlock('bulleted-list')
                    .unwrapBlock('numbered-list')
            }

            else {
                transform
                    .setBlock(isActive ? DEFAULT_NODE : type)
            }
        }

        // Handle the extra wrapping required for list buttons.
        else {
            const isList = this.hasBlock('list-item');
            const isType = state.blocks.some((block) => {
                return !!document.getClosest(block.key, parent => parent.type === type)
            });

            if (isList && isType) {
                transform
                    .setBlock(DEFAULT_NODE)
                    .unwrapBlock('bulleted-list')
                    .unwrapBlock('numbered-list')
            } else if (isList) {
                transform
                    .unwrapBlock(type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list')
                    .wrapBlock(type)
            } else {
                transform
                    .setBlock('list-item')
                    .wrapBlock(type)
            }
        }

        state = transform.apply();
        this.setState({ state })
    }

    onClickImage(e) {
        console.log("in image");
        e.preventDefault();
        const src = window.prompt('Enter the URL of the image:');
        if (!src) return;
        let { state } = this.state;
        state = this.insertImage(state, src);
        this.onChange(state)
    }

    onDrop(e, data, state, editor) {
        switch (data.type) {
            case 'files': return this.onDropOrPasteFiles(e, data, state, editor);
            case 'node': return this.onDropNode(e, data, state);
        }
    }

    onDropNode(e, data, state)  {
        return state
            .transform()
            .deselect()
            .removeNodeByKey(data.node.key)
            .select(data.target)
            .insertBlock(data.node)
            .apply()
    }

    onDropOrPasteFiles(e, data, state, editor)  {
        for (const file of data.files) {
            const reader = new FileReader();
            const [ type ] = file.type.split('/');
            if (type !== 'image') continue;

            reader.addEventListener('load', () => {
                state = editor.getState();
                state = this.insertImage(state, reader.result);
                editor.onChange(state)
            });

            reader.readAsDataURL(file)
        }
    }

    onPaste(e, data, state, editor) {
        switch (data.type) {
            case 'files': return this.onDropOrPasteFiles(e, data, state, editor);
            case 'text': return this.onPasteText(e, data, state)
        }
    }

    onPasteText(e, data, state) {
        if (!isUrl(data.text)) return;
        if (!isImage(data.text)) return;
        return this.insertImage(state, data.text)
    }

    insertImage(state, src){
        return state
            .transform()
            .insertBlock({
                type: 'image',
                isVoid: true,
                data: { src:src, height:null }
            })
            .apply()
    }

    renderToolbar() {
        return (
            <div className={css["menu"]}>
                {this.renderMarkButton('bold', 'format_bold')}
                {this.renderMarkButton('italic', 'format_italic')}
                {this.renderMarkButton('underlined', 'format_underlined')}
                {this.renderMarkButton('code', 'code')}
                {this.renderInsertButton('image', 'image')}
                {this.renderBlockButton('heading-one', 'looks_one')}
                {this.renderBlockButton('heading-two', 'looks_two')}
                {this.renderBlockButton('block-quote', 'format_quote')}
                {this.renderBlockButton('numbered-list', 'format_list_numbered')}
                {this.renderBlockButton('bulleted-list', 'format_list_bulleted')}
            </div>
        )
    }

    renderInsertButton(type, icon) {
        const isActive = this.hasMark(type);
        const onMouseDown = e => this.onClickMark(e, type);

        return (
            <span className={css["button"]} onMouseDown={this.onClickImage.bind(this)} data-active={isActive}>
                <span className={css["material-icons"]}>{icon}</span>
            </span>
        )
    }

    renderMarkButton(type, icon) {
        const isActive = this.hasMark(type);
        const onMouseDown = e => this.onClickMark(e, type);

        return (
            <span className={css["button"]} onMouseDown={onMouseDown} data-active={isActive}>
                <span className={css["material-icons"]}>{icon}</span>
            </span>
        )
    }

    renderBlockButton(type, icon) {
        const isActive = this.hasBlock(type);
        const onMouseDown = e => this.onClickBlock(e, type);

        return (
            <span className={css["button"]} onMouseDown={onMouseDown} data-active={isActive}>
        <span className={css["material-icons"]}>{icon}</span>
      </span>
        )
    }

    renderEditor(){
        return (
            <div className={css["editor"]}>
                <Editor
                    spellCheck
                    placeholder={'Enter some rich text...'}
                    schema={schema}
                    state={this.state.state}
                    onChange={this.onChange.bind(this)}
                    onKeyDown={this.onKeyDown.bind(this)}
                    onPaste={this.onPaste.bind(this)}
                    onDrop={this.onDrop.bind(this)}
                />
            </div>
        )
    }

    render(){
        return(
            <div className={css.background}>
                <Nav/>
                <div className={css.content}>
                    <div className={css["title"]}>
                        <input placeholder="请输入标题" value={this.state.title} type="text"
                               onChange={(event)=>{
                                   this.setState({title: event.target.value});
                               }}
                               onClick={(event)=>{
                                   event.target.select();
                               }}

                        />
                    </div>
                    {this.renderToolbar()}
                    {this.renderEditor()}
                    <div className={css["menu-right"]}>
                        <span className={css["button"]} onClick={this.submit.bind(this)}>
                            <span className={css["material-icons"]}>check</span>
                        </span>
                        <span className={css["button"]} onClick={this.cancel.bind(this)}>
                            <span className={css["material-icons"]}>close</span>
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

