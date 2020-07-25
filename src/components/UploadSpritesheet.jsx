import React, { useState, useEffect } from "react";
import { Button, Icon } from "semantic-ui-react";

export default function UploadSpritesheet(props) {
    const photoRef = React.createRef();
    const [ photo, setPhoto ] = useState(props.image);

    useEffect(() => {
        if(photo) {
            props.onSelect(photo);
        }
        // eslint-disable-next-line
    }, [ photo ]);

    function selectPhoto(e) {
        let file = e.target.files[ 0 ];

        if(file) {
            const fs = new FileReader();
            
            fs.addEventListener("load", function () {
                const img = new Image();
                img.onload = () => setPhoto(img);
                img.src = fs.result;
            }, false);
            
            fs.readAsDataURL(file);
        }
    }

    return (
        <>
            <Button icon labelPosition="left" color="blue" size="large" onClick={ e => photoRef.current.click() }>
                <Icon name="file image outline" />
                Select Spritesheet
            </Button>

            <input ref={ photoRef } type="file" accept="image/*;capture=camera" hidden onChange={ selectPhoto } />
        </>
    );
};