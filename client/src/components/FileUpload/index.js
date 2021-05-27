import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FileUpload = () => {
    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Choose wav, flac, mp3, or amr file');
    // const [uploadedFile, setUploadedFile] = useState({});
    const [error, setError] = useState('');

    const handleChange = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    }
    const handleSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        try {
            setError('')
            const res = await axios.post('/uploads/files', formData, {
                headers: {
                    'Content-Type': 'multi-part/form-data'
                }
            });
            // console.log(res);
            // const { fileName, filePath } = res.data;
            // setUploadedFile({ fileName, filePath });
        } catch (err) {
            setError('Upload failed. Please check your file type and try again.')
            console.error(err);
            console.log(err.response.data.msg);
        }
    }
    return (
        <Fragment>
            <form onSubmit={handleSubmit}>
                <div className="custom-file mb-4">
                    <input
                        type="file"
                        className="custom-file-input"
                        id="customFile"
                        onChange={handleChange}
                    />
                    <label className="custom-file-label" htmlFor="customFile">{filename}</label>
                </div>
                {error && <div className="alert alert-danger" role="alert" style={{ margin: '20px 0' }}>{error}</div>}
                <Link
                    to={{
                        pathname: "https://online-audio-converter.com/"
                    }}
                    target='_blank'
                    className='btn btn-block'
                    style={{ marginTop: '6px', padding: '6px', fontSize: '22px', color: 'white', background: 'hsl(265, 55%, 40%)', border: '1px solid #DDD', borderRadius: '6px' }}
                >
                    Convert File Type
                </Link>
                <input
                    type="submit"
                    value="Upload Audio &#8673;"
                    disabled={filename === 'Choose wav, flac, mp3, or amr file'}
                    className="btn btn-lg btn-block mt-2"
                    style={{ color: 'white', background: 'hsl(0, 85%, 50%)', border: 'none' }}
                />
            </form>
        </Fragment>
    )
}

export default FileUpload;
