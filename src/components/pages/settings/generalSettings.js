import React, {Component} from 'react';
import {defaultLocales} from "../../../params/defaultLocales";
import {setLocale} from "../../../actions/locale/setLocale";
import Switcher from "../../helpers/switcher";
import {editStorage, getStorage} from "../../../actions/storage/index";
import CheckBox from "../../helpers/form/checkbox";
import Translate from "react-translate-component";
import Dropdown from "../../helpers/form/dropdown";
import SelectHeader from "../../helpers/selectHeader";
import Input from "../../helpers/form/input";

class GeneralSettings extends Component {

    state = {
        formData: {
            faucet: 'https://faucet.bitshares.eu/onboarding',
            notifications: true
        },
        activeLang: '',
        darkTheme: true,
    };

    componentDidMount(){
        const {language, darkTheme, notifications} = getStorage('settings');

        const formData = {
            faucet: 'https://faucet.bitshares.eu/onboarding',
            notifications
        };

        this.setState({
            activeLang: defaultLocales.find(e => e.type === language).title,
            darkTheme,
            formData
        });
    }

    changeLocale = ({title, type}) => {
        setLocale(type);
        editStorage('settings', {language: type});
        this.setState({activeLang: title});
    };

    handleNotifications = (val) => {

        const formData = {...this.state.formData};

        const id = 'notifications';

        formData[id] = val;

        editStorage('settings', {[id]: val});
        this.setState({formData});
    };

    themeChange = (e) => {
        const id = 'darkTheme';
        const val = e.target.checked;
        const changes = {[id]: val};
        editStorage('settings', changes);
        this.setState(changes);
    };

    render(){

        const {formData, activeLang, darkTheme} = this.state;

        const localesList = defaultLocales.map((el, id) => <button key={id} onClick={() => this.changeLocale(el)}>{el.title}</button>);

        return (
            <div className="settings">
                <Translate content="general.interface" component="h2" />
                <Dropdown
                    btn={<SelectHeader labelTag="general.language" text={activeLang} />}
                    list={localesList}
                />
                <Switcher
                    id="themeSwitch"
                    label="general.theme"
                    selected={darkTheme}
                    handleChange={this.themeChange}
                />
                <Translate content="general.notifications" component="h2" />
                <CheckBox
                    id="notifications"
                    labelTag="general.transferNotifications"
                    value={formData}
                    onChange={this.handleNotifications}
                />
                <Translate content="general.faucet" component="h2" />
                <Input
                    name="faucet"
                    comment={true}
                    value={formData}
                    disabled
                />
            </div>
        );
    }
}

export default GeneralSettings;