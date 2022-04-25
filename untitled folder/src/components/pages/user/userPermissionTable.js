import React, {Component, Fragment} from "react";
import ActionsBtn from "../../helpers/buttons/actionsBtn";
import PermissionTitle from "../../helpers/permissions/permissionTitle";
import Translate from "react-translate-component";
import Dropdown from "../../helpers/form/dropdown";
import SelectHeader from "../../helpers/selectHeader";
import Table from "../../helpers/table";
import {getAccountData, getStore} from "../../../actions/store";

const tableBasic = {
    key: 'key',
    translateTag: 'key',
};

const tableDefault = [
    tableBasic,
    null,
    {
        key: 'actions',
        params: 'align-right fit-content actions'
    }
];

const tableTypes = {
    number: {
        key: 'weight',
        translateTag: 'weight',
        params: 'align-center fit-content'
    },
    percent: {
        key: 'percent',
        translateTag: 'weight',
        params: 'align-center fit-content'
    },
};

const memoHeader = [tableBasic];

const typesList = [
    {tag: 'Number', name: 'number'},
    {tag: '%', name: 'percent'}
];

const formThresholdList = (type, best) => {
    const result = [];
    for(let i = 1; i <= best; i++){
        const value = i;
        const name = type !== 'percent' ? i : i / best * 100 + '%';
        result.push({ name, value });
    }
    return result;
};

class UserPermissionTable extends Component{
    state = {
        tableHead: false,
        tableType: typesList[0],
        tableData: [],
        threshold: false,
        isLoggedInUser: false
    };

    componentDidMount(){ 
        this.checkLoggedUser();
        this.setTable(this.props)
     }

    checkLoggedUser = () => {
        const loggedInUserID = getAccountData().id;
        const userID = getStore().pageData.id;

        return loggedInUserID === userID ? this.setState({isLoggedInUser:true}) : false;
    } 

    setTable = (props) => {

        const tableData = props.data.list;
        const {isLoggedInUser} = this.state;

        if(props.type === 'memo') {
            this.setState({
                tableHead: memoHeader,
                tableData
            });
            return;
        }

        const dataWithActions = tableData.map(el => {
            el.actions = <div className="actions__wrapper">
               {isLoggedInUser && 
                <ActionsBtn
                    actionsList={[
                        <button onClick={() => this.deleteKey(el.key)}>Delete</button>
                    ]}
                />
                }
            </div>;
            return el;
        });

        let threshold = this.state.threshold;

        if(!threshold){
            threshold = {
                best: 0,
                list: [],
                selected: 0
            };

            threshold.best = props.data.list.reduce((acc, el) => el.weight > acc ? el.weight : acc, 0);
            threshold.selected = props.data.threshold;
        }

        const tableType = this.state.tableType;

        this.setState({tableData: dataWithActions, threshold}, () => this.changeHead(tableType));
    };

    changeHead = (tableType) => {
        const threshold = {...this.state.threshold};
        const tableHead = [...tableDefault];

        tableHead[1] = tableTypes[tableType.name];
        threshold.list = formThresholdList(tableType.name, threshold.best);

        this.setState({tableHead, tableType, threshold});
    };

    changeThreshold = (num) => {
        const threshold = {...this.state.threshold};
        threshold.selected = num;
        this.setState({threshold});
        this.props.changeThreshold(this.props.type, num);
    };

    deleteKey = (key) => {
        const oldTableData = [...this.state.tableData];
        let elToDelete = {
            key,
            keyType: '',
            type: this.props.type
        };
        const tableData = oldTableData.filter(el => {
            if(el.key === key){
                elToDelete.keyType = el.type;
                return false;
            }
            return true;
        });

        this.props.deleteData(elToDelete);
        this.setState({tableData});
    };

    render(){

        const {tableHead, tableType, tableData, threshold} = this.state;
        const type = this.props.type;
        const isNotMemo = type !== 'memo';

        if(!tableHead) return <span />;

        return(
            <Fragment>
                <div className="permissions__header">
                    <PermissionTitle type={type} />
                    {isNotMemo && <div className="permissions__filter-wrapper">
                        <Translate content='permissions.threshold' />
                        <Dropdown
                            btn={<SelectHeader
                                text={tableType.tag}
                            />}
                            list={typesList.map((e, id) => (
                                <button key={id} onClick={() => this.changeHead(e)}>{e.tag}</button>
                            ))}
                        />
                        <div className="permissions__number">
                            {threshold.list[threshold.selected - 1].name}
                        </div>
                    </div>}
                </div>
                {
                    !!tableData.length && <Table
                        tableHead={tableHead}
                        rows={tableData}
                    />
                }
            </Fragment>
        );
    }
}

export default UserPermissionTable;