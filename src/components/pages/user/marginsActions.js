import React from "react";
import {IconBarChart, IconCreate, IconDelete} from "../../../svg";

export const MarginsActions = ({hover}) => (
    <div className="contact__icons actions__wrapper">
        <div className="actions__on-hover">
            {hover.map(el => el)}
        </div>
    </div>
    // <div className="margins">
    //     <div className="margins__actions">
    //         <button onClick={() => console.log('IconBarChart')}><IconBarChart/></button>
    //         <button onClick={() => console.log('IconCreate')}><IconCreate/></button>
    //         <button onClick={() => console.log('IconDelete')}><IconDelete/></button>
    //     </div>
    // </div>
);