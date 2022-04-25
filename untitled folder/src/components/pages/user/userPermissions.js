import React, {Component, Fragment} from "react";
import Table from "../../helpers/table";
import dataFetch from "../../helpers/dataFetch";
import {fetchPermissions} from "../../../actions/dataFetching/accountData/fetchPermissions";
import PermissionTitle from "../../helpers/permissions/permissionTitle";
import UserPermissionTable from "./userPermissionTable";

const tableHeadActivities = [
    {
        key: 'time',
        translateTag: 'time',
        params: 'fit-content'
    },
    {
        key: 'type',
        translateTag: 'type',
        params: 'fit-content'
    },
    {
        key: 'desc',
        translateTag: 'info'
    },
    {
        key: 'id',
        translateTag: 'id',
        params: 'align-center fit-content'
    },
    {
        key: 'fee',
        translateTag: 'fee',
        params: 'fit-content'
    },
    {
        key: 'actions',
        params: 'align-right fit-content actions'
    }
];

class UserPermissions extends Component {

    state = {
        basicData: false,
        permissions: false,
        history: []
    };

    componentDidMount(){
        const {basicData, permissions, history} = this.props.data;
        this.setState({basicData, permissions, history});
    }

    render() {

        if(!this.state.permissions) return <span />;

        const {history, permissions} = this.state;
        const {owner, active, memo} = permissions;

        return (
            <div className="permissions">
                <UserPermissionTable
                    type="owner"
                    data={owner}
                    changeThreshold={this.changeThreshold}
                    deleteData={this.deleteActivePermission}
                />
                <UserPermissionTable
                    type="active"
                    data={active}
                    changeThreshold={this.changeThreshold}
                    deleteData={this.deleteActivePermission}
                />
                <UserPermissionTable type="memo" data={memo} />
                {
                    history.length > 0 && <Fragment>
                        <div className="permissions__header">
                            <PermissionTitle type="activity" />
                        </div>
                        <Table
                            className="permissions__history"
                            tableHead={tableHeadActivities}
                            rows={history}
                        />
                    </Fragment>
                }
            </div>
        )
    }
}

export default dataFetch({method: fetchPermissions})(UserPermissions);