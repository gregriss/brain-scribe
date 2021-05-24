import React, { useState } from 'react';
import axios from 'axios';
import './style.css';

// TODO call a function to upload the file inside  handleDrop 
// Refactor this component code to look more like FileUpload
// Maybe I should Turn the 'Add a New Idea' jumbotron into the Drag and Drop Zone
const DragAndDrop = props => {
    const { data, dispatch } = props;

    // *** Added to emulate Upload Component ***
    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Drag and Drop Audio File')
    const [uploadedFile, setUploadedFile] = useState({});
    // const [error, setError] = useState('');

    const onChange = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name)
        console.log(e.target.files[0].name)
    }

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('file', file);
        try {
            // setError('')
            const res = await axios.post('/uploads/files', formData, {
                headers: {
                    'Content-Type': 'multi-part/form-data'
                }
            });
            const { fileName, filePath } = res.data;
            setUploadedFile({ fileName, filePath });
        } catch (err) {
            // setError('Upload failed. Please check your file type and try again.')
            console.error(err);
        }
    }

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
    const handleDrop = async e => {
        e.preventDefault();
        e.stopPropagation();
        setFile(e.dataTransfer.files[0]);
        setFilename(e.dataTransfer.files[0].name)

        // let files = [...e.dataTransfer.files];
        // if (files && files.length > 0) {
        //     const existingFiles = data.fileList.map(f => f.name)
        //     files = files.filter(f => !existingFiles.includes(f.name))

        //     dispatch({ type: 'ADD_FILE_TO_LIST', files });
        //     dispatch({ type: 'SET_DROP_DEPTH', dropDepth: 0 });
        //     dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: false });
        // }
    };
    return (
        <form onSubmit={handleSubmit} className={data.inDropZone ? 'drag-drop-zone inside-drag-area' : 'drag-drop-zone'}
            onDrop={e => handleDrop(e)}
            onDragOver={e => handleDragOver(e)}
            onDragEnter={e => handleDragEnter(e)}
            onDragLeave={e => handleDragLeave(e)}
        >
            <input
                type="file"
                className="custom-file-input"
                id="customFile"
                onChange={onChange}
                style={{ border: '1px solid black' }}
            >
            </input>
            <label><h3>{filename}</h3></label>
            <input
                type="submit"
                value="Upload"
                className="btn btn-lg btn-secondary btn-block mt-6"
                id="customFile"
                disabled={filename === 'Drag and Drop Audio File'}
            />
        </form>
    );
};

export default DragAndDrop;