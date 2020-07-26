import React, { useEffect } from "react";
import {
    Link,
    useLocation,
    useHistory
} from "react-router-dom";

import { Menu, Icon } from "semantic-ui-react";

export default function NavBar(props) {
    const { pathname } = useLocation();
    const history = useHistory();

    useEffect(() => {
        window.onkeydown = e => {
            // console.log(e.which, e)
            if(e.ctrlKey === true && (e.which === 32 || e.which === 70)) {
                e.preventDefault();
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
            
            <Menu.Item as={ Link } to={ `/collection` } active={ pathname === "/collection" }>
                <Icon name="object group outline" />
                Collection
            </Menu.Item>
            
            <Menu.Item as={ Link } to={ `/sequencer` } active={ pathname === "/sequencer" }>
                <Icon name="play circle outline" />
                Sequencer
            </Menu.Item>
        </Menu>
    )
};