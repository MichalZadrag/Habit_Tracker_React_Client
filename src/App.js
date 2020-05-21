import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css'

import Container from "react-bootstrap/Container";

import {Sidebar, HabitList, Navbar, CollapseButton, Chart, LoginForm, RegisterForm} from "./components";
import styles from './App.module.css';
import {faAward} from "@fortawesome/free-solid-svg-icons";
import CardDeck from "./components/CardDeck/CardDeck";
import {faCalendar, faCalendarCheck} from "@fortawesome/free-regular-svg-icons";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {fetchHabitData} from "./api";

class App extends Component {

    state = {
        habits: [],
        cards: [
            {id: 0, card_text: "Zadania na dzisiaj", icon: faCalendarCheck},
            {id: 1, card_text: "Osiągnięcia", icon: faAward},
            {id: 2, card_text: "Dzisiejsze wydarzenia", icon: faCalendar}
        ],
    };

    async componentDidMount() {
        const fetchedHabitData = await fetchHabitData();
        this.setState({habits: fetchedHabitData });
    }

    render() {
        const { habits, cards } = this.state;

        return (
            <Router>
                <div className="App">
                    <div className={styles.wrapper}>
                        <Route path="/login">
                            <LoginForm/>
                        </Route>
                        <Route path="/register">
                            <RegisterForm/>
                        </Route>
                        <Route path={["/", "/habits", "/statistics"]} exact>
                            <Sidebar/>
                            <Container fluid>
                                <Route path={["/", "/habits"]} exact>
                                    <Navbar />
                                    <HabitList
                                        habits={habits}
                                    />
                                </Route>
                                <Route path="/statistics">
                                    <CollapseButton/>
                                    <Chart/>
                                    <CardDeck
                                        cards={cards}
                                    />
                                </Route>
                            </Container>
                        </Route>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;


