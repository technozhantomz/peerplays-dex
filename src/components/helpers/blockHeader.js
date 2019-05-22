import React, {Component} from 'react';
import {getUserName} from "../../actions/account";
import {formDate} from "../../actions/formDate";

const blockHeaderItems = ['date', 'witness', 'previous', 'transactions'];

const formData = async (info) => ({
    date: formDate(info.timestamp),
    witness: await getUserName(info.witness),
    previous: info.previous,
    transactions: info.transactions.length
});

class BlockHeader extends Component{
    state = {
        data: ''
    };

    componentDidMount(){
        // console.log(this.props.data);
        this.getData(this.props.data);
    }

    componentWillReceiveProps(nextProps){
        if(this.props.num !== nextProps.num) this.getData(nextProps.data);
    }

    getData = (data) => formData(data).then(data => this.setState({data}));

    render(){

        let content = '';

        if(this.state.data){
            content = <div className="block-header__items">
                {blockHeaderItems.map(elem => (
                    <div key={elem} className="block-header__item">
                        <span>{elem.charAt(0).toUpperCase()}{elem.substr(1,)}</span>
                        <span>{this.state.data[elem]}</span>
                    </div>
                ))}
            </div>
        }

        return(
            <div className="block-header">
                <h2 className="block-header__num">Block #{this.props.num}</h2>
                {content}
            </div>
        )
    }
};

export default BlockHeader;