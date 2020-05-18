import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css'

import Container from "react-bootstrap/Container";

import { Sidebar, HabitList, Navbar } from "./components";
import styles from './App.module.css';
import {faBiking, faBook, faDumbbell, faMoneyBillAlt} from "@fortawesome/free-solid-svg-icons";

class App extends Component {

    state = {
        habits: [
            {id: 0, habit_text: "Jazda na rowerze1", icon: faBiking},
            {id: 1, habit_text: "Jazda na rowerze2", icon: faBook},
            {id: 2, habit_text: "Jazda na rowerze3", icon: faDumbbell},
            {id: 3, habit_text: "Jazda na rowerze4", icon: faMoneyBillAlt}
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
      const { habits } = this.state;

      return (
          <div className="App">
              <div className={styles.wrapper}>
                  <Sidebar />
                  <Container fluid>
                      <Navbar
                          onAddHabit = { this.handleAddHabit }
                          onDeleteHabit = { this.handleDeleteHabit }
                      />
                      <HabitList
                          habits = { habits }
                      />
                  </Container>
              </div>
          </div>
      );
  }
}

export default App;


