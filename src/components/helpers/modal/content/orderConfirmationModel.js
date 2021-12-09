import React, { Component, Fragment } from "react";
import Close from "../decoration/close";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const orderPreviewItems = ['Price', 'Quantity', 'Fee', 'Total'];

const modalData = async (info) => ({
    Price: info.price,
    Quantity: info.amount_to_receive,
    Fee: info.fee,
    Total: info.amount_to_sell
});

class OrderConfirmationModel extends Component {

    state = {
        data: ''
    };

    componentDidMount() {
        console.log("I am here for props", this.props);
        this.getData(this.props.data.defaultData);
    }

    getData = (data) => modalData(data).then(data => this.setState({ data }));

    handleMethod = () => {
        const { onSuccess } = this.props;
        onSuccess();
    };

    render() {
        let content = '';
        if (this.state.data) {
            content = <Fragment>
                <div className="modal__header">
                    <h5 className="modal__title"><strong>Order preview</strong></h5>
                </div>
                {orderPreviewItems.map(elem => (
                    <Grid container spacing={1} key={elem} style={{ justifyContent: "space-between" }}>
                        <Grid item xs={12} sm={3} >
                            <Typography variant="h6" >{elem.charAt(0).toUpperCase()}{elem.substr(1,)}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <Typography style={{ fontSize: '12px', textAlign: "right" }}>{this.state.data[elem]}</Typography>
                        </Grid>
                    </Grid>
                ))}
                <div className="modal__smbottom">
                    <button onClick={this.handleMethod} className="btn-round btn-round">Buy HIVE Now</button>
                    <Close />
                </div>
            </Fragment>
        }

        return (
            <div>
                {content}
            </div>
        )
    }
};

export default OrderConfirmationModel;
