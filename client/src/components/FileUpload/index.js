import React, { Fragment, useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Choose mp3, wav, or flac file');
    const [uploadedFile, setUploadedFile] = useState({});

    const onChange = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    }

    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post('/uploads/files', formData, {
                headers: {
                    'Content-Type': 'multi-part/form-data'
                }
            });
            console.log(res);
            const { fileName, filePath } = res.data;

            setUploadedFile({ fileName, filePath });
            console.log(fileName);
        } catch (err) {
            console.error(err);
            // if (err.response.status === 500) {
            //     console.log('There was a problem with the server');
            // } else {
            //     console.log(err.response.data.msg);
            // }
        }
    }

    return (
        <Fragment>
            <form onSubmit={onSubmit}>
                <div className="custom-file mb-4">
                    <input
                        type="file"
                        className="custom-file-input"
                        id="customFile"
                        onChange={onChange}
                    />
                    <label className="custom-file-label" htmlFor="customFile">{filename}</label>
                </div>
                <input
                    type="submit"
                    value="Upload Audio &#8673;"
                    // disabled={!uploadedFile.filename}
                    className="btn btn-lg btn-success btn-block mt-2"
                />
            </form>
            { uploadedFile ? (
                <div className="row mt-2">
                    <div className="col-md-8 m-auto">
                        <h4 className="text-center">{uploadedFile.filename}</h4>
                        <img style={{ width: '100%' }} src={uploadedFile.filePath} alt="" />
                    </div>
                </div>
            ) : null}
        </Fragment>
    )
}

export default FileUpload;
