import _ from "lodash";
import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
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
import { MakeBookingCommand } from "../../Domain/Restaurant/Type/Command/Repository/MakeBookingCommand";
import { GetAvailableHoursQuery } from "../../Domain/Restaurant/Type/Query/Repository/GetAvailableHoursQuery";
import { GetAvailableTablesQuery } from "../../Domain/Restaurant/Type/Query/Repository/GetAvailableTablesQuery";

class Booking extends Component<any, any> {
  private repository: IRestaurantRepository;

  constructor(props: any) {
    super(props);

    this.state = {
      restaurantName: "",
      restaurantList: [],
      availableHours: [],
      availableTables: [],
      selectedRestaurantGuid: "",
      selectedTableGuid: "",
      bookingDate: "",
      bookingHour: "",
      userName: "",
      userEmail: "",
      modal: false,
      timeout: 300
    };

    this.getRestaurantList = this.getRestaurantList.bind(this);
    this.selectRestaurant = this.selectRestaurant.bind(this);
    this.selectBookingDate = this.selectBookingDate.bind(this);
    this.selectBookingHour = this.selectBookingHour.bind(this);
    this.getAvailableTables = this.getAvailableTables.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.selectTable = this.selectTable.bind(this);
    this.makeBooking = this.makeBooking.bind(this);
    this.setUserEmail = this.setUserEmail.bind(this);
    this.setUserName = this.setUserName.bind(this);
  }

  public async componentDidMount(): Promise<void> {
    this.repository = await this.props.container.get(IRestaurantRepository);

    this.getRestaurantList();
  }

  public async getRestaurantList() {
    const restaurants: Restaurant[] = await this.repository.getRestaurants();

    this.setState({ restaurantList: restaurants });
  }

  public selectRestaurant(e: any) {
    let value = e.target.value;

    const prevState = this.state;
    const newState = {
      ...{
        selectedRestaurantGuid: value,
        bookingDate: "",
        availableHours: [],
        availableHour: "",
        availableTables: []
      },
      prevState
    };

    this.setState(newState);
  }

  public async selectBookingDate(e: any) {
    const bookingDate = e.target.value;
    const restaurantGuid = this.state.selectedRestaurantGuid;

    const query = GetAvailableHoursQuery.create(restaurantGuid, bookingDate);

    const availableHours: [string] = await this.repository.getAvailableHours(
      query
    );

    const prevState = this.state;
    const newState = {
      ...{
        bookingDate: bookingDate,
        availableHours: availableHours,
        availableHour: "",
        availableTables: []
      },
      prevState
    };

    this.setState(newState);
  }

  public async selectBookingHour(e: any) {
    const bookingHour = e.target.value;
    const restaurantGuid = this.state.selectedRestaurantGuid;

    const prevState = this.state;
    const newState = {
      ...{ bookingHour: bookingHour, availableTables: [] },
      prevState
    };

    this.setState(newState);

    this.getAvailableTables(restaurantGuid, bookingHour);
  }

  public async getAvailableTables(restaurantGuid: string, bookingHour: string) {
    const bookingDatetime = `${this.state.bookingDate} ${bookingHour}`;
    const query = GetAvailableTablesQuery.create(
      restaurantGuid,
      bookingDatetime
    );

    const tables = await this.repository.getAvailableTables(query);

    const prevState = this.state;
    const newState = { ...{ availableTables: tables }, prevState };

    this.setState(newState);
  }

  public async selectTable(e: any) {
    const tableGuid = e.target.value;
    const prevState = this.state;
    const newState = {
      ...{ selectedTableGuid: tableGuid },
      prevState
    };

    this.setState(newState);
  }

  public async setUserName(e: any) {
    const userName = e.target.value;
    const prevState = this.state;
    const newState = {
      ...{ userName: userName },
      prevState
    };

    this.setState(newState);
  }

  public async setUserEmail(e: any) {
    const userEmail = e.target.value;
    const prevState = this.state;
    const newState = {
      ...{ userEmail: userEmail },
      prevState
    };

    this.setState(newState);
  }

  public toggleModal() {
    this.setState((prevState: any) => ({
      modal: !prevState.modal
    }));
  }

  public async makeBooking() {
    const restaurantGuid = this.state.selectedRestaurantGuid;
    const selectedTableGuid = this.state.selectedTableGuid;
    const bookingDatetime = `${this.state.bookingDate} ${
      this.state.bookingHour
    }`;
    const userName = this.state.userName;
    const userEmail = this.state.userEmail;
    const command = MakeBookingCommand.create(
      restaurantGuid,
      selectedTableGuid,
      bookingDatetime,
      userName,
      userEmail
    );

    await this.repository.makeBooking(command);

    this.toggleModal();
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Container>
          <Row className="justify-content-center">
            <Col>
              <Card>
                <CardHeader>
                  <strong>Booking</strong>
                </CardHeader>
                <CardBody>
                  <Form className="form-horizontal">
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
                      <Col md="3">
                        <Label htmlFor="date-input">Select a date</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input
                          type="date"
                          id="date-input"
                          name="date-input"
                          placeholder="date"
                          onChange={this.selectBookingDate}
                          disabled={!this.state.selectedRestaurantGuid}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="booking-hours">Available hours</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input
                          onChange={this.selectBookingHour}
                          type="select"
                          name="booking-hours"
                          id="booking-hours"
                          disabled={_.isEmpty(this.state.availableHours)}
                        >
                          <option value="">Select a hour</option>
                          {this.state.availableHours.map(
                            (availableHour: any, index: number) => (
                              <option key={index} value={availableHour}>
                                {availableHour}
                              </option>
                            )
                          )}
                        </Input>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="booking-tables">Available Tables</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input
                          type="select"
                          name="booking-tables"
                          id="booking-tables"
                          onChange={this.selectTable}
                          disabled={_.isEmpty(this.state.availableTables)}
                        >
                          <option value="">Select table</option>
                          {this.state.availableTables.map(
                            (availableTable: any, index: number) => (
                              <option key={index} value={availableTable.Guid}>
                                {availableTable.Code}
                              </option>
                            )
                          )}
                        </Input>
                      </Col>
                    </FormGroup>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Col md="3" />
                  <Col xs="12" md="9">
                    <Button
                      size="md"
                      color="primary"
                      onClick={this.toggleModal}
                      disabled={
                        !this.state.selectedTableGuid ||
                        !this.state.bookingDate ||
                        !this.state.bookingHour ||
                        !this.state.selectedRestaurantGuid
                      }
                    >
                      <i className="fa fa-dot-circle-o" /> Make booking
                    </Button>
                  </Col>
                </CardFooter>
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
                <Label for="user-name">Your Name</Label>{" "}
                <Input
                  type="text"
                  name="user-name"
                  id="user-name"
                  onChange={this.setUserName}
                />
              </FormGroup>
              <FormGroup>
                <Label for="user-email">Your email</Label>{" "}
                <Input
                  type="email"
                  name="user-email"
                  id="user-email"
                  onChange={this.setUserEmail}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={this.makeBooking}
              disabled={!this.state.userName || !this.state.userEmail}
            >
              Book
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

export default Booking;
