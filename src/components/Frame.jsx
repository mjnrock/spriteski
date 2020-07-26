/* eslint-disable */
import React from "react";
import { Segment, Icon } from "semantic-ui-react";

export default function Frame(props) {
    return (
        <Segment tertiary style={{ marginBottom: 4 }}>
            <Icon name="content" { ...props.dragHandleProps } />

            <img src={ props.frame.source } />

            { props.children }
        </Segment>
    );
}