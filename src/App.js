import React from 'react';
import './App.css';
import Menubar from './components/menubar/Menubar';
import HomePanel from './components/homepanel/HomePanel';
import ScenarioPanel from './components/scenariopanel/ScenarioPanel';
import { connect } from 'react-redux';
import { ImageMap } from './constants/counter-types';

class App extends React.PureComponent {
    componentDidMount() {
        this.loadImages(ImageMap);
    }

    loadImages(images) {
        let that = this;
        let loadedImages = 0;
        let numImages = Object.keys(images).length;

        const onLoad = () => {
            if (++loadedImages >= numImages) {
                that.setState({ imagesReady: true });
            }
        };

        for (let imageName in images) {
            let src = images[imageName].src;
            let image = new Image();
            image.onload = onLoad;
            image.src = src;
            images[imageName].image = image;
        }
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
