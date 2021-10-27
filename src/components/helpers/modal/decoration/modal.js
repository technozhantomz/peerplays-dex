import React from 'react';
import {connect} from "react-redux";
import Grid from '@material-ui/core/Grid';

const Modal = (props) => (
    <div>
        <Grid item xs={12} className={`modal${props.modal ? ' open custom-scroll' : ''}`}>
            {props.modal}
        </Grid>
    </div>
);

const mapStateToProps = (state) => ({modal: state.layout.modal});

export default connect(mapStateToProps)(Modal);