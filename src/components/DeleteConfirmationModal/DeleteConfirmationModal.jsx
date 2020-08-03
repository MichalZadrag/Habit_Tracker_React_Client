import React from "react";
import styles from '../HabitAddFormModal/HabitAddFormModal.module.css';
import {Button, Col, Modal, Row} from "react-bootstrap";

const DeleteConfirmationModal = ({show, onHide, deleteData}) => {
    return(
        <Modal
            size="sm"
            show = { show }
            onHide = { onHide }
        >
            <Modal.Header className={styles.mHeader} closeButton>
                <Modal.Title>
                    Na pewno ?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.mBody}>
                <Row>
                    <Col className="text-center">
                        <Button variant={"danger"}
                                className="w-100"
                                onClick={ deleteData }>
                            Potwierdź
                        </Button>
                    </Col>
                    <Col className="text-center">
                        <Button variant={"primary"}
                                className="w-100"
                                onClick={ onHide }>
                            Cofnij
                        </Button>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    )
}

export default DeleteConfirmationModal;