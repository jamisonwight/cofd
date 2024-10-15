import { useRef, useCallback, useEffect } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { html } from '@codemirror/lang-html';
import { dracula } from 'thememirror';

const useCodeMirror = (initialDoc, onDocChange) => {
    const codeMirrorRef = useRef(null);
    const editorViewRef = useRef(null); // Keep a reference to the EditorView instance

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

        // Check if the editor already exists; if not, create it
        if (!editorViewRef.current) {
            editorViewRef.current = createEditor(codeMirrorRef.current);
        }

        return () => {
            if (editorViewRef.current) {
                editorViewRef.current.destroy(); // Clean up editor on unmount
            }
        };
    }, [createEditor]);

    // Update the editor's content when initialDoc changes without reinitializing the editor
    useEffect(() => {
        const editorView = editorViewRef.current;
        if (editorView) {
            const currentDoc = editorView.state.doc.toString();
            if (currentDoc !== initialDoc) {
                editorView.dispatch({
                    changes: { from: 0, to: currentDoc.length, insert: initialDoc }
                });
            }
        }
    }, [initialDoc]);

    return codeMirrorRef;
};

export default useCodeMirror;