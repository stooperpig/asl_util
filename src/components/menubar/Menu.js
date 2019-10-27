import React from 'react';
import './Menu.css';
import DropdownMenu from './DropdownMenu';
import { createScenario, editScenario, deleteScenario, saveScenario } from './actions';
import { connect } from 'react-redux';



class Menu extends React.PureComponent {
    constructor(props) {
        super(props);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    handleCreate() {
        this.props.createScenario();
    }

    handleEdit() {
        this.props.editScenario();
    }

    handleDelete() {
        this.props.deleteScenario();
    }

    handleSave() {
        this.props.saveScenario();
    }

    render() {
        let scenarioMenu = {
            title: 'Scenario', subItems: [{ title: 'Create', handler: this.handleCreate }, { title: 'Edit', handler: this.handleEdit }, { title: 'Delete', handler: this.handleDelete },
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
    editScenario,
    deleteScenario,
    saveScenario
};

const ConnectedMenu = connect(null, mapDispatchToProps)(Menu);

export default ConnectedMenu;