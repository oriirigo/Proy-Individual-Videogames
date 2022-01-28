import React from "react";
import { orderBy } from "../../actions";
import { useDispatch } from "react-redux";

export default function Orderby() {
    const dispatch = useDispatch();

    const handleOrder = (e) => {
        switch (e.target.value) {
            case "Ascendant": dispatch(orderBy((a, b) => b.name.length - a.name.length)); break
            case "Descendant": dispatch(orderBy((a, b) => a.name.length - b.name.length)); break
            case "A-Z": dispatch(orderBy((a, b) => { return a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1 })); break
            case "Z-A": dispatch(orderBy((a, b) => { return b.name.toUpperCase() < a.name.toUpperCase() ? -1 : 1 })); break
            case "Higher": dispatch(orderBy((a, b) => b.rating - a.rating)); break
            case "Lower": dispatch(orderBy((a, b) => a.rating - b.rating)); break
            default: break
        }
    };

    return (
        <div>
            <h5 >Order by:</h5>
            <form>
                <select  name="Order" onChange={handleOrder} >
                    <option value="Ascendant">Ascendant</option>
                    <option value="Descendant">Descendant</option>
                    <option value="A-Z">Alphabetically A-Z</option>
                    <option value="Z-A">Alphabetically Z-A</option>
                    <option value="Higher">Higher Rating </option>
                    <option value="Lower">Lower Rating</option>
                </select>
            </form>
        </div>
    )
};