import React, {Component} from "react";
import Switcher from "../switcher";

// defaultData, groupId, switchersList, labelTag

class SwitchersGroup extends Component{

    state = {
        list: this.props.defaultData || {}
    };

    handleChange = (check, id) => {
        const {handleChange, groupId} = this.props;
        const list = this.state.list;
        list[id] = check;
        this.setState({list});
        handleChange && handleChange(list, groupId);
    };

    render(){

        const {switchersList, groupId, labelTag} = this.props;

        return(
            <div className="switchers-group">
                {switchersList.map((el, id) => (
                    <Switcher
                        key={id}
                        id={el}
                        name={groupId}
                        className="right-sided"
                        label={`${labelTag}.${el}`}
                        selected={this.state.list[el]}
                        handleChange={this.handleChange}
                    />
                ))}
            </div>
        )
    }
}

export default SwitchersGroup;