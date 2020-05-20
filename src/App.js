import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css'

import Container from "react-bootstrap/Container";

import {Sidebar, HabitList, Navbar, CollapseButton, Chart, LoginForm, RegisterForm} from "./components";
import styles from './App.module.css';
import {faAward, faBiking, faBook, faDumbbell, faMoneyBillAlt} from "@fortawesome/free-solid-svg-icons";
import CardDeck from "./components/CardDeck/CardDeck";
import {faCalendar, faCalendarCheck} from "@fortawesome/free-regular-svg-icons";
import {BrowserRouter as Router, Route} from 'react-router-dom';

class App extends Component {

    state = {
        habits: [
            {id: 0, habit_text: "Jazda na rowerze1", icon: faBiking},
            {id: 1, habit_text: "Jazda na rowerze2", icon: faBook},
            {id: 2, habit_text: "Jazda na rowerze3", icon: faDumbbell},
            {id: 3, habit_text: "Jazda na rowerze4", icon: faMoneyBillAlt}
        ],
        cards: [
            {id: 0, card_text: "Zadania na dzisiaj", icon: faCalendarCheck},
            {id: 1, card_text: "Osiągnięcia", icon: faAward},
            {id: 2, card_text: "Dzisiejsze wydarzenia", icon: faCalendar}
        ],
        data: [],
    };

    // async componentDidMount() {
    //     const fetchedData = await fetchData();
    //     this.setState({data: fetchedData });
    //     console.log(fetchedData);
    // }


    handleAddHabit = () => {
        const habits = [...this.state.habits];
        habits.push({id: 4, habit_text: "Jazda na rowerze5", icon: faMoneyBillAlt});
        this.setState({habits});
    }

    handleDeleteHabit = () => {
        const habits = [...this.state.habits];
        habits.pop();
        this.setState({habits});
    }

    render() {
        const {habits, cards, data} = this.state;

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
                                    <Navbar
                                        onAddHabit={this.handleAddHabit}
                                        onDeleteHabit={this.handleDeleteHabit}
                                    />
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


