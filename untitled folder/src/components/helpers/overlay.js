import React from 'react';
import {connect} from "react-redux";
import {store} from "../../index";

const closeOverlay = (elementToClose) => {
    [
        {type: `CLOSE_${elementToClose}`},
        {type: 'REMOVE_OVERLAY'},
    ].forEach(e => store.dispatch(e))
};

const Overlay = ({overlay}) => (
    <div
        className={`overlay${overlay ? ' open' : ''}`}
        onClick={() => closeOverlay(overlay)}
    />
);

const mapStateToProps = (state) => ({overlay: state.overlay});

export default connect(mapStateToProps)(Overlay);
