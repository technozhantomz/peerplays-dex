import React from 'react';
import {connect} from "react-redux";
import {clearLayout} from "../../dispatch/layoutDispatch";

const Overlay = ({overlay}) => (
    <div
        className={`overlay${overlay ? ' open' : ''}`}
        onClick={clearLayout}
    />
);

const mapStateToProps = (state) => ({overlay: state.layout.overlay});

export default connect(mapStateToProps)(Overlay);
