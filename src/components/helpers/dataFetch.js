import React, {Component} from "react";
import NoData from "./noData";

const dataFetch = ({method, reset, page, disableNextProps}) => ChildComponent => (
    class Wrapper extends Component{
        state = {
            loading: true,
            data: false
        };

        componentDidMount(){
            this.setData();
        }

        componentWillReceiveProps(){
            const context = this;
            !disableNextProps && setTimeout(() => context.setData());
        }

        setData = () => method(this).then(data => this.setState({loading: false, data}));

        reset = () => reset ? reset(this) : this.setState({loading: true}, () => this.setData());

        render(){

            const {loading, data} = this.state;

            if(loading) return <span>Loading</span>;
            if(
                !data
                || (Array.isArray(data) && !data.length)
                || !Object.values(data).length
            ) return <NoData tag={page ? `emptyPage.${page}` : 'emptyPage.default'} />;

            return <ChildComponent {...this.props} data={data} reset={this.reset} />;
        }
    }
);

export default dataFetch;