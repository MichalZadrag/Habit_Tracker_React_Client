import React, { useEffect, useState } from 'react';
import Container from "react-bootstrap/Container";
import {Sidebar, HabitList, Navbar, CollapseButton, Chart, LoginForm, RegisterForm} from "./components";
import styles from './App.module.css';
import {faAward} from "@fortawesome/free-solid-svg-icons";
import CardDeck from "./components/CardDeck/CardDeck";
import {faCalendar, faCalendarCheck} from "@fortawesome/free-regular-svg-icons";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {ACCESS_TOKEN} from "./constants";
import {fetchHabitData} from "./api";

const App = () => {

    const [cards, setCards] = useState([]);

    const [newHabit, setNewHabit] = useState(1);

    useEffect(() => {
        console.log("USE EFFECT - APP");

        setCards([
            {id: 0, card_text: "Zadania na dzisiaj", icon: faCalendarCheck},
            {id: 1, card_text: "Osiągnięcia", icon: faAward},
            {id: 2, card_text: "Dzisiejsze wydarzenia", icon: faCalendar}
            ]);

    },[]);





     return (
         <Router>
             <div className="App">
                 <div className={styles.wrapper}>
                     <Route path={["/", "/login"]} exact>
                         <LoginForm   handleChangeHabit = { () => {setNewHabit(Math.random())} } />
                     </Route>
                     <Route path="/register">
                         <RegisterForm/>
                     </Route>
                     <Route path={["/habits", "/statistics"]} exact>
                         <Sidebar onLogout={ () =>  localStorage.removeItem(ACCESS_TOKEN) } />
                         <Container fluid>
                             <Route path="/habits" exact>
                                 <Navbar handleChangeHabit = { () => {setNewHabit(Math.random())} } />
                                 <HabitList
                                    newHabit = { newHabit }
                                 />
                             </Route>
                             <Route path="/statistics">
                                 <CollapseButton/>
                                 <Chart/>
                                 <CardDeck
                                     cards={ cards }
                                 />
                             </Route>
                         </Container>
                     </Route>
                 </div>
             </div>
         </Router>
     );
}

export default App;


