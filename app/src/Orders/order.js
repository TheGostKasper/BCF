import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { services } from './../services/rare-service';

import DisplayInfo from './display-info';

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            currentOrder: {}
        }
    }
    getInit = () => {
        services.getFiltered('order/filterBy', {})
            .then((res) => {
                if (res.data) {
                    this.setState({
                        orders: res.data
                    })
                }
                else alert(res.message);
            })
            .catch((err) => { console.log(err) });
    }
    updateOrder = (el) => {
        this.setState({
            currentOrder: el
        });
    }
    confirmOrder = (el) => {
        this.setState({
            currentOrder: el
        });
    }
    deleteOrder = () => {
        let cpy_order = this.state.orders;
        services.deleteOrder(this.state.currentOrder.order).then((data) => {
            _.remove(cpy_order, (ele) => {
                return ele.order._id === this.state.currentOrder._id
            });
            this.setState({
                orders: cpy_order
            });
            document.getElementById("cancle").click();
        }).catch(err => console.log(err));
    }
    componentWillMount = () => {
        this.getInit();
    }
    render() {
        const listItems = this.state.orders.map((el, i) =>
            <tr key={el.order._id}>
                <td>{i + 1}</td>
                <td>{el.order.orderNumber}</td>
                <td>{el.user.name}</td>
                <td>{el.user.phone}</td>
                <td>{el.user.address}</td>
                <td>{el.order.total} EGP</td>
                <td>{new Date(el.order.created_at).toLocaleDateString()}</td>
                <td>
                    <div>
                        <Link className="btn btn-info" to={`/orders/edit/${el.order._id}`} > <span className="glyphicon glyphicon-cog" aria-hidden="true"></span></Link>
                        <button type="button" className="btn btn-danger" data-toggle="modal" data-target=".bs-example-modal-sm" onClick={this.confirmOrder.bind(this, el)}><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></button>
                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target=".info-modal" onClick={e => this.updateOrder(el, e)}><span className="glyphicon glyphicon-info-sign" aria-hidden="true"></span></button>
                    </div>
                </td>
            </tr>
        )

        return (

            <div className="">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>OrderNumber</th>
                            <th>Cutsomer</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Total</th>
                            <th>Creation Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listItems}
                    </tbody>
                </table>
                <div className="modal fade bs-example-modal-sm" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
                    <div className="modal-dialog modal-sm" role="document">
                        <div className="modal-content">
                            <div className="modal-header bg-warning">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title" id="myModalLabel">Warning</h4>
                            </div>
                            <div className="modal-body">
                                Sure, you want to delete this order?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" id="cancle" data-dismiss="modal">Cancle</button>
                                <button type="button" className="btn btn-danger" onClick={this.deleteOrder.bind(this, this.state.currentOrder)}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
                <DisplayInfo user={this.state.currentOrder.user}
                    order={this.state.currentOrder.order}
                    show={Object.keys(this.state.currentOrder).length > 0} />

                {/* {(Object.keys(this.state.currentOrder).length > 0) ?
                    <DisplayInfo user={this.state.currentOrder.user} order={this.state.currentOrder.order} />
                    : ""} */}
            </div>
        );
    }
}

export default Item;
