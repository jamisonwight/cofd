import { useRef, useCallback, useEffect } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { html } from '@codemirror/lang-html';
import { dracula } from 'thememirror';

const useCodeMirror = (initialDoc, onDocChange) => {
    const codeMirrorRef = useRef(null);

    const createEditor = useCallback((parent) => {
        const state = EditorState.create({
            doc: initialDoc,
            extensions: [
                basicSetup,
                dracula,
                html(),
                EditorView.updateListener.of((update) => {
                    if (update.docChanged) {
                        const newDoc = update.state.doc.toString();
                        onDocChange(newDoc);
                    }
                })
            ]
        });

        return new EditorView({
            state,
            parent: parent,
        });
    }, [initialDoc, onDocChange]);

    useEffect(() => {
        if (!codeMirrorRef.current) return;
        const editorView = createEditor(codeMirrorRef.current);

        // Cleanup CodeMirror on unmount
        return () => {
            editorView.destroy();
        };
    }, [createEditor]);

    return codeMirrorRef;
};

export default useCodeMirror;