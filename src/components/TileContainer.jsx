import React, { Fragment } from "react";
import { useNodeContext } from "@lespantsfancy/hive/lib/react";

import { Context } from "../App";

export default function TileContainer(props) {
    // eslint-disable-next-line
    const { state } = useNodeContext(Context);

    return (
        <Fragment>
            Cats
        </Fragment>
    )
};