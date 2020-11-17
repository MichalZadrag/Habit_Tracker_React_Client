import React, {useState} from "react";
import {Card, ListGroup} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock} from "@fortawesome/free-regular-svg-icons";

import {changeToIcon} from "../../constants/utils";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";


const HabitSeriesSummary = () => {

    const [value, onChange] = useState(new Date());


    return(
        <Card className="w-75 ml-auto mr-auto mt-5">
            <Card.Footer className="d-flex">
                <div>
                    <FontAwesomeIcon icon={faClock} className={"mt-2 mr-2"} />
                    <span>Systematyczność</span>
                </div>
                <div className="ml-auto d-flex">
                    <div className={"mt-2 mr-2"}>
                        <span>Nawyk: </span>
                    </div>
                    <select className="form-control" id="exampleFormControlSelect1">
                        <option>Bieganie</option>
                        <option>Dupa</option>
                        <option>Jazda na Rowerze</option>
                    </select>
                </div>

            </Card.Footer>

            <Card.Body className="p-0">
                <ListGroup>
                    <ListGroup.Item className="w-100 ml-auto mr-auto">
                        <div className="d-flex">
                            <div className="float-right mt-2">
                                <FontAwesomeIcon size={"lg"} icon={changeToIcon("faBook")}/>
                                <span className="p-1 m-1">Bieganie</span>
                            </div>
                        </div>
                        <div className="text-center mt-2">
                            <h4>Seria tygodniowa</h4>
                        </div>
                        <div className="text-center mt-3 pt-2 pb-2">
                            <Row>
                                <Col sm>
                                    <FontAwesomeIcon size="lg" icon={faAngleLeft} />
                                </Col>
                                <Col sm>
                                    <span className="border border-dark bg-light rounded-circle p-2">16.11</span>
                                </Col>
                                <Col sm>
                                    <span className="border border-dark bg-light rounded-circle p-2">17.11</span>
                                </Col>
                                <Col sm>
                                    <span className="border border-dark bg-success rounded-circle p-2">18.11</span>
                                </Col>
                                <Col sm>
                                    <span className="border border-dark bg-danger rounded-circle p-2">19.11</span>
                                </Col>
                                <Col sm>
                                    <span className="border border-dark bg-light rounded-circle p-2">20.11</span>
                                </Col>
                                <Col sm>
                                    <span className="border border-dark bg-success rounded-circle p-2">21.11</span>
                                </Col>
                                <Col sm>
                                    <span className="border border-dark bg-light rounded-circle p-2">22.11</span>
                                </Col>
                                <Col sm>
                                    <FontAwesomeIcon size="lg" icon={faAngleRight} />
                                </Col>
                            </Row>
                        </div>
                        {/*<div className="text-center mt-2">*/}
                        {/*    <h4>Seria miesieczna</h4>*/}
                        {/*</div>*/}
                        {/*<div className="mt-2">*/}
                        {/*    <Calendar*/}
                        {/*        className="mb-0 mt-0 ml-auto mr-auto"*/}
                        {/*        onChange={onChange}*/}
                        {/*        value={value}*/}
                        {/*    />*/}
                        {/*</div>*/}
                    </ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
    )
}


export default HabitSeriesSummary;