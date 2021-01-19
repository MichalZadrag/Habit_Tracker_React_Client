import React, {useEffect, useState} from 'react';
import Container from "react-bootstrap/Container";
import {
    Sidebar,
    HabitList,
    LoginForm,
    RegisterForm,
    TaskDeck,
    EventDeck, UserEditForm, HabitSeriesSummary, CustomNavbar,
} from "./components";
import styles from './App.module.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {getCurrentUser, login} from "./api";
import {Spinner} from "react-bootstrap";
import NoMatch from "./components/NoMatch/NoMatch"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';

const App = () => {

    const [currentUser, setCurrentUser] = useState({id: '', username: '', first_name: '', last_name: '', email: ''})
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isDataChange, setIsDataChange] = useState(false);


    useEffect(() => {

        const fetchCurrentUser = async () => {
            setCurrentUser(await getCurrentUser());
        }
        fetchCurrentUser();
    }, []);


    return (

        <Router>
            <div className="App">
                <div className={styles.wrapper}>
                    <Switch>
                        <Route path={["/", "/login"]} exact>
                            <LoginForm
                                setIsAuthenticated={setIsAuthenticated}
                            />
                        </Route>
                        <Route path="/register">
                            <RegisterForm/>
                        </Route>
                        <Route path={["/habits", "/regularity", "/tasks", "/events", "/userEditForm"]}>
                            {(!currentUser.id) ?
                                (<Spinner
                                    animation="border"
                                    variant={"primary"}
                                    className={"mt-5 ml-auto mr-auto"}
                                />) :
                                (<Route path={["/habits", "/regularity", "/tasks", "/events", "/userEditForm"]}>
                                    <Sidebar
                                        setIsAuthenticated={setIsAuthenticated}
                                        currentUser={currentUser}
                                    />
                                    <Container
                                        fluid
                                    >
                                        <Route path="/userEditForm">
                                            <CustomNavbar
                                                setIsAuthenticated={setIsAuthenticated}
                                                currentUser={currentUser}
                                            />
                                            <UserEditForm
                                                currentUser={currentUser}
                                                setIsDataChange={setIsDataChange}
                                            />
                                        </Route>
                                        <Route path="/habits">
                                            <CustomNavbar
                                                setIsAuthenticated={setIsAuthenticated}
                                                currentUser={currentUser}
                                            />
                                            <HabitList
                                                currentUserId={currentUser.id}
                                            />
                                        </Route>
                                        <Route path="/regularity">
                                            <CustomNavbar
                                                setIsAuthenticated={setIsAuthenticated}
                                                currentUser={currentUser}
                                            />
                                            <HabitSeriesSummary
                                                currentUserId={currentUser.id}
                                            />
                                        </Route>
                                        <Route path="/tasks">
                                            <CustomNavbar
                                                setIsAuthenticated={setIsAuthenticated}
                                                currentUser={currentUser}
                                            />
                                            <TaskDeck
                                                currentUserId={currentUser.id}
                                            />
                                        </Route>
                                        <Route path="/events">
                                            <CustomNavbar
                                                setIsAuthenticated={setIsAuthenticated}
                                                currentUser={currentUser}
                                            />
                                            <EventDeck
                                                currentUserId={currentUser.id}
                                            />
                                        </Route>
                                    </Container>
                                </Route>)}
                        </Route>
                        <Route path="*">
                            <NoMatch
                                setIsAuthenticated={setIsAuthenticated}
                            />
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;


