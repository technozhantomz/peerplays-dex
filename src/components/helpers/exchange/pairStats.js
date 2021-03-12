import React, {Component, Fragment} from 'react';
import Translate from "react-translate-component";
import {Caret, IconReload} from "../../../svg/index";
import ChangePair from "../modal/content/changePair";
import {setModal} from "../../../dispatch/layoutDispatch";

class PairStats extends Component{

    reload = () => this.props.update();

    changePair = () => {
        setModal(<ChangePair pair={this.props.pair} history={this.props.history} />)
    };

    render(){

        const {pair, data} = this.props;
        const {quote, base} = pair;
        const items = ['price', 'change', 'volume', 'feed', 'limit', 'margin'];

        return(
            <Fragment>
                <div className="pair-stats">
                    <button className="pair-stats__selector" onClick={this.changePair}>
                        <span className="pair-stats__base">{quote.symbol}</span>
                        <span className="pair-stats__quote"> / {base.symbol}</span>
                        <Caret className='field__caret'/>
                    </button>
                    {data && items.filter(el => data[el]).map(el => {

                        let {val, asset} = data[el];
                        let additionalClass = '';

                        if(el === 'change' && val !== 0){
                            const positive = val > 0;
                            additionalClass = ` clr--${positive ? 'positive' : 'negative'}`;
                            val = positive ? `+${val} %` : `${val} %`;
                        }

                        return (
                            <div key={el} className="pair-stats__item">
                                <div className={`pair-stats__value${additionalClass}`}>
                                    {val} {asset && <span className="pair-stats__item-asset">{asset}</span>}
                                </div>
                                <Translate
                                    content={`exchange.${el}`}
                                    component="div"
                                    className="pair-stats__item-title"
                                />
                            </div>
                        )
                    })}
                    <button onClick={this.reload} className="pair-stats__update">
                        <IconReload />
                    </button>
                </div>
            </Fragment>
        );
    }
}

export default PairStats;
