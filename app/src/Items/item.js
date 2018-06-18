import React, { Component } from 'react';
import { services } from './../services/rare-service';

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
    }
    getInit = () => {
        services.getFilteredItems({ subCategory_id: "5b266e3f3e65de262ca984a0" })
            .then((res) => {
                if (res.data) {
                    this.setState({
                        items: res.data
                    })
                }
                else alert(res.message);
            })
            .catch((err) => { console.log(err) });
    }
    componentWillMount = () => {
        this.getInit();
    }
    render() {
        const listItems = this.state.items.map((el, i) =>
            <tr key={el._id}>
                <td>{i + 1}</td>
                <td><img src={el.image} alt={el.name} className="itemImg" /></td>
                <td>{el.name}</td>
                <td>{el.volume}</td>
                <td>{el.quantity}</td>
                <td>{el.price} EGP</td>
            </tr>
        )

        return (
            <div className="container">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Volume</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listItems}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Item;
