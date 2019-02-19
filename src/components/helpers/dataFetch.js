import React, {Component} from "react";
import NoData from "./noData";

const dataFetch = (method, page) => ChildComponent => (
    class Wrapper extends Component{
        state = {
            loading: true,
            data: false
        };

        componentDidMount(){
            this.setData();
        }

        setData = () => method(this).then(data => this.setState({loading: false, data}));

        reset = () => this.setState({loading: true}, () => this.setData());

        render(){

            const {loading, data} = this.state;

            if(loading) return <span>Loading</span>;
            if(
                !data
                || (Array.isArray(data) && !data.length)
                || !Object.values(data).length
            ) return <NoData tag={page ? `empty.${page}` : 'empty.default'} />;

            return <ChildComponent data={data} {...this.props} reset={this.reset} />;
        }
    }
);

export default dataFetch;