import React, {Component} from "react";
import Translate from "react-translate-component";
import {IconCross, IconSearch} from "../../../svg";

class SearchForm extends Component{

    onChange = (e) => this.props.handleChange(e.target.value);
    onClose = () => {
        this.props.handleClose();
        setTimeout(() => {
            document.getElementsByClassName('search__field')[0].value = '';
        }, 400);
        this.props.handleChange('');
    };


    render(){
        return(
            <div className="search">
                <IconSearch className="search__icon" />
                <Translate
                    component="input"
                    className="search__field"
                    type="text"
                    onChange={this.onChange}
                    attributes={{ placeholder: this.props.placeholderTag }}
                />
                <button className="search__close" onClick={this.onClose}><IconCross /></button>
            </div>
        )
    }
}

export default SearchForm;