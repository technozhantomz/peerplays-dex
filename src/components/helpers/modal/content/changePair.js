import React, {Component, Fragment} from 'react';
import FieldWithHint from "../../form/fieldWithHint";
import {dbApi} from "../../../../actions/nodes/index";
import {IconPairChange} from "../../../../svg/index";
import {getStorage} from "../../../../actions/storage/index";
import Dropdown from "../../form/dropdown";
import SelectHeader from "../../selectHeader";
import Close from "../decoration/close";
import {clearLayout} from "../../../../dispatch/index";
import ModalTitle from "../decoration/modalTitle";
import Translate from "react-translate-component";
import ModalButton from "../../buttons/modalButton";

const getSymbolsList = async () => dbApi('list_assets', ['', 100])
    .then(result => result.map(e => e.symbol));

class ChangePair extends Component{
    state = {
        pair: false,
        errors: false,
        selectedPair: '',
        recentPairs: []
    };

    componentDidMount(){
        const {base, quote} = this.props.pair;
        const pair = {
            base: base.symbol,
            quote: quote.symbol
        };
        const storageData = getStorage('exchanges');
        const selectedPair = storageData.active.split('_').join(' / ');
        const recentPairs = storageData.list;
        this.setState({pair, selectedPair, recentPairs})
    }

    handlePairChange = (val, name) => {
        const pair = this.state.pair;
        pair[name] = val;
        this.setState({pair, errors: false});

        if(pair.quote === pair.base) {
          this.setState({
            errors: {
              base: 'sameAsset'
            }
          });
        }
    };

    swipePair = () => {
        const {base, quote} = this.state.pair;

        const pair = {
            base: quote,
            quote: base
        };

        this.setState({pair: false}, () => this.setState({pair}));
    };

    selectNewPair = () => {
        if(this.state.errors) return;

        const {base, quote} = this.state.pair;
        const pair = `${quote}_${base}`;
        clearLayout();
        this.props.history.push(`/exchange/${pair}`);
    };

    selectOldPair = (selectedPair) => {
        const [quote, base] = selectedPair.split(' / ');
        this.setState({pair: false}, () => this.setState({pair: {quote, base}, selectedPair}));
    };

    render(){

        const {pair, selectedPair, recentPairs, errors} = this.state;

        return(
            <Fragment>
                <ModalTitle tag="pairSelect" />
                <div className="pair-selector">
                    {pair &&
                        <div className="pair-selector__inputs">
                            <FieldWithHint
                                name="quote"
                                hideLabel={true}
                                method={getSymbolsList}
                                handleChange={this.handlePairChange}
                                defaultVal={pair}
                                errors={errors}
                                readOnly
                            />

                            <button onClick={this.swipePair}>
                                <IconPairChange/>
                            </button>

                            <FieldWithHint
                                name="base"
                                hideLabel={true}
                                method={getSymbolsList}
                                handleChange={this.handlePairChange}
                                defaultVal={pair}
                                errors={errors}
                                readOnly
                            />
                        </div>
                    }
                    <Translate content="modal.pairSelect.recent" component="h3" className="pair-selector__subtitle" />
                    <Dropdown
                        btn={<SelectHeader
                            text={selectedPair}
                            className="with-bg"
                        />}
                        list={recentPairs.map((e, id) => <button key={id} onClick={() => this.selectOldPair(e)}>{e}</button>)}
                    />
                </div>
                <div className="modal__bottom">
                    <Close tag="close" />
                    <ModalButton tag="select" onClick={this.selectNewPair} />
                </div>
            </Fragment>
        )
    }
}

export default ChangePair