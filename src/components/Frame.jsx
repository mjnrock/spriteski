/* eslint-disable */
import React from "react";
import { Segment, } from "semantic-ui-react";

export default function Frame(props) {
    return (
        <Segment tertiary style={{ marginBottom: 4 }}>
            { props.children }
        </Segment>
    );
}