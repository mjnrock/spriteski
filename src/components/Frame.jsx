/* eslint-disable */
import React from "react";
import { Segment, } from "semantic-ui-react";

export default function Frame(props) {
    return (
        <Segment tertiary>
            { props.children }
        </Segment>
    );
}