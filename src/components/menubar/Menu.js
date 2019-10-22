import React from 'react';
import './Menu.css';
import DropdownMenu from './DropdownMenu';
import { createScenario, openScenario, deleteScenario, saveScenario } from './actions';
import { connect } from 'react-redux';



class Menu extends React.PureComponent {
    constructor(props) {
        super(props);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    handleCreate() {
        this.props.createScenario();
    }

    handleOpen() {
        this.props.openScenario();
    }

    handleDelete() {
        this.props.deleteScenario();
    }

    handleSave() {
        this.props.saveScenario();
    }

    render() {
        let scenarioMenu = {
            title: 'Scenario', subItems: [{ title: 'Create', handler: this.handleCreate }, { title: 'Open', handler: this.handleOpen }, { title: 'Delete', handler: this.handleDelete },
                { title: 'Save', handler: this.handleSave }]
        };
        return (
            <div className="menu">
                <DropdownMenu menuItem={scenarioMenu} />
            </div>
        );
    }
}

const mapDispatchToProps = {
    createScenario,
    openScenario,
    deleteScenario,
    saveScenario
};

const ConnectedMenu = connect(null, mapDispatchToProps)(Menu);

export default ConnectedMenu;