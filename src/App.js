import React from 'react';
import './App.css';
import Menubar from './components/menubar/Menubar';
import HomePanel from './components/homepanel/HomePanel';
import ScenarioPanel from './components/scenariopanel/ScenarioPanel';
import { connect } from 'react-redux';

class App extends React.PureComponent {
    componentDidMount() {
    }

    render() {
        return (
            <div className="app">
                <Menubar />
                <HomePanel />
                <ScenarioPanel />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = {
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;
