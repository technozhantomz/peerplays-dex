import React from 'react';
import {connect} from "react-redux";

const Modal = (props) => (
    <div className={`modal${props.modal ? ' open custom-scroll' : ''}`}>
        {props.modal}
    </div>
);

const mapStateToProps = (state) => ({modal: state.layout.modal});

export default connect(mapStateToProps)(Modal);