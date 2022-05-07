import React, {Component} from 'react';
import TitleWrapper from "./titleWrapper";
import {Caret} from "../../svg";

class AccordeonItem extends Component{
    state = {
        open: false
    };

    handleClick = () => this.setState(state => ({open: !state.open}));

    render(){

        const {titleTag, children} = this.props;
        const open = this.state.open;

        return(
            <div className={`accordeon-item${open ? ' open' : ''}`}>
                <button className="accordeon-item__title" onClick={this.handleClick}>
                    <TitleWrapper title={titleTag} />
                    <Caret />
                </button>
                <div className="accordeon-item__content">
                    {children}
                </div>
            </div>
        )
    }
}

export default AccordeonItem;