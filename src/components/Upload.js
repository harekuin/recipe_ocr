import React, { useState, useContext } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/lib/ReactCrop.scss';
import { createWorker } from 'tesseract.js'
import Spinner from 'react-bootstrap/Spinner';
import ListContext from '../context/ListContext'
import ItemContext from  '../context/ItemContext'

function Upload() {

    const { active, setActive } = useContext(ItemContext);
    const { list, setList } = useContext(ListContext);
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [urlFile, setUrlFile] = useState(null);
    const types = ['image/png', 'image/jpeg'];
    const [image, setImage] = useState(null);
    const [crop, setCrop] = useState(null);
    const [result, setResult] = useState(null);
    const [textResult, setTextResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [nowLoad, setNowLoad] = useState(false);

    //select image file to be cropped and converted to text
    const selectFileHandler = (e) => {
        let selected = e.target.files[0];

        if(selected && types.includes(selected.type)){
            setFile(selected);
            setUrlFile(URL.createObjectURL(selected));
            setError("");
        }else{
            setFile(null);
            setUrlFile(null);
            setError("Please select an image of the correct type (ie: png or jpg)");
        }
    }

    /**
     * Crops chosen image and converts from picture to text.
    */
    function getCroppedImg() {
        setNowLoad(true);
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');
   
        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height,
        );

        const base64Image = canvas.toDataURL('image/jpeg');
        setResult(base64Image);

        // Tesseract.recognize(
        //     base64Image,
        //     'eng',
        //     { logger: m => console.log(m) }
        //   ).then(({ data: { text } }) => {
        //     console.log(text);
        //     setTextResult(text);
        //   })
        //   setLoading(true);

        const worker = createWorker({
            logger: m => console.log(m)
        });

        (async () => {
            await worker.load();
            await worker.loadLanguage('eng');
            await worker.initialize('eng');
            const { data: { text } } = await worker.recognize(base64Image);
            setTextResult(text);
            //setList(text);
            await worker.terminate();
            setLoading(true);
        })();
            setLoading(false);
    }

    //Allows to flip between the two components by setting {active} and {list} states.
    function flipIt() {
        if(!textResult || /^\s*$/.test(textResult) || textResult === undefined ){
            setList("");
        }else{
            setList(textResult);
        }
        setActive(true);
    }

    return (
        <div>
            <input type="file" name="file" id="file" className="inputfile" accept="image/*" onChange={selectFileHandler}/>
            <label htmlFor="file">Choose a picture</label>
                
            <div className="output">
                { error && <div className="error">{ error }</div> }
            </div>
                
            <div>
                { urlFile && 
                    <div>                
                       <div className="form-group">
                            <ReactCrop src={urlFile} onImageLoaded={setImage} crop={crop} onChange={setCrop} />
                        </div>
                        
                        <div className="form-group">
                            <button className='crop-button' onClick={getCroppedImg}>Crop Image</button>
                        </div>
                    </div>
                }
                { nowLoad &&
                    <div>
                    {loading ? 
                        textResult : <Spinner animation="border" />}
                    </div>
                } 
                {/* <div className="item-app"> */}
                    <button className='crop-button' onClick={() => flipIt()}>Get ingredient list</button>
                {/* </div> */}
            </div>
        </div>
    )
}

export default Upload