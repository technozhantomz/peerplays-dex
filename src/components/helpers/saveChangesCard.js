import {defaultToken} from "../../params/networkParams";
import React from "react";

const SaveChangesCard = ({show, fee, cancelFunc, saveFunc}) => {
    return(
        <div className={`save-changes ${show ? 'shown' : ''}`}>
            <div className="container">
                <div className="save-changes__fee">
                    <span>Commission</span>
                    <span>{fee} {defaultToken}</span>
                </div>
                <div className="save-changes__btn-wrapper">
                    <button onClick={cancelFunc}>CANCEL</button>
                    <button className="btn-round" onClick={saveFunc}>Save Changes</button>
                </div>
            </div>
        </div>
    )
};

export default SaveChangesCard;