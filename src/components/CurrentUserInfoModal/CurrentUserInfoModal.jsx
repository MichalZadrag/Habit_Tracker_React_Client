import { FormControl, InputGroup, Modal} from "react-bootstrap";
import styles from "./CurrentUserInfoModal.module.css";
import React from "react";


const CurrentUserInfoModal = ({show, onHide, currentUser}) => {



    return(
        <Modal
            show = { show }
            onHide = { onHide }
        >
            <Modal.Header className={styles.mHeader} closeButton>
                <Modal.Title>
                    Moje Konto
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.mBody}>
                <InputGroup className="mb-3 mt-1">
                    <InputGroup.Prepend>
                        <InputGroup.Text className={styles.lightBlue}>
                            Imie
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl type="text" value={currentUser.first_name} readOnly className={"text-center"}/>
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text className={styles.lightBlue}>
                            Nazwisko
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl type="text" value={currentUser.last_name} readOnly className={"text-center"}/>
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text className={styles.lightBlue}>
                            Login
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl type="text" value={currentUser.username} readOnly className={"text-center"}/>
                </InputGroup>
                <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text className={styles.lightBlue}>
                        Email
                    </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl type="text" value={currentUser.email} readOnly className={"text-center"} />
            </InputGroup>

            </Modal.Body>
        </Modal>
    )
}

export default CurrentUserInfoModal;