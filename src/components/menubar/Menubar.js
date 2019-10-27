import React from 'react';
import './Menubar.css';
import Menu from './Menu';
import { connect } from 'react-redux';

class Menubar extends React.PureComponent {
    render() {
        return(
            <div className="menu-bar">
                <Menu />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
});

const ConnectedMenubar = connect(mapStateToProps,null)(Menubar);

export default ConnectedMenubar;