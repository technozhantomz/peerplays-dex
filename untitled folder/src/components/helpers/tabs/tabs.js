import React, {Component} from 'react';
import DefaultTabsHead from './defaultTabsHead';
import RadioTabsHead from "./radioTabsHead";

const tabsHeadTypes = {
    defaultHead: DefaultTabsHead,
    radioHead: RadioTabsHead
};

class Tabs extends Component{
    state = {
        activeTab: 0
    };

    setActiveTab = e => this.setState({activeTab: this.props.head.indexOf(e.target.id)});

    render(){
        const activeTab = this.state.activeTab;
        let {head, headType, children} = this.props;

        headType = headType ? headType : 'defaultHead';

        const HeadComponent = tabsHeadTypes[headType];

        return(
            <div className="tabs">
                <HeadComponent
                    head={head}
                    activeTab={activeTab}
                    callback={this.setActiveTab}
                />
                <div className="tabs__content">
                    {children[activeTab]}
                </div>
            </div>
        )
    }
}

export default Tabs;