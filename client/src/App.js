import React from 'react'
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import TimeLine from "./components/timeline/timeLine";
import NewCase from './components/cases/NewCase';
import NewEvent from './components/events/NewEvent';
import AppNavBar from './components/nav-bar/NavBar';
import Link from "@material-ui/core/Link";
import {BiMessageRoundedEdit} from "react-icons/all";

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <React.Fragment>
                    <div>
                        <AppNavBar/>
                        <Switch>
                            <Route path="/navBar" component={AppNavBar}/>
                            {/*<Route path="/event" component={NewEvent}/>*/}
                            <Route path="/event/:id">
                                <NewEvent/>
                            </Route>
                            <Route path="/case" component={NewCase}/>
                            <Route path="/timeLine" component={TimeLine}/>
                            <Route exact path="/"><Redirect to="/TimeLine"/>
                            </Route>
                        </Switch>

                    </div>
                </React.Fragment>
            </Router>
        );
    }
}

