import React, { useEffect, useState } from 'react';
import Container from "react-bootstrap/Container";
import {
    Sidebar,
    HabitList,
    Navbar,
    CollapseButton,
    Chart,
    LoginForm,
    RegisterForm,
    TaskDeck,
    EventDeck, UserEditForm,
} from "./components";
import styles from './App.module.css';
import CardDeck from "./components/CardDeck/CardDeck";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {getCurrentUser} from "./api";
import {Spinner} from "react-bootstrap";

const App = () => {

    const [currentUser, setCurrentUser] = useState({id: '', username: '', first_name: '',last_name: '', email: ''})
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isSidebarActive, setIsSidebarActive] = useState(true);


    useEffect(() => {

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
                     <Route path={["/habits", "/statistics","/tasks", "/events", "/userEditForm"]} exact>
                         {(!currentUser.id ) ?
                             (<Spinner
                                 animation="border"
                                 variant={"primary"}
                                 className ={"mt-5 ml-auto mr-auto"}
                             /> ) :
                             (<Route path={["/habits", "/statistics", "/tasks", "/events", "/userEditForm"]} exact>
                             <Sidebar
                                 setIsAuthenticated = { setIsAuthenticated }
                                 currentUser = { currentUser }
                                 isSidebarActive = { isSidebarActive }
                             />
                             <Container
                                 fluid
                                 className={!isSidebarActive && styles.test}
                             >
                                 <Route path="/userEditForm" exact>
                                     <CollapseButton
                                         setIsSidebarActive = { setIsSidebarActive }
                                         isSidebarActive = { isSidebarActive }
                                     />
                                     <UserEditForm
                                         currentUser = { currentUser }
                                     />
                                 </Route>
                                 <Route path="/habits" exact>
                                     <Navbar
                                         currentUserId = { currentUser.id }
                                         setIsSidebarActive = { setIsSidebarActive }
                                         isSidebarActive = { isSidebarActive }
                                     />
                                     <HabitList
                                        currentUserId = { currentUser.id }
                                     />
                                 </Route>
                                 <Route path="/statistics">
                                     <CollapseButton
                                         setIsSidebarActive = { setIsSidebarActive }
                                         isSidebarActive = { isSidebarActive }
                                     />
                                     <Chart/>
                                     <CardDeck
                                     />
                                 </Route>
                                 <Route path="/tasks">
                                     <CollapseButton
                                         setIsSidebarActive = { setIsSidebarActive }
                                         isSidebarActive = { isSidebarActive }
                                     />
                                     <TaskDeck
                                         currentUserId = { currentUser.id }
                                     />
                                 </Route>
                                 <Route path="/events">
                                     <CollapseButton
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
                 </div>
             </div>
         </Router>
     );
}

export default App;


