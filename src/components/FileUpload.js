import Resizer from "react-image-file-resizer";
import axios from "axios";
import React, {useContext} from "react";
import {AuthContext} from "../context/authContext";
import Image from "./Image";

const FileUpload = ({loading, setLoading, values, setValues}) => {
    const {state} = useContext(AuthContext);
    const imageResizeAndUpload = (event) => {
        setLoading(true);
        let fileInput = false;
        if (event.target.files[0]) {
            fileInput = true;
        }
        if (fileInput) {
            try {
                Resizer.imageFileResizer(
                    event.target.files[0],
                    300,
                    300,
                    "JPEG",
                    100,
                    0,
                    (uri) => {
                        axios.post(`${process.env.REACT_APP_REST_ENDPOINT}/uploadimages`, {image: uri},
                            {
                                headers: {
                                    // again the token.token is used as the response object is structured that way.
                                    authtoken: state.user.token.token
                                }
                            })
                            .then(response => {
                                setLoading(false);
                                setValues({...values, images: [...values.images, response.data]})
                            })
                            .catch(e => {
                                setLoading(false);
                                console.log("CLOUDINARY UPLOAD FAILED", e);
                            })
                    },
                    "base64",
                    200,
                    200
                );
            } catch (err) {
                console.log(err);
            }
        }
    };

    const handleImageRemove = (id) => {
        setLoading(true);
        axios.post(`${process.env.REACT_APP_REST_ENDPOINT}/removeimage`,
            {
                public_id: id
            },
            {
                headers: {
                    // again the token.token is used as the response object is structured that way.
                    authtoken: state.user.token.token
                }
            }).then(response => {
            setLoading(false);
            let filteredImages = values.images.filter(image => {
                return image.public_id !== id;
            })
            setValues({...values, images: filteredImages})
        }).catch(e => {
            console.log("Error while removing image", e);
            setLoading(false);
        })
    }

    return (
        <div className="row">
            <div className="col-md-3">
                <label> Upload Image</label>
                <input className="form-control" type="file" accept="image/*"
                       onChange={imageResizeAndUpload}
                       placeholder="Image"/>
            </div>
            <div className="col-md-9">
                {values.images.map(image =>
                    <Image image={image}
                           key={image.public_id}
                           handleImageRemove={handleImageRemove}
                    />)
                }
            </div>
        </div>
    );
}

export default FileUpload;