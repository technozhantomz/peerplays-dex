import React, {Component} from 'react';
import {formDate} from "../../actions/formDate";
import Translate from "react-translate-component";
import Dropdown from "./form/dropdown";
import SelectHeader from "./selectHeader";

class BackupItem extends Component {

    state = {
        item: this.props.actionsList[0],
    };

    changeBackup = item => this.setState({item});

    render(){

        const selectedItem = this.state.item;
        const {type, data, actionsList} = this.props;
        const translate = `reBackup.${type}`;
        const translateWithType = `${translate}.${selectedItem.type}`;

        let lastBackup, showComment;

        if(type === 'backup'){
            showComment = true;
            lastBackup = data[selectedItem.backupDate];
        }

        return(
            <div className="backup__item">
                <Translate content={`${translate}.title`} component="h2" />
                <Dropdown
                    btn={<SelectHeader
                        labelTag={`${translate}.selectTitle`}
                        text={<Translate content={`${translateWithType}.text`} />}
                    />}
                    list={actionsList.map((e, id) => (
                        <Translate
                            key={id}
                            component="button"
                            content={`${translate}.${e.type}.text`}
                            onClick={() => this.changeBackup(e)}
                        />
                    ))}
                    comment={showComment && <Translate content={lastBackup ? `${translate}.lastBackup` : `${translate}.needBackup`} lastBackup={lastBackup && formDate(lastBackup)} />}
                />
                <Translate content={`${translateWithType}.desc`} className="backup__desc" component="p" />
                <Translate content={`${translate}.title`} component="button" className="btn-round" onClick={selectedItem.action} />
            </div>
        )
    }
};

export default BackupItem;