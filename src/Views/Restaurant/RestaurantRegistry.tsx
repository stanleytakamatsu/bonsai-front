import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row
} from "reactstrap";
import { Restaurant } from "../../Domain/Restaurant/Entity/Restaurant";
import IRestaurantRepository from "../../Domain/Restaurant/Repository/IRestaurantRepository";
import { RegisterRestaurantCommand } from "../../Domain/Restaurant/Type/Command/Repository/RegisterRestaurantCommand";

class RestaurantRegistry extends Component<any, any> {
  private repository: IRestaurantRepository;

  constructor(props: any) {
    super(props);

    this.state = {
      restaurantName: "",
      restaurantList: [],
      selectedRestaurantGuid: "",
      modal: false,
      timeout: 300
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.setRestaurantNameOnState = this.setRestaurantNameOnState.bind(this);
    this.registerRestaurant = this.registerRestaurant.bind(this);
    this.getRestaurantList = this.getRestaurantList.bind(this);
    this.selectRestaurant = this.selectRestaurant.bind(this);
  }

  public async componentDidMount(): Promise<void> {
    this.repository = await this.props.container.get(IRestaurantRepository);

    this.getRestaurantList();
  }

  public async registerRestaurant() {
    const restaurantName = this.state.restaurantName;

    const command = RegisterRestaurantCommand.create(restaurantName);

    await this.repository.registerRestaurant(command);

    this.toggleModal();

    this.getRestaurantList();
  }

  public async getRestaurantList() {
    const restaurants: Restaurant[] = await this.repository.getRestaurants();

    this.setState({ restaurantList: restaurants });
  }

  public toggleModal() {
    this.setState((prevState: any) => ({
      modal: !prevState.modal
    }));
  }

  public setRestaurantNameOnState(e: any) {
    let value = e.target.value;

    this.setState({ restaurantName: value });
  }

  public selectRestaurant(e: any) {
    let value = e.target.value;

    this.setState({ selectedRestaurantGuid: value });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Container>
          <Row className="justify-content-center">
            <Col>
              <Card>
                <CardHeader>
                  <strong>{this.state.name}</strong>
                </CardHeader>
                <CardBody>
                  <Form className="form-horizontal">
                    <FormGroup row>
                      <Col md="3">
                        <Label>Register a new restaurant.</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Button
                          size="md"
                          onClick={this.toggleModal}
                          color="primary"
                        >
                          <i className="fa fa-dot-circle-o" /> Register a new
                          restaurant
                        </Button>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="select-restaurant">
                          Select a restaurant
                        </Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input
                          onChange={this.selectRestaurant}
                          type="select"
                          name="select-restaurant"
                          id="select-restaurant"
                        >
                          <option value="">Select the restaurant</option>
                          {this.state.restaurantList.map(
                            (restaurant: any, index: number) => (
                              <option key={index} value={restaurant.Guid}>
                                {restaurant.Name}
                              </option>
                            )
                          )}
                        </Input>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3" />
                      <Col xs="12" md="9">
                        <Link
                          to={
                            "/admins/restaurants/" +
                            this.state.selectedRestaurantGuid
                          }
                        >
                          <Button size="md" color="success">
                            <i className="fa fa-dot-circle-o" /> Edit selected
                            restaurant
                          </Button>
                        </Link>
                      </Col>
                    </FormGroup>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggleModal}
          className={this.props.className}
          backdrop={true}
        >
          <ModalHeader toggle={this.toggleModal} />
          <ModalBody>
            <Form className="form-horizontal">
              <FormGroup>
                <Label for="restaurant-name">Restaurant Name</Label>{" "}
                <Input
                  type="text"
                  name="restaurant-name"
                  id="restaurant-name"
                  onChange={this.setRestaurantNameOnState}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.registerRestaurant}>
              Register
            </Button>
            <Button color="secondary" onClick={this.toggleModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default RestaurantRegistry;
