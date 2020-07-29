import React, { Fragment, useState } from "react";
import { Form, Header, Button, Icon, Modal, TextArea } from "semantic-ui-react";
import { useNodeContext } from "@lespantsfancy/hive/lib/react";

import { Context } from "../../App";
import { EnumMessageType } from "./../../state/reducers";

function SequencerAlgorithms() {
    // eslint-disable-next-line
    const { node, state } = useNodeContext(Context);
    const [ modalOpen, setModalOpen ] = useState(false);
    
    return (
        <Fragment>        
            <Header as="h4" color="grey" textAlign="center">
                <Header.Content>Sequencer Algorithms</Header.Content>
            </Header>

            <Form>
                <Modal
                    basic
                    open={ modalOpen }
                    onClose={ () => setModalOpen(false) }
                    trigger={(
                        <Button onClick={ e => setModalOpen(true) }>
                            <Icon name="code" /> Modify Algorithm
                        </Button>
                    )}
                >
                    <Modal.Header>Edit Algorithm</Modal.Header>
                    <Modal.Content>
                        <TextArea
                            style={{ margin: "auto", width: "100%", height: "100%", overflow: "auto" }}
                            placeholder="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam soluta maiores facilis illo ipsa eum laborum consectetur dignissimos ducimus voluptas ipsam totam, sint at officiis minima, quaerat corporis quos id."
                        /> 
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color="green" inverted onClick={ e => setModalOpen(false) }>
                            <Icon name="checkmark" /> Save
                        </Button>
                        <Button color="red" inverted onClick={ e => setModalOpen(false) }>
                            <Icon name="x" /> Cancel
                        </Button>
                    </Modal.Actions>
                </Modal>

                <Button color="blue" onClick={ e => node.dispatch(EnumMessageType.AUTO_SEQUENCER_BEGIN) }>
                    <Icon name="film" /> Create Sequence
                </Button>
            </Form>
        </Fragment>
    );
}

export default SequencerAlgorithms;