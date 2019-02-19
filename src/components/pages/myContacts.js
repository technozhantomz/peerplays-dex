import React, {Component} from 'react';
import {ContactItem} from "../helpers/contactItem";
import {IconBlackList, IconStar, IconTrash} from "../../svg";
import ActionsBtn from "../helpers/actionsBtn";
import Switcher from "../helpers/switcher";
import {ActionsPanel} from "../helpers/actionsPanel";

// 0 - BlackList, 1 - Normal, 2 - Favourite

const dataContacts = [
    {
        name: 'Deveedaas Nandi',
        id: '1.2.177038',
        list: 1
    },
    {
        name: 'Phakamile Sikali',
        id: '1.2.177039',
        list: 0
    },
    {
        name: 'Iruka Akuchi',
        id: '1.2.177037',
        list: 1
    },
    {
        name: 'Mok Kwang-Hyun',
        id: '1.2.177036',
        list: 2
    },
    {
        name: 'Paromita Haque',
        id: '1.2.177035',
        list: 1
    },
    {
        name: 'Gans D',
        id: '1.2.177034',
        list: 2
    }
];

class MyContacts extends Component {
    state = {
        contacts: dataContacts,
        showBlackList: false
    };

    addFavourite = (id) => {
        let contacts = this.state.contacts;
        contacts[contacts.findIndex(item => item.id === id)].list = 2;
        this.setState({contacts});
    };

    addBlackList = (id) => {
        let contacts = this.state.contacts;
        contacts[contacts.findIndex(item => item.id === id)].list = 0;
        this.setState({contacts});
    };

    removeContact = (id) => {
        let contacts = this.state.contacts.filter(item => item.id !== id);
        this.setState({contacts})
    };

    addGeneral = (id) => {
        let contacts = this.state.contacts;
        contacts[contacts.findIndex(item => item.id === id)].list = 1;
        this.setState({contacts});
    };

    buttons = (id) => ({
        remove: <button onClick={() => this.removeContact(id)}><IconTrash/></button>,
        toBlackList: <button onClick={() => this.addBlackList(id)}><IconBlackList/></button>,
        toFavourite: <button className="mask" onClick={() => this.addFavourite(id)}><IconStar/></button>,
        removeFavourite: <button className="mask" onClick={() => this.addGeneral(id)}><IconStar/></button>,
        removeBlackList: <button className="mask" onClick={() => this.addGeneral(id)}><IconBlackList/></button>
    });

    favouriteActions = (id) => <ActionsPanel
        hover={[
            this.buttons(id).remove,
            this.buttons(id).toBlackList
        ]}
        instant={[this.buttons(id).removeFavourite]}
    />;

    generalActions = (id) => <ActionsPanel
        hover={[
            this.buttons(id).remove,
            this.buttons(id).toBlackList
        ]}
        instant={[this.buttons(id).toFavourite]}
    />;

    blackListActions = (id) => <ActionsPanel
        hover={[this.buttons(id).remove]}
        instant={[this.buttons(id).removeBlackList]}
    />;

    handleBlackList = () => this.setState({showBlackList: !this.state.showBlackList});

    render() {
        const {contacts, showBlackList} = this.state;

        const favList = contacts.filter(contact => contact.list === 2);
        const genList = contacts.filter(contact => contact.list === 1);
        const blackList = contacts.filter(contact => contact.list === 0);

        return (
            <div className="container page">
                <div className="page__header-wrapper">
                    <h1 className="page__title">My Contacts</h1>
                </div>
                <div className="contacts__info">
                    <div className="contacts__count">
                        {contacts.length} {contacts.length > 1 ? 'Contacts' : 'Contact'}
                    </div>
                    <div className="blacklisted">
                        <Switcher
                            id="blackListSwitch"
                            label="contacts.blacklistedSwitcher"
                            selected={showBlackList}
                            handleChange={this.handleBlackList}
                        />
                    </div>
                    <ActionsBtn
                        actionsList={[
                            <button>Reset Settings</button>,
                            <button>Body 2</button>,
                            <button>Body 2</button>
                        ]}
                    />
                </div>
                <span className="contacts__lists">
                    {
                        Boolean(favList.length) &&
                        <div className="contacts__favourite">
                            <div className="title">Favorite CONTACTS</div>
                            {favList.map(item => <ContactItem data={item}
                                                              actions={this.favouriteActions(item.id)}/>)}
                        </div>
                    }
                    {
                        Boolean(genList.length) &&
                        <div>
                            <div className="title">CONTACTS</div>
                            {genList.map((item, index) => <ContactItem data={item}
                                                                       actions={this.generalActions(item.id)}/>)}
                        </div>
                    }
                    {
                        Boolean(blackList.length && showBlackList) &&
                        <div>
                            <div className="title">Black List CONTACTS</div>
                            {blackList.map((item, index) => <ContactItem data={item}
                                                                         actions={this.blackListActions(item.id)}/>)}
                        </div>
                    }
                </span>
            </div>
        )
    }
}

export default MyContacts;