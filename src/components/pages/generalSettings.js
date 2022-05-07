import React, {Component} from 'react';
import {defaultLocales} from "../../params/defaultLocales";
import {setLocale} from "../../actions/locale/setLocale";
import Switcher from "../helpers/switcher";
import {editStorage, getStorage} from "../../actions/storage";
import CheckBox from "../helpers/checkbox";
import Translate from "react-translate-component";
import Dropdown from "../helpers/dropdown";
import SelectHeader from "../helpers/selectHeader";
import Input from "../helpers/input";
import {faucetUrl} from "../../params/networkParams";

class GeneralSettings extends Component {

    state = {
        formData: {
            faucet: faucetUrl
        },
        activeLang: '',
        whiteTheme: true,
        advancedMode: false,
        notifications: true,
    };

    componentDidMount(){
        const {language, whiteTheme, advancedMode, notifications} = getStorage('settings');
        this.setState({
            activeLang: defaultLocales.find(e => e.type === language).title,
            whiteTheme,
            advancedMode,
            notifications
        });
    }

    changeLocale = ({title, type}) => {
        setLocale(type);
        editStorage('settings', {language: type});
        this.setState({activeLang: title});
    };

    handleNotifications = (e) => this.handleChanges('notifications', e.target.checked);
    changeAutoSelect = (e) => this.handleChanges('whiteTheme', e);
    changeAdvancedMode = (e) => this.handleChanges('advancedMode', e);

    handleChanges = (name, val) => {
        const changes = {[name]: val};
        editStorage('settings', changes);
        this.setState(changes);
    };

    render(){

        const {formData, activeLang, whiteTheme, advancedMode, notifications} = this.state;

        const localesList = defaultLocales.map((el, id) => <button key={id} onClick={() => this.changeLocale(el)}>{el.title}</button>);

        return (
            <div className="settings">
                <Translate content="general.interface" component="h2" />
                <Dropdown
                    btn={<SelectHeader
                        labelTag="general.language"
                        text={activeLang}
                        className="with-bg with-border"
                    />}
                    list={localesList}
                />
                <Switcher
                    id="themeSwitch"
                    label="general.theme"
                    selected={whiteTheme}
                    handleChange={this.changeAutoSelect}
                />
                <Switcher
                    id="modeSwitch"
                    label="general.mode"
                    selected={advancedMode}
                    handleChange={this.changeAdvancedMode}
                />
                <Translate content="general.notifications" component="h2" />
                <CheckBox
                    id="filter"
                    labelTag="general.transferNotifications"
                    value={notifications}
                    onChange={this.handleNotifications}
                />
                <Translate content="general.faucet" component="h2" />
                <Input
                    name="faucet"
                    labelTag="general.faucetURL"
                    comment="general.faucetComment"
                    className="with-bg with-border"
                    value={formData}
                    disabled
                />
            </div>
        );
    }
}

export default GeneralSettings;