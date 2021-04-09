import * as ReactDOM from "react-dom";
import React, {Component} from 'react'
import ControlledInput from "./controlledInput";
import {Caret} from "../../../svg";
import Translate from "react-translate-component";

class FieldWithHint extends Component{
    state = {
        data: {},
        hints: [],
        timeout: false
    };

    componentDidMount(){
        const {defaultVal, name} = this.props;
        const data = {};
        if(defaultVal){
            data[name] = defaultVal[name];
            this.setState({data});
        }
    }

    componentWillUnmount() { this.removeListener(); }

    handleChange = (val, name) => {
        let {data, timeout} = this.state;
        data[name] = val;

        if(timeout) clearTimeout(timeout);

        if(!val && this.props.defaultHints) this.setState({hints: this.props.defaultHints});
        if(val) timeout = setTimeout(() => {
            const {name, method, handleChange} = this.props;
            method(val).then(hints => this.setState({hints}));
            handleChange(val, name);
        }, 250);

        document.addEventListener('click', this.handleOutsideClick, false);
        this.setState({data, timeout});
    };

    handleOutsideClick = (e) => {
        if (!ReactDOM.findDOMNode(this).contains(e.target)) this.close();
    };

    removeListener = () => document.removeEventListener('click', this.handleOutsideClick, false);

    close = (data = this.state.data) => {
        const hints = [];
        this.removeListener();
        this.setState({data, hints});
    };

    setNewVal = (val) => {
        const {name, handleChange} = this.props;
        const data = this.state.data;

        data[name] = val;
        handleChange(val, name);
        this.close(data);
    };

    render(){

        const {name, hideLabel, labelParams, className, errors, readOnly} = this.props;
        const {data, hints} = this.state;

        const hasHints = !!hints.length;

        return(
            <div className={`dropdown dropdown--with-hint ${hasHints && 'open'}`}>
                <ControlledInput
                    name={name}
                    labelParams={labelParams}
                    className={className}
                    hideLabel={hideLabel}
                    onChange={this.handleChange}
                    onFocus={this.handleChange}
                    value={data}
                    readOnly={readOnly}
                />
                <Caret className='field__caret'/>
                { data[name] && errors && errors[name] && <Translate content={`errors.${errors[name]}`} className="field__error" /> }
                <div className="dropdown__body custom-scroll">
                    {hasHints && hints.map(e => (
                        <div key={e} className="dropdown__item">
                            <button onClick={() => this.setNewVal(e)}>{e}</button>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default FieldWithHint;