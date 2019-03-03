import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import "./App.css";
import DisplayWordData from "./DisplayWordData";

class App extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      search: "",
      data: []
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };
  handleSubmit = event => {
    const url = "http://localhost:3000/";

    let data = { search_item: this.state.search };
    if (data.search_item === "") {
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(function(response) {
          return response.json();
        })
        .then(data => {
          console.log(data);
          if (data.type === "success") {
            this.setState({ data: data.data });
          } else {
            this.setState({ data: [] });
            alert("Error code 400, please check logs for more details");
          }
        })
        .catch(error => console.error("Error:", error));
    } else {
      const url = "http://localhost:3000/search";
      fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(function(response) {
          return response.json();
        })
        .then(data => {
          console.log(data);
          if (data.type === "success") {
            this.setState({ data: data.data });
          } else {
            alert("Error code 400, please check logs for more details");
          }
        })
        .catch(error => console.error("Error:", error));
    }
    event.preventDefault();
  };
  render() {
    return (
      <div>
        <div>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">HPE Assignment</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="https://github.com/alakhsingh/hpe_assignment/wiki">
                    About
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="https://github.com/alakhsingh/hpe_assignment">
                    GitHub
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
        <div className="searchDiv">
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Input
                type="text"
                name="search"
                id="search"
                placeholder="Enter a word to search or search blank"
                value={this.state.search}
                onChange={this.handleChange}
              />
            </FormGroup>
            <Button color="primary" className="search">
              Search
            </Button>{" "}
          </Form>
        </div>
        <div className="display">
          {this.state.data.map(n => {
            return <DisplayWordData value={n} />;
          })}
        </div>
      </div>
    );
  }
}

export default App;
