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
  Row
} from "reactstrap";
import IRestaurantRepository from "../../Domain/Restaurant/Repository/IRestaurantRepository";
import { GetAvailableHoursQuery } from "../../Domain/Restaurant/Type/Query/Repository/GetAvailableHoursQuery";
import { GetAvailableTablesQuery } from "../../Domain/Restaurant/Type/Query/Repository/GetAvailableTablesQuery";
import { GetBookingQuery } from "../../Domain/Restaurant/Type/Query/Repository/GetBookingQuery";
import { EditBookingCommand } from "../../Domain/Restaurant/Type/Command/Repository/EditBookingCommand";

class EditBooking extends Component<any, any> {
  private repository: IRestaurantRepository;

  constructor(props: any) {
    super(props);

    this.state = {
      restaurantName: "",
      restaurantList: [],
      availableHours: [],
      availableTables: [],
      bookingData: {
        name: "",
        email: "",
        date: "",
        hour: "",
        table: ""
      },
      selectedRestaurantGuid: "",
      selectedTableGuid: "",
      selectedBookingGuid: "",
      bookingDate: "",
      bookingHour: "",
      timeout: 300
    };

    this.selectBookingDate = this.selectBookingDate.bind(this);
    this.selectBookingHour = this.selectBookingHour.bind(this);
    this.getAvailableTables = this.getAvailableTables.bind(this);
    this.selectTable = this.selectTable.bind(this);
    this.getBooking = this.getBooking.bind(this);
    this.editBooking = this.editBooking.bind(this);
  }

  public async componentDidMount(): Promise<void> {
    this.repository = await this.props.container.get(IRestaurantRepository);

    this.getBooking(
      this.props.match.params.restaurantGuid,
      this.props.match.params.bookingGuid
    );

    this.setRestaurantGuid(this.props.match.params.restaurantGuid);
    this.setBookingGuid(this.props.match.params.bookingGuid);
  }

  public setRestaurantGuid(restaurantGuid: string) {
    this.setState({ selectedRestaurantGuid: restaurantGuid });
  }

  public setBookingGuid(bookingGuid: string) {
    this.setState({ selectedBookingGuid: bookingGuid });
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

  public async getBooking(restaurantGuid: string, bookingGuid: string) {
    const query = GetBookingQuery.create(restaurantGuid, bookingGuid);

    const booking = await this.repository.getBooking(query);

    this.setState({
      bookingData: {
        name: booking.Name,
        email: booking.Email,
        date: booking.BookingDate,
        hour: booking.BookingTime,
        table: booking.Table
      }
    });
  }

  public async editBooking() {
    const command = EditBookingCommand.create(
      this.state.selectedRestaurantGuid,
      this.state.selectedBookingGuid,
      this.state.selectedTableGuid,
      `${this.state.bookingDate} ${this.state.bookingHour}`
    );

    await this.repository.editBooking(command);

    this.props.history.push(
      `/admins/restaurants/${this.state.selectedRestaurantGuid}`
    );
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
                        <Label>Name</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Label>{this.state.bookingData.name}</Label>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label>Email</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Label>{this.state.bookingData.email}</Label>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label>Table</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Label>{this.state.bookingData.table}</Label>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label>Date time</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Label>
                          {this.state.bookingData.date}{" "}
                          {this.state.bookingData.hour}
                        </Label>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="date-input">Select a new date</Label>
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
                      onClick={this.editBooking}
                      size="md"
                      color="primary"
                      disabled={
                        !this.state.selectedTableGuid ||
                        !this.state.bookingDate ||
                        !this.state.bookingHour ||
                        !this.state.selectedRestaurantGuid
                      }
                    >
                      <i className="fa fa-dot-circle-o" /> Save edit
                    </Button>
                  </Col>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default EditBooking;
