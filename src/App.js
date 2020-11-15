import React, { useEffect, useState } from 'react';
import Container from "react-bootstrap/Container";
import {
    Sidebar,
    HabitList,
    Navbar,
    Chart,
    LoginForm,
    RegisterForm,
    TaskDeck,
    EventDeck, UserEditForm,
} from "./components";
import styles from './App.module.css';
import CardDeck from "./components/CardDeck/CardDeck";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {getCurrentUser} from "./api";
import {Spinner} from "react-bootstrap";
import NoMatch from "./components/NoMatch/NoMatch";

const App = () => {

    const [currentUser, setCurrentUser] = useState({id: '', username: '', first_name: '',last_name: '', email: ''})
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isSidebarActive, setIsSidebarActive] = useState(true);
    const [isDataChange, setIsDataChange] = useState(false);




    useEffect(() => {

       const fetchCurrentUser = async () => {
           setCurrentUser(await getCurrentUser());
        }
        fetchCurrentUser();
    },[isAuthenticated, isDataChange]);


     return (
         <Router>
              <div className="App">
                  <div className={styles.wrapper}>
                      <Switch>
                          <Route path={["/", "/login"]} exact>
                                 <LoginForm
                                     setIsAuthenticated = { setIsAuthenticated }
                                 />
                             </Route>
                          <Route path="/register">
                                 <RegisterForm/>
                             </Route>
                          <Route path={["/habits", "/statistics","/tasks", "/events", "/userEditForm"]} >
                                 {(!currentUser.id ) ?
                                     (<Spinner
                                         animation="border"
                                         variant={"primary"}
                                         className ={"mt-5 ml-auto mr-auto"}
                                     /> ) :
                                     (<Route path={["/habits", "/statistics", "/tasks", "/events", "/userEditForm"]} >
                                     <Sidebar
                                         setIsAuthenticated = { setIsAuthenticated }
                                         currentUser = { currentUser }
                                         isSidebarActive = { isSidebarActive }
                                     />
                                     <Container
                                         fluid
                                         className={!isSidebarActive && styles.test}
                                     >
                                         <Route path="/userEditForm" >
                                             <Navbar
                                                 setIsSidebarActive = { setIsSidebarActive }
                                                 isSidebarActive = { isSidebarActive }
                                             />
                                             <UserEditForm
                                                 currentUser = { currentUser }
                                                 setIsDataChange = { setIsDataChange }
                                             />
                                         </Route>
                                         <Route path="/habits" >
                                             <Navbar
                                                 setIsSidebarActive = { setIsSidebarActive }
                                                 isSidebarActive = { isSidebarActive }
                                             />
                                             <HabitList
                                                currentUserId = { currentUser.id }
                                             />
                                         </Route>
                                         <Route path="/statistics">
                                             <Navbar
                                                 setIsSidebarActive = { setIsSidebarActive }
                                                 isSidebarActive = { isSidebarActive }
                                             />
                                             <Chart/>
                                             <CardDeck
                                             />
                                         </Route>
                                         <Route path="/tasks">
                                             <Navbar
                                                 setIsSidebarActive = { setIsSidebarActive }
                                                 isSidebarActive = { isSidebarActive }
                                             />
                                             <TaskDeck
                                                 currentUserId = { currentUser.id }
                                             />
                                         </Route>
                                         <Route path="/events">
                                             <Navbar
                                                 setIsSidebarActive = { setIsSidebarActive }
                                                 isSidebarActive = { isSidebarActive }
                                             />
                                            <EventDeck
                                                currentUserId = { currentUser.id }
                                            />
                                         </Route>
                                     </Container>
                                 </Route>)}
                             </Route>
                          <Route path="*">
                              <NoMatch
                                  setIsAuthenticated = { setIsAuthenticated }
                              />
                          </Route>
                      </Switch>
                  </div>
              </div>
         </Router>
     );
}

export default App;


