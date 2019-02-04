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

class GeneralSettings extends Component {

    state = {
        formData: {
            faucet: 'https://faucet.bitshares.eu/onboarding'
        },
        activeLang: '',
        whiteTheme: true,
        notifications: true,
    };

    componentDidMount(){
        const {language, whiteTheme, notifications} = getStorage('settings');
        this.setState({
            activeLang: defaultLocales.find(e => e.type === language).title,
            whiteTheme,
            notifications
        });
    }

    changeLocale = ({title, type}) => {
        setLocale(type);
        editStorage('settings', {language: type});
        this.setState({activeLang: title});
    };

    handleNotifications = (e) => this.handleChanges('notifications', e.target.checked);
    changeAutoSelect = (e) => this.handleChanges('whiteTheme', e.target.checked);

    handleChanges = (name, val) => {
        const changes = {[name]: val};
        editStorage('settings', changes);
        this.setState(changes);
    };

    render(){

        const {formData, activeLang, whiteTheme, notifications} = this.state;

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