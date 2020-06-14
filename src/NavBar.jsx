import React, { useEffect, useState } from "react";
import {
    Link,
    useLocation
} from "react-router-dom";
import { Menu, Icon } from "semantic-ui-react";

import FrameFinder from "./modules/FrameFinder";

export default function NavBar(props) {
    const { pathname } = useLocation();
    const [ isOpen, setIsOpen ] = useState(false);

    useEffect(() => {
        window.onkeydown = e => {
            // console.log(e.which, e)
            if(e.ctrlKey === true && (e.which === 32 || e.which === 70)) {
                e.preventDefault();

                setIsOpen(true);
            }
        };

        return () => {
            window.onkeydown = null;
        };
    }, []);

    return (
        <Menu icon="labeled">
            <Menu.Item as={ Link } to={ `/upload` } active={ pathname === "/upload" }>
                <Icon name="upload" />
                Upload
            </Menu.Item>

            <Menu.Item as={ Link } to={ `/sequencer` } active={ pathname === "/sequencer" }>
                <Icon name="video play" />
                Sequencer
            </Menu.Item>

            <>
                <FrameFinder open={ isOpen } onClose={ () => setIsOpen(false) } />
            </>
        </Menu>
    )
};