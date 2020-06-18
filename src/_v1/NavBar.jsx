import React, { useEffect, useState } from "react";
import {
    Link,
    useLocation,
    useHistory
} from "react-router-dom";
import { Menu, Icon } from "semantic-ui-react";

import FrameFinder from "./modules/FrameFinder";

export default function NavBar(props) {
    const { pathname } = useLocation();
    const history = useHistory();
    const [ isOpen, setIsOpen ] = useState(false);

    useEffect(() => {
        window.onkeydown = e => {
            // console.log(e.which, e)
            if(e.ctrlKey === true && (e.which === 32 || e.which === 70)) {
                e.preventDefault();
                setIsOpen(true);
            } else if(e.altKey === true) {
                if(e.which === 49) {
                    e.preventDefault();
                    history.push("/upload");
                } else if(e.which === 50) {
                    e.preventDefault();
                    history.push("/sequencer");
                }
            }
            // console.log(e.which)
        };

        return () => {
            window.onkeydown = null;
        };
    }, [ history ]);

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

            <Menu.Menu position="right">
                <FrameFinder open={ isOpen } opener={ setIsOpen } onClose={ () => setIsOpen(false) }>
                    <Menu.Item onClick={ () => setIsOpen(true) }>
                        <Icon name="search" />
                        Search
                    </Menu.Item>
                </FrameFinder>
            </Menu.Menu>
        </Menu>
    )
};