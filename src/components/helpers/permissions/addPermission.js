import React, {Component, Fragment} from 'react';
import Translate from "react-translate-component";
import NewPermission from "./newPermission";

class AddPermission extends Component{
    state = {
        items: []
    };

    addPerm = () => {
        const {items} = this.state;
        let id = 1;

        if(items.length > 0){
           id = items[items.length - 1] + 1;
        }

        items.push(id);

        this.setState({items});
    };

    handleDelete = (id) => {
        const items = this.state.items.filter(el => el !== id);
        this.props.addPermissionData(id, {hasError: false});
        this.setState({items});
    };

    handleChange = (id, data) => this.props.addPermissionData(this.props.type, id, data);

    render(){

        const { items } = this.state;

        return(
            <div className="permissions__add-items">
                {!!items.length && items.map(el => (
                    <NewPermission
                        key={el}
                        id={el}
                        type={this.props.type}
                        prevKeys={this.props.data.list}
                        handleChange={this.props.addPermissionData}
                        handleDelete={this.handleDelete}
                    />
                ))}
                <Translate content="permissions.add" component="button" className="btn-round" onClick={this.addPerm} />
            </div>
        )
    }
};

export default AddPermission