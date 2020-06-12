import React from "react";
import {
    Link,
    useLocation
} from "react-router-dom";
import { Menu, Icon } from "semantic-ui-react";

export default function NavBar(props) {
    const { pathname } = useLocation();

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
        </Menu>
    )
};