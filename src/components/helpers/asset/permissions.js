import React, {Component} from "react";
import {CardHeader} from "../cardHeader"
import Translate from "react-translate-component";
import {IconCheck} from "../../../svg/index";

class Permissions extends Component {
    render() {
        const {title, permissions} = this.props;
        return (
            <div className="fee-pool card">
                <CardHeader title={`block.${title}.title`}/>
                <div className="asset-stats__content">
                    {
                        permissions.map((item, index) =>
                            <div className="permissions__list" key={index}>
                                <IconCheck/>
                                <Translate className="" content={`block.${title}.${item}`}/>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}

export default Permissions;