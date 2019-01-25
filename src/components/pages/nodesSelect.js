import React, {Component} from 'react';
import {connect} from "react-redux";
import {setNodes} from "../../dispatch/setNodes";
import {setInstance} from "../../dispatch";
import {nodeInit} from "../../actions/nodes/nodeInit";
import {pingNodes} from "../../actions/nodes";
import Switcher from "../helpers/switcher";
import {editStorage, getStorage, setStorage} from "../../actions/storage";
import Node from "../helpers/node";
import {defaultNodesList} from "../../params/nodesList";

class NodesSelect extends Component{

    state = {
        autoselect: getStorage('settings').nodeAutoselect
    };

    setActive = (node) => nodeInit(node.url)
        .then(({instance}) => {
            editStorage('nodes', {active: node.url});
            this.changeAutoSelect(false);
            this.props.setInstance(instance);
        });

    changeAutoSelect = (e) => {
        const value = typeof e === 'boolean' ? e : e.target.checked;
        editStorage('settings', {nodeAutoselect: value});
        this.setState({autoselect: value})
    };

    ping = () => {
        this.props.setNodes({});
        pingNodes();
    };

    render(){
        const {nodesList, instance} = this.props;
        const autoSelect = this.state.autoselect;
        let nodesAmount = defaultNodesList.length;
        let content = 'We still checking nodes connect time. Please, wait untill it\'s over' ;

        if(nodesList.length){
            const activeNode = nodesList.find(e => e.url === instance.url);
            const availableNodes = nodesList.filter(e => e.url !== instance.url);
            nodesAmount = nodesList.length;
            content = <React.Fragment>
                <h2>Active Node</h2>
                <Node data={activeNode} />
                <h2>Avaliable Nodes</h2>
                { availableNodes.map((el, id) => <Node key={id} data={el} handleActivation={this.setActive} />) }
            </React.Fragment>
        }

        return(
            <div className="container">
                <div className="nodes">
                    <div className="nodes__top">
                        <div className="nodes__autoselect">
                            <Switcher
                                id="autoSwitch"
                                label="nodes.autoSelect"
                                selected={autoSelect}
                                handleChange={this.changeAutoSelect}
                            />
                            <span className="nodes__amount">{nodesAmount} listed</span>
                        </div>
                        <button className="btn btn--round" onClick={this.ping}>Ping</button>
                    </div>
                    {content}
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({nodesList, instance}) => ({nodesList, instance});
const mapDispatchToProps = dispatch => ({
    setInstance: data => dispatch(setInstance(data)),
    setNodes: data => dispatch(setNodes(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(NodesSelect);
