import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Col, Row } from "reactstrap";
import "./App.css";

class App extends Component<any, any> {
  public async componentDidMount(): Promise<void> {}

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <Row>
            <Col lg={6}>
              <Link to="/booking">
                <Button color="primary">For Customers</Button>
              </Link>
            </Col>
            <Col lg={6}>
              <Link to="/admins/restaurants">
                <Button color="primary">For restaurant owners</Button>
              </Link>
            </Col>
          </Row>
        </header>
      </div>
    );
  }
}

export default App;
