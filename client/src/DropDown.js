import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Component } from "react";
import {DropdownButton, Dropdown}  from "react-bootstrap";

export default class DropDown extends Component {

handleSubmit = event => {
    event.preventDefault();

    axios.get(`http://localhost:8000/`+ event.target.value)
        .then(res => {
        console.log(res);
        console.log(res.data);
        })
    }

render() {

    return (
        <DropdownButton id="dropdown-basic-button" title="select coin">
            <Dropdown.Item href='*'>BNB/BUSD</Dropdown.Item>
        </DropdownButton>
    );
  }
}