import { useRef, useCallback, useEffect } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { html } from '@codemirror/lang-html';
import { dracula } from 'thememirror';
import { keymap } from '@codemirror/view';
import { indentWithTab } from '@codemirror/commands';
import { indentUnit } from '@codemirror/language';

const useCodeMirror = (initialDoc, onDocChange) => {
    const codeMirrorRef = useRef(null); // Ref to hold the editor container

    // Memoized function to create the CodeMirror editor instance
    const createEditor = useCallback((parentElement) => {
        const state = EditorState.create({
            doc: initialDoc,
            extensions: [
                basicSetup,      // Basic setup like line numbers, indentations, etc.
                dracula,         // Dracula theme for CodeMirror
                html(),
                keymap.of([indentWithTab]),
                indentUnit.of("    "),
                EditorView.updateListener.of((update) => {
                    if (update.docChanged) {
                        const updatedDoc = update.state.doc.toString(); // Get the updated document content
                        onDocChange(updatedDoc);  // Notify parent about document changes
                    }
                })
            ]
        });

        const view = new EditorView({
            state,
            parent: parentElement,
        });

        // Clean up the editor on unmount
        return () => {
            view.destroy(); // Properly destroy the editor instance to avoid memory leaks
        };
    }, []); // Dependencies are the initial document and change handler

    useEffect(() => {
        if (!codeMirrorRef.current) return; // Ensure there's a valid DOM element

        const editorView = createEditor(codeMirrorRef.current); // Create the editor instance

        // Cleanup function to destroy the editor on component unmount
        return () => {
            editorView.destroy();
        };
    }, []); // The effect runs whenever the `createEditor` function changes

    return codeMirrorRef; // Return the ref to be attached to the editor container element
};

export default useCodeMirror;