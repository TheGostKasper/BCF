import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { services } from './../services/rare-service';

class EditOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            order: {},
            items: []
        }

    }

    componentDidUpdate(nextProps) {
        if (this.props != nextProps) {
            this.setState({
                user: this.props.user,
                order: this.props.order,
                show: this.props.show
            }, () => {
                if (this.state.order)
                    services.getFiltered('order/orderItems', { _id: this.state.order._id })
                        .then((response) => {
                            this.setState({ items: response.data })
                        });
            });
        }
    }
    render() {
        const listItems = this.state.items.map((el, i) => {
            console.log(el);
            return <tr key={i}>
                <td>{i + 1}</td>
                <td>{i + 1}</td>
                <td>{el.name}</td>
            </tr>
        }

        )
        return (

            (this.state.show) ?
                <div className="modal fade info-modal" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title" id="myModalLabel">{this.state.order.orderNumber}</h4>
                            </div>
                            <div className="modal-body">
                                <div className="panel panel-default">
                                    <div className="panel-heading">User</div>
                                    <div className="panel-body">
                                        <h2>{this.state.user.name}</h2>
                                        <h2>{this.state.user.age}</h2>
                                        <h2>{this.state.user.phone}</h2>
                                        <h2>{this.state.user.email}</h2>
                                        <h2>{this.state.user.address}</h2>
                                    </div>
                                </div>
                                <div className="panel panel-default">
                                    <div className="panel-heading">Order Items</div>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>OrderNumber</th>
                                                <th>Cutsomer</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listItems}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                : <div></div>
        );
    }
}

export default EditOrder;
