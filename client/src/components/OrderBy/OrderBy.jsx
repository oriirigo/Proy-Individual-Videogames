import React from "react";
import { orderBy } from "../../actions";
import { useDispatch } from "react-redux";
import Styles from './OrderBy.module.css'

export default function Orderby() {
    const dispatch = useDispatch();

    const handleOrder = (e) => {
        switch (e.target.value) {
            case "A-Z": dispatch(orderBy((a, b) => { return a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1 })); break
            case "Z-A": dispatch(orderBy((a, b) => { return b.name.toUpperCase() < a.name.toUpperCase() ? -1 : 1 })); break
            case "Higher": dispatch(orderBy((a, b) => b.rating - a.rating)); break
            case "Lower": dispatch(orderBy((a, b) => a.rating - b.rating)); break
            default: break
        }
    };

    return (
    
        <div className={Styles.flexDistance}>
            <div className={Styles.cajaOrder}>
            <form>
                <select  className={Styles.selectOrder} name="Order" onChange={handleOrder} >
                    <option value="A-Z">Alphabetically A-Z</option>
                    <option value="Z-A">Alphabetically Z-A</option>
                    <option value="Higher">Higher Rating </option>
                    <option value="Lower">Lower Rating</option>
                </select>
            </form>
        </div>
        </div>
    )
};