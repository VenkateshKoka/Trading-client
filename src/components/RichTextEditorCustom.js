import React, {useEffect, useRef, useState} from "react";
// It is important to import the Editor which accepts plugins.
import Editor from '@draft-js-plugins/editor';
import createEmojiPlugin from '@draft-js-plugins/emoji';

import './RichTextEditorDraft/RichTextEditorDraft.css';
import 'draft-js/dist/Draft.css';
import '@draft-js-plugins/emoji/lib/plugin.css';
import {EditorState, RichUtils, getDefaultKeyBinding, convertToRaw, convertFromRaw} from 'draft-js';


const RichTextEditorCustom = (props) => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const refContainer = useRef(null);

    let className = `RichEditor-editor ${props.readOnly ? "RichEditor-editor__readOnly" : ""}`;
    let contentState = editorState && editorState.getCurrentContent();

    // this useNativeArt option reduces the loading time when you click the emoji button.
    const emojiPlugin = createEmojiPlugin({
        useNativeArt: true
    });
    const {EmojiSuggestions, EmojiSelect} = emojiPlugin;

    useEffect(() => {
        const initialText = props.initialText && convertFromRaw(JSON.parse(props.initialText));
        setEditorState((initialText && EditorState.createWithContent(initialText)) || EditorState.createEmpty());
        // console.log("the editor state content is ---jaffa, checking for render", JSON.stringify(convertToRaw(editorState.getCurrentContent())))
        // console.log("the editor state prop content is ---jaffa, checking for render", props.initialText);
        // Creates an Instance. At this step, a configuration object can be passed in
        // as an argument.
        // If the user changes block type before entering any text, we can
        // either style the placeholder or hide it. Let's just hide it now.
        if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
                className += ' RichEditor-hidePlaceholder';
            }
        }

    }, [props.initialText]);


    const focus = () => refContainer.current.focus();
    const onChange = (editorState) => {
        setEditorState(editorState);
        props.stateChanger && props.stateChanger(JSON.stringify(convertToRaw(editorState.getCurrentContent())));
        // console.log("the editor state is ---jaffa", JSON.stringify(convertToRaw(editorState.getCurrentContent())));
    };

    const _handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            onChange(newState);
            return true;
        }
        return false;
    }

    const _mapKeyToEditorCommand = (e) => {
        if (e.keyCode === 9 /* TAB */) {
            const newEditorState = RichUtils.onTab(
                e,
                editorState,
                4, /* maxDepth */
            );
            if (newEditorState !== editorState) {
                onChange(newEditorState);
            }
            return;
        }
        return getDefaultKeyBinding(e);
    }

    function toggleBlockType(blockType) {
        console.log("the blocktype is ---jaffa", blockType);
        onChange(
            RichUtils.toggleBlockType(
                editorState,
                blockType
            )
        );
    }

    function _toggleInlineStyle(inlineStyle) {
        onChange(
            RichUtils.toggleInlineStyle(
                editorState,
                inlineStyle
            )
        );
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

    const StyleButton = (props) => {
        const onToggle = (e) => {
            e.preventDefault();
            props.onToggle(props.style);
        }
        let className = 'RichEditor-styleButton';
        if (props.active) {
            className += ' RichEditor-activeButton';
        }

        return (
            <span className={className} onMouseDown={() => onToggle}>
              {props.label}
        </span>
        );
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

    return (
        <div className={`RichEditor-root ${props.readOnly ? "RichEditor-root__readOnly" : ""}`}>
            {props.readOnly !== true && <BlockStyleControls
                editorState={editorState}
                onToggle={toggleBlockType}
            />}
            {props.readOnly !== true && <InlineStyleControls
                editorState={editorState}
                onToggle={_toggleInlineStyle}
            />}
            <div className={className} onClick={() => focus}>
                <Editor
                    blockStyleFn={getBlockStyle}
                    customStyleMap={styleMap}
                    editorState={editorState}
                    plugins={[emojiPlugin]}
                    handleKeyCommand={_handleKeyCommand}
                    keyBindingFn={_mapKeyToEditorCommand}
                    onChange={onChange}
                    placeholder="Write something cool here to post..."
                    ref={refContainer}
                    spellCheck={true}
                    readOnly={props.readOnly}
                />
                {props.readOnly !== true && <EmojiSuggestions/>}
                {props.readOnly !== true && <EmojiSelect/>}
            </div>
        </div>
    );
}

export default RichTextEditorCustom;