import React from 'react';
import './DropdownMenu.css';


class Dropdown extends React.Component {
    render() {
        return (
            <div className="dropdown-menu">
                <div className="dropdown-menu-button">{this.props.menuItem.title}</div>
                <div className="dropdown-menu-content">
                    {this.props.menuItem.subItems.map((item, index) => {
                        return(<a href="#" key={index} onClick={item.handler}>{item.title}</a>);
                    })}
                </div>
            </div>
        );
    }
}

export default Dropdown;