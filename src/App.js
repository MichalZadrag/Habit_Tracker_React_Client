import React, { useEffect, useState } from 'react';
import Container from "react-bootstrap/Container";
import {Sidebar, HabitList, Navbar, CollapseButton, Chart, LoginForm, RegisterForm, TaskDeck} from "./components";
import styles from './App.module.css';
import {faAward} from "@fortawesome/free-solid-svg-icons";
import CardDeck from "./components/CardDeck/CardDeck";
import {faCalendar, faCalendarCheck} from "@fortawesome/free-regular-svg-icons";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {getCurrentUser} from "./api";
import {Spinner} from "react-bootstrap";

const App = () => {

    const [cards, setCards] = useState([]);
    const [currentUser, setCurrentUser] = useState({id: '', username: '', first_name: '',last_name: '', email: ''})
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isSidebarActive, setIsSidebarActive] = useState(true);


    useEffect(() => {
        console.log("USE EFFECT - APP");

        setCards([
            {id: 0, card_text: "Zadania na dzisiaj", icon: faCalendarCheck},
            {id: 1, card_text: "Osiągnięcia", icon: faAward},
            {id: 2, card_text: "Dzisiejsze wydarzenia", icon: faCalendar}
            ]);

       const fetchCurrentUser = async () => {
           setCurrentUser(await getCurrentUser());
        }
        fetchCurrentUser();
    },[isAuthenticated]);


     return (
         <Router>
             <div className="App">
                 <div className={styles.wrapper}>
                     <Route path={["/", "/login"]} exact>
                         <LoginForm
                             setIsAuthenticated = { setIsAuthenticated }
                         />
                     </Route>
                     <Route path="/register">
                         <RegisterForm/>
                     </Route>
                     <Route path={["/habits", "/statistics","/tasks"]} exact>
                         {(!currentUser.id ) ?
                             (<Spinner
                                 animation="border"
                                 variant={"primary"}
                                 className ={"mt-5 ml-auto mr-auto"}
                             /> ) :
                             (<Route path={["/habits", "/statistics", "/tasks"]} exact>
                             <Sidebar
                                 setIsAuthenticated = { setIsAuthenticated }
                                 currentUser = { currentUser }
                                 isSidebarActive = { isSidebarActive }
                             />
                             <Container
                                 fluid
                                 className={!isSidebarActive && styles.test}
                             >
                                 <Route path="/habits" exact>
                                     <Navbar
                                         currentUser = { currentUser }
                                         setIsSidebarActive = { setIsSidebarActive }
                                         isSidebarActive = { isSidebarActive }
                                     />
                                     <HabitList
                                        currentUser = { currentUser }
                                     />
                                 </Route>
                                 <Route path="/statistics">
                                     <CollapseButton
                                         setIsSidebarActive = { setIsSidebarActive }
                                         isSidebarActive = { isSidebarActive }
                                     />
                                     <Chart/>
                                     <CardDeck
                                         cards={ cards }
                                     />
                                 </Route>
                                 <Route path="/tasks">
                                     <CollapseButton
                                         setIsSidebarActive = { setIsSidebarActive }
                                         isSidebarActive = { isSidebarActive }
                                     />
                                     <TaskDeck />
                                 </Route>
                             </Container>
                         </Route>)}
                     </Route>
                 </div>
             </div>
         </Router>
     );
}

export default App;


