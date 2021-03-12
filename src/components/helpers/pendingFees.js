import React from "react";
import {connect} from "react-redux";
import {MembershipTitle} from "./membershipTitle";
import {formDate} from "../../actions/formDate";

const PendingFees = ({name, maintenance}) => {
    let interval, nextMaintenance;

    if(maintenance){
        const date = new Date(maintenance.nextMaintenance).getTime() ;
        interval = maintenance.interval;
        nextMaintenance = formDate(date, ['date', 'month', 'year', 'time']);
    }

    return(
        <MembershipTitle title="pendingTitle" subtitle="pendingDesc" subtitleData={{name, nextMaintenance, interval}} />
    )
};

const mapStateToProps = state => ({maintenance: state.maintenance});

export default connect(mapStateToProps)(PendingFees);