import { useRef, useEffect } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { html } from '@codemirror/lang-html';
import { dracula } from 'thememirror';

const useCodeMirror = (initialDoc, onDocChange) => {
    const codeMirrorRef = useRef(null);

    useEffect(() => {
        if (!codeMirrorRef.current) return;

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

        const view = new EditorView({
            state,
            parent: codeMirrorRef.current,
        });

        // Cleanup CodeMirror on unmount
        return () => {
            view.destroy();
        };
    }, [initialDoc, onDocChange]);

    return codeMirrorRef;
};

export default useCodeMirror;