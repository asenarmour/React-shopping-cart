import React, { Component } from 'react'
import formatCurrency from '../util';
import Fade from 'react-reveal/Fade';
import { connect } from 'react-redux';
import { removeFromCart } from '../actions/cartActions';

class Cart extends Component {
    
    constructor(props){
        super(props)
        this.state={showCheckout:false,
        email:"",
        name:"",
        address:""
        }
    }

    handleInput=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

    createOrder=(e)=>{
        e.preventDefault();
        const order={
            name:this.state.name,
            email:this.state.email,
            address:this.state.address,
            cartItems:this.props.cartItems
        }
        this.props.createOrder(order);
    }

    render() {
        const {cartItems}=this.props;
        return (
            <div>
                {cartItems.length===0?<div className="cart cart-header">Cart is Empty</div>:
            <div className="cart cart-header">You have{cartItems.length} in the cart</div>    
            }
            <div className="cart">
                <Fade left cascade>
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
                </Fade>
                {cartItems.length!==0 &&(
                    <div>
                    <div className="cart">
                    <div className="total">
                        <div>
                            Total:{" "}
                            {formatCurrency(cartItems.reduce((a,c)=>a+c.price*c.count,0))}
                        </div>
                        <button onClick={()=>{this.setState({showCheckout:true})}} className="button primary">
                            Proceed
                        </button>
                    </div>
                </div>
                {this.state.showCheckout &&  (
                    <Fade right cascade>
                    <div className="cart">
                    <form onSubmit={this.createOrder}>
                        <ul className="form-container">
                            <li>
                                <label>Email</label>
                                <input name="email" type="email" required onChange={this.handleInput} />
                            </li>
                            <li>
                                <label>Name</label>
                                <input name="name" type="text" required onChange={this.handleInput} />
                            </li>
                            <li>
                                <label>Address</label>
                                <input name="address" type="text" required onChange={this.handleInput} />
                            </li>
                            <li>
                                <button  className="button primary" type="submit">Checkout</button>
                            </li>
                        </ul>
                    </form>
                    </div>
                    </Fade>
                )} 
                </div>               
                )}
                
            </div>

            </div>
        )
    }
}

export default connect(
    (state) => ({
      cartItems: state.cart.cartItems,
    }),
    { removeFromCart}
  )(Cart);