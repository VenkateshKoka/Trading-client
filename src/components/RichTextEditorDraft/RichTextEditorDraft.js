import React from "react";
// It is important to import the Editor which accepts plugins.
import Editor from '@draft-js-plugins/editor';
import createEmojiPlugin from '@draft-js-plugins/emoji';

import './RichTextEditorDraft.css';
import 'draft-js/dist/Draft.css';
import '@draft-js-plugins/emoji/lib/plugin.css';
import {EditorState, RichUtils, getDefaultKeyBinding, convertToRaw, convertFromRaw} from 'draft-js';


class RichTextEditorDraft extends React.Component {
    constructor(props) {
        super(props);
        const initialText = this.props.initialText && convertFromRaw(JSON.parse(this.props.initialText));
        const editorState = initialText && EditorState.createWithContent(initialText);
        // const editorState = EditorState.createWithContent(initialText);
        this.state = {editorState: editorState || EditorState.createEmpty()};

        const stateChanger = this.props.stateChanger;
        // this useNativeArt option reduces the loading time when you click the emoji button.
        this.emojiPlugin = createEmojiPlugin({
            useNativeArt: true
        });


        this.focus = () => this.refs.editor.focus();
        this.onChange = (editorState) => {
            this.setState({editorState});
            stateChanger && stateChanger(JSON.stringify(convertToRaw(editorState.getCurrentContent())));
            // console.log("the editor state is ---jaffa", JSON.stringify(convertToRaw(editorState.getCurrentContent())));
        };

        this.handleKeyCommand = this._handleKeyCommand.bind(this);
        this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
        this.toggleBlockType = this._toggleBlockType.bind(this);
        this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
    }

    _handleKeyCommand(command, editorState) {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return true;
        }
        return false;
    }

    _mapKeyToEditorCommand(e) {
        if (e.keyCode === 9 /* TAB */) {
            const newEditorState = RichUtils.onTab(
                e,
                this.state.editorState,
                4, /* maxDepth */
            );
            if (newEditorState !== this.state.editorState) {
                this.onChange(newEditorState);
            }
            return;
        }
        return getDefaultKeyBinding(e);
    }

    _toggleBlockType(blockType) {
        this.onChange(
            RichUtils.toggleBlockType(
                this.state.editorState,
                blockType
            )
        );
    }

    _toggleInlineStyle(inlineStyle) {
        this.onChange(
            RichUtils.toggleInlineStyle(
                this.state.editorState,
                inlineStyle
            )
        );
    }

    render() {
        const {editorState} = this.state;
        // Creates an Instance. At this step, a configuration object can be passed in
        // as an argument.
        const {EmojiSuggestions, EmojiSelect} = this.emojiPlugin;
        // If the user changes block type before entering any text, we can
        // either style the placeholder or hide it. Let's just hide it now.
        let className = `RichEditor-editor ${this.props.readOnly ? "RichEditor-editor__readOnly" : ""}`;
        var contentState = editorState.getCurrentContent();
        if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
                className += ' RichEditor-hidePlaceholder';
            }
        }

        return (
            <div className={`RichEditor-root ${this.props.readOnly ? "RichEditor-root__readOnly" : ""}`}>
                {this.props.readOnly !== true && <BlockStyleControls
                    editorState={editorState}
                    onToggle={this.toggleBlockType}
                />}
                {this.props.readOnly !== true && <InlineStyleControls
                    editorState={editorState}
                    onToggle={this.toggleInlineStyle}
                />}
                <div className={className} onClick={this.focus}>
                    <Editor
                        blockStyleFn={getBlockStyle}
                        customStyleMap={styleMap}
                        editorState={editorState}
                        plugins={[this.emojiPlugin]}
                        handleKeyCommand={this.handleKeyCommand}
                        keyBindingFn={this.mapKeyToEditorCommand}
                        onChange={this.onChange}
                        placeholder="Write something cool here to post..."
                        ref="editor"
                        spellCheck={true}
                        readOnly={this.props.readOnly}
                    />
                    {this.props.readOnly !== true && <EmojiSuggestions/>}
                    {this.props.readOnly !== true && <EmojiSelect/>}
                </div>
            </div>
        );
    }
}


// Custom overrides for "code" style.
const styleMap = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2,
    },
};

function getBlockStyle(block) {
    switch (block.getType()) {
        case 'blockquote':
            return 'RichEditor-blockquote';
        default:
            return null;
    }
}

class StyleButton extends React.Component {
    constructor() {
        super();
        this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
        };
    }

    render() {
        let className = 'RichEditor-styleButton';
        if (this.props.active) {
            className += ' RichEditor-activeButton';
        }

        return (
            <span className={className} onMouseDown={this.onToggle}>
              {this.props.label}
            </span>
        );
    }
}

const BLOCK_TYPES = [
    {label: 'H1', style: 'header-one'},
    {label: 'H2', style: 'header-two'},
    {label: 'H3', style: 'header-three'},
    {label: 'H4', style: 'header-four'},
    {label: 'H5', style: 'header-five'},
    {label: 'H6', style: 'header-six'},
    {label: 'Blockquote', style: 'blockquote'},
    {label: 'UL', style: 'unordered-list-item'},
    {label: 'OL', style: 'ordered-list-item'},
    {label: 'Code Block', style: 'code-block'},
];

const BlockStyleControls = (props) => {
    const {editorState} = props;
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

    return (
        <div className="RichEditor-controls">
            {BLOCK_TYPES.map((type) =>
                <StyleButton
                    key={type.label}
                    active={type.style === blockType}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
    );
};


var INLINE_STYLES = [
    {label: 'Bold', style: 'BOLD'},
    {label: 'Italic', style: 'ITALIC'},
    {label: 'Underline', style: 'UNDERLINE'},
    {label: 'Monospace', style: 'CODE'},
];

const InlineStyleControls = (props) => {
    const currentStyle = props.editorState.getCurrentInlineStyle();

    return (
        <div className="RichEditor-controls">
            {INLINE_STYLES.map((type) =>
                <StyleButton
                    key={type.label}
                    active={currentStyle.has(type.style)}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
    );
};

export default RichTextEditorDraft;