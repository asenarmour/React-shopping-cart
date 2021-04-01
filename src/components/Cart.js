import React, { Component } from 'react'
import formatCurrency from '../util';

export default class Cart extends Component {
    
    render() {
        const {cartItems}=this.props;
        return (
            <div>
                {cartItems.length===0?<div className="cart cart-header">Cart is Empty</div>:
            <div className="cart cart-header">You have{cartItems.length} in the cart</div>    
            }
            <div className="cart">
                <div>
                <ul className="cart-items">
                    {cartItems.map((items)=>(
                        <li key={items._id}>
                            <div>
                                <img src={items.image} alt={items.title} />
                            </div>
                            <div>
                                {items.title}
                                <div className="right">
                                    {formatCurrency(items.price)}*{items.count}{" "}
                                <button className="button" onClick={()=>this.props.removeFromCart(items)} >Remove</button>
                                </div>
                                
                            </div>
                        </li>
                    )
                    )}
                </ul>
                </div>
                {cartItems.length!==0 &&(
                    <div className="cart">
                    <div className="total">
                        <div>
                            Total:{" "}
                            {formatCurrency(cartItems.reduce((a,c)=>a+c.price*c.count,0))}
                        </div>
                        <div className="button primary">
                            Proceed
                        </div>
                    </div>
                </div>
                )}
                
            </div>

            </div>
        )
    }
}
