import React, {useRef, useState} from 'react';
import Button from './Button';
import styles from './ImageUpload.module.css';
const ImageUpload = (props) => {
    const imageInputRef = useRef();
    //const [file, setFile] = useState();
    const [isValid, setIsValid] = useState(false);
    const [preview, setPreview] = useState();

    const imageBrowseHandler = () => {
        imageInputRef.current.click();
    };
    //console.log('Picked File :: ', file);
    const imagePicker = (event) => {
        // console.log('imagePicker', event.target);
        let browsedFile;
        let fileIsValid = isValid;
        if (event.target.files && event.target.files.length === 1) {
            browsedFile = event.target.files[0];
            setIsValid(true);
            fileIsValid = true;
            //setFile(browsedFile);
        } else {
            setIsValid(false);
            fileIsValid = false;
        }
        if (browsedFile) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(browsedFile);
            fileReader.onload = () => {
                setPreview(fileReader.result);
            };
        }

        props.onInput(props.id, browsedFile, fileIsValid);
    };
    return (
        <div className={styles['form-control']}>
            <input ref={imageInputRef} type='file' id={props.id} style={{display: 'none'}} accept='.jpg,.png,.jpeg' onChange={imagePicker} />
            <div className={`${styles['image-upload']} ${props.center && 'center'}`}>
                <div className={styles['image-upload__preview']}>
                    {preview && <img src={preview} alt='preview' />}
                    {!preview && <p>Please browse an image.</p>}
                </div>
                <Button type='button' onClick={imageBrowseHandler}>
                    Browse Image
                </Button>
            </div>
        </div>
    );
};

export default ImageUpload;
