import React from 'react';
import './style.css';

// TODO call a function to upload the file inside  handleDrop 
// Refactor this component code to look more like FileUpload
// Maybe I should Turn the 'Add a New Idea' jumbotron into the Drag and Drop Zone
const DragAndDrop = props => {
    const { data, dispatch } = props;

    const handleDragEnter = e => {
        e.preventDefault();
        e.stopPropagation();

        dispatch({ type: 'SET_DROP_DEPTH', dropDepth: data.dropDepth + 1 });
    };
    const handleDragLeave = e => {
        e.preventDefault();
        e.stopPropagation();

        dispatch({ type: 'SET_DROP_DEPTH', dropDepth: data.dropDepth - 1 });
        if (data.dropDepth > 0) return
        dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: false })
    };
    const handleDragOver = e => {
        e.preventDefault();
        e.stopPropagation();

        e.dataTransfer.dropEffect = 'copy';
        dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: true });
    };
    const handleDrop = e => {
        e.preventDefault();
        e.stopPropagation();

        let files = [...e.dataTransfer.files];

        if (files && files.length > 0) {
            const existingFiles = data.fileList.map(f => f.name)
            files = files.filter(f => !existingFiles.includes(f.name))

            dispatch({ type: 'ADD_FILE_TO_LIST', files });
            dispatch({ type: 'SET_DROP_DEPTH', dropDepth: 0 });
            dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: false });
        }
    };

    return (
        <div className={data.inDropZone ? 'drag-drop-zone inside-drag-area' : 'drag-drop-zone'}
            onDrop={e => handleDrop(e)}
            onDragOver={e => handleDragOver(e)}
            onDragEnter={e => handleDragEnter(e)}
            onDragLeave={e => handleDragLeave(e)}
        >
            <h3>Or Drag File Here to Upload</h3>
        </div>
    );
};
export default DragAndDrop;