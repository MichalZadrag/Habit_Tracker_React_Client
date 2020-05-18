import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css'

import Container from "react-bootstrap/Container";

import {Sidebar, HabitList, Navbar, CollapseButton, Chart} from "./components";
import styles from './App.module.css';
import {faAward, faBiking, faBook, faDumbbell, faMoneyBillAlt} from "@fortawesome/free-solid-svg-icons";
import CardDeck from "./components/CardDeck/CardDeck";
import {faCalendar, faCalendarCheck} from "@fortawesome/free-regular-svg-icons";

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
        ]
    };

    handleAddHabit = () => {
        const habits = [...this.state.habits];
        habits.push({ id: 4, habit_text: "Jazda na rowerze5", icon: faMoneyBillAlt });
        this.setState({habits});
    }

    handleDeleteHabit = () => {
        const habits = [...this.state.habits];
        habits.pop();
        this.setState({habits});
    }

  render() {
      const { habits, cards } = this.state;

      return (
          <div className="App">
              <div className={styles.wrapper}>
                  <Sidebar />
                  <Container fluid>
                      {/*<Navbar*/}
                      {/*    onAddHabit = { this.handleAddHabit }*/}
                      {/*    onDeleteHabit = { this.handleDeleteHabit }*/}
                      {/*/>*/}
                      {/*<HabitList*/}
                      {/*    habits = { habits }*/}
                      {/*/>*/}
                      <CollapseButton />
                      <Chart />
                      <CardDeck
                        cards = { cards }
                      />
                  </Container>
              </div>
          </div>
      );
  }
}

export default App;


