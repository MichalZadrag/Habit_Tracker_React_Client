import React from "react";
import styles from '../HabitAddModal/HabitAddModal.module.css';
import {Button, Col, Modal, Row} from "react-bootstrap";

const ConfirmationModal = ({show, onHide, handleData}) => {
    return (
        <Modal
            size="sm"
            show={show}
            onHide={onHide}
        >
            <Modal.Header className={styles.mHeader} closeButton>
                <Modal.Title>
                    Na pewno?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.mBody}>
                <Row>
                    <Col className="text-center">
                        <Button variant={"danger"}
                                className="w-75"
                                onClick={handleData}>
                            <small>Potwierdź</small>
                        </Button>
                    </Col>
                    <Col className="text-center">
                        <Button variant={"primary"}
                                className="w-75"
                                onClick={onHide}>
                            <small>Cofnij</small>
                        </Button>
                    </Col>
                </Row>
            </Modal.Body>


        </Modal>
    )
}

export default ConfirmationModal;