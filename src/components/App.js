import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './Layout/Layout';
import Home from '../pages/Home';
import About from '../pages/About';
import Rooms from '../pages/Rooms';
import RoomDetails from '../pages/RoomDetails';
import Services from '../pages/Services';
import Contact from '../pages/Contact';
import Profile from '../pages/Profile';

const App = () => {
    return (
        <Router>
            <Layout>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/about" component={About} />
                    <Route path="/rooms" component={Rooms} />
                    <Route path="/rooms/:id" component={RoomDetails} />
                    <Route path="/services" component={Services} />
                    <Route path="/contact" component={Contact} />
                    <Route path="/profile" component={Profile} />
                </Switch>
            </Layout>
        </Router>
    );
};

export default App;