import moment from "moment";
import React, { Component } from "react";
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
import IRestaurantRepository from "../../Domain/Restaurant/Repository/IRestaurantRepository";
import { AddBusinessHourCommand } from "../../Domain/Restaurant/Type/Command/Repository/AddBusinessHourCommand";
import { AddTableCommand } from "../../Domain/Restaurant/Type/Command/Repository/AddTableCommand";
import { RemoveBookingCommand } from "../../Domain/Restaurant/Type/Command/Repository/RemoveBookingCommand";
import { GetBookingsQuery } from "../../Domain/Restaurant/Type/Query/Repository/GetBookingsQuery";
import { GetBusinessHoursQuery } from "../../Domain/Restaurant/Type/Query/Repository/GetBusinessHoursQuery";
import { GetRestaurantByGuidQuery } from "../../Domain/Restaurant/Type/Query/Repository/GetRestaurantByGuidQuery";
import { GetTablesQuery } from "../../Domain/Restaurant/Type/Query/Repository/GetTablesQuery";
import { Link } from "react-router-dom";

class RestaurantSetting extends Component<any, any> {
  private repository: IRestaurantRepository;

  constructor(props: any) {
    super(props);

    this.state = {
      businessHours: [],
      hourList: [],
      tableCode: "",
      tables: [],
      bookings: [],
      businessHourModal: false,
      tableModal: false,
      restaurantName: "",
      selectedBookingGuid: "",
      timeout: 300
    };

    this.addTable = this.addTable.bind(this);
    this.setTableCode = this.setTableCode.bind(this);
    this.toggleTableModal = this.toggleTableModal.bind(this);
    this.toggleBusinessHourModal = this.toggleBusinessHourModal.bind(this);
    this.generateHourList = this.generateHourList.bind(this);
    this.addBusinessHour = this.addBusinessHour.bind(this);
    this.setBusinessHourStartAt = this.setBusinessHourStartAt.bind(this);
    this.setBusinessHourEndAt = this.setBusinessHourEndAt.bind(this);
    this.setBusinessHourWeekday = this.setBusinessHourWeekday.bind(this);
    this.getBookings = this.getBookings.bind(this);
    this.deleteBooking = this.deleteBooking.bind(this);
    this.deleteBookingAction = this.deleteBookingAction.bind(this);
    this.setBookingGuid = this.setBookingGuid.bind(this);
  }

  public async componentDidMount(): Promise<void> {
    this.repository = await this.props.container.get(IRestaurantRepository);

    this.getRestaurantData(this.props.match.params.restaurantGuid);
    this.getBusinessHoursData(this.props.match.params.restaurantGuid);
    this.getTables(this.props.match.params.restaurantGuid);
    this.getBookings(this.props.match.params.restaurantGuid);
    this.generateHourList();
  }

  public generateHourList() {
    let hourList = [];

    for (let i = 0; i < 24; i++) {
      const hour = moment(i, "HH").format("HH:mm");
      hourList.push(hour);
    }

    this.setState({ hourList: hourList });
  }

  public async getRestaurantData(restaurantGuid: string) {
    const query = GetRestaurantByGuidQuery.create(restaurantGuid);

    const restaurant = await this.repository.getRestaurant(query);

    this.setState({ restaurantName: restaurant.Name });
  }

  public async getBusinessHoursData(restaurantGuid: string) {
    const query = GetBusinessHoursQuery.create(restaurantGuid);

    const businessHours = await this.repository.getBusinessHours(query);

    this.setState({ businessHours: businessHours });
  }

  public async addTable() {
    const restaurantGuid = this.props.match.params.restaurantGuid;
    const tableCode = this.state.tableCode;

    const command = AddTableCommand.create(tableCode, restaurantGuid);

    await this.repository.addTable(command);

    this.toggleTableModal();

    this.getTables(restaurantGuid);
  }

  public async addBusinessHour() {
    const restaurantGuid = this.props.match.params.restaurantGuid;
    const businessHourStartAt = this.state.businessHourStartAt;
    const businessHourEndAt = this.state.businessHourEndAt;
    const businessHourWeekday = this.state.businessHourWeekday;

    const command = AddBusinessHourCommand.create(
      businessHourWeekday,
      businessHourStartAt,
      businessHourEndAt,
      restaurantGuid
    );

    await this.repository.addBusinessHour(command);

    this.toggleBusinessHourModal();

    this.getBusinessHoursData(restaurantGuid);
  }

  public async deleteBookingAction() {
    const bookingGuid = this.state.selectedBookingGuid;

    await this.deleteBooking(bookingGuid);
  }

  public setTableCode(e: any) {
    let value = e.target.value;

    this.setState({ tableCode: value });
  }

  public setBookingGuid(e: any) {
    let value = e.target.value;

    this.setState({ selectedBookingGuid: value });
  }

  public setBusinessHourStartAt(e: any) {
    let value = e.target.value;

    this.setState({ businessHourStartAt: value });
  }

  public setBusinessHourEndAt(e: any) {
    let value = e.target.value;

    this.setState({ businessHourEndAt: value });
  }

  public setBusinessHourWeekday(e: any) {
    let value = e.target.value;

    this.setState({ businessHourWeekday: value });
  }

  public async getTables(restaurantGuid: string) {
    const query = GetTablesQuery.create(restaurantGuid);

    const tables = await this.repository.getTables(query);

    this.setState({ tables: tables });
  }

  public async getBookings(restaurantGuid: string) {
    const query = GetBookingsQuery.create(restaurantGuid);

    const bookings = await this.repository.getBookings(query);

    this.setState({ bookings: bookings });
  }

  public async deleteBooking(bookingGuid: string) {
    const command = RemoveBookingCommand.create(bookingGuid);

    await this.repository.removeBooking(command);

    this.getBookings(this.props.match.params.restaurantGuid);
  }

  public toggleTableModal() {
    this.setState((prevState: any) => ({
      tableModal: !prevState.tableModal
    }));
  }

  public toggleBusinessHourModal() {
    this.setState((prevState: any) => ({
      businessHourModal: !prevState.businessHourModal
    }));
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
                        <Label>Name</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <p className="form-control-static">
                          {this.state.restaurantName}
                        </p>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="business-hours">Business Hours</Label>
                      </Col>
                      <Col md="9">
                        <Input
                          type="select"
                          name="business-hours"
                          id="business-hours"
                          multiple
                        >
                          {this.state.businessHours.map(
                            (businessHour: any, index: number) => (
                              <option key={index} value={businessHour.Guid}>
                                {businessHour.Weekday} :{" "}
                                {businessHour.StartHour} -{" "}
                                {businessHour.EndHour}
                              </option>
                            )
                          )}
                        </Input>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3" />
                      <Col md="9">
                        <Button
                          onClick={this.toggleBusinessHourModal}
                          size="sm"
                          color="primary"
                        >
                          <i className="fa fa-dot-circle-o" /> Add business hour
                        </Button>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="list-tables">List of tables</Label>
                      </Col>
                      <Col md="9">
                        <Input
                          type="select"
                          name="list-tables"
                          id="list-tables"
                          multiple
                        >
                          {this.state.tables.map(
                            (table: any, index: number) => (
                              <option key={index} value={table.Guid}>
                                {table.Code}
                              </option>
                            )
                          )}
                        </Input>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3" />
                      <Col md="9">
                        <Button
                          onClick={this.toggleTableModal}
                          size="sm"
                          color="primary"
                        >
                          <i className="fa fa-dot-circle-o" /> Add table
                        </Button>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="list-bookings">List of Bookings</Label>
                      </Col>
                      <Col md="9">
                        <Input
                          onChange={this.setBookingGuid}
                          type="select"
                          name="list-bookings"
                          id="list-bookings"
                          multiple
                        >
                          {this.state.bookings.map(
                            (booking: any, index: number) => (
                              <option key={index} value={booking.Guid}>
                                {booking.Name} | {booking.Email} |{" "}
                                {booking.BookingDate} {booking.BookingTime} |{" "}
                              </option>
                            )
                          )}
                        </Input>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3" />
                      <Col md="9">
                        <Button
                          onClick={this.deleteBookingAction}
                          size="sm"
                          color="primary"
                        >
                          <i className="fa fa-dot-circle-o" /> Remove Booking
                        </Button>{" "}
                        <Link
                          to={`/admins/restaurants/${
                            this.props.match.params.restaurantGuid
                          }/bookings/${this.state.selectedBookingGuid}`}
                        >
                          <Button size="sm" color="primary">
                            Edit selected booking
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
          isOpen={this.state.tableModal}
          toggle={this.toggleTableModal}
          className={this.props.className}
          backdrop={true}
        >
          <ModalHeader toggle={this.toggleTableModal} />
          <ModalBody>
            <Form className="form-horizontal">
              <FormGroup>
                <Label for="table-code">Table Code</Label>{" "}
                <Input
                  type="text"
                  name="table-code"
                  id="table-code"
                  onChange={this.setTableCode}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addTable}>
              Add Table
            </Button>
            <Button color="secondary" onClick={this.toggleTableModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        <Modal
          isOpen={this.state.businessHourModal}
          toggle={this.toggleBusinessHourModal}
          className={this.props.className}
          backdrop={true}
        >
          <ModalHeader toggle={this.toggleBusinessHourModal} />
          <ModalBody>
            <Form className="form-horizontal">
              <FormGroup>
                <Label for="weekday-list">Add business hour</Label>{" "}
                <Input
                  onChange={this.setBusinessHourWeekday}
                  type="select"
                  name="weekday-list"
                  id="weekday-list"
                >
                  <option value="">Select the Weekday</option>
                  <option value="monday">Monday</option>
                  <option value="tuesday">Tuesday</option>
                  <option value="wednesday">Wednesday</option>
                  <option value="thursday">Thursday</option>
                  <option value="friday">Friday</option>
                  <option value="saturday">Saturday</option>
                  <option value="sunday">Sunday</option>
                </Input>
                <Label for="start-hour">Start at</Label>{" "}
                <Input
                  onChange={this.setBusinessHourStartAt}
                  type="select"
                  name="start-hour"
                  id="start-hour"
                >
                  <option value="">Business hour start at</option>
                  {this.state.hourList.map((hour: string, index: number) => (
                    <option key={index} value={hour}>
                      {hour}
                    </option>
                  ))}
                </Input>
                <Label for="end-hour">End at</Label>{" "}
                <Input
                  onChange={this.setBusinessHourEndAt}
                  type="select"
                  name="end-hour"
                  id="start-hour"
                >
                  <option value="">Business hour end at</option>
                  {this.state.hourList.map((hour: string, index: number) => (
                    <option key={index} value={hour}>
                      {hour}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addBusinessHour}>
              Add Business Hour
            </Button>
            <Button color="secondary" onClick={this.toggleBusinessHourModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default RestaurantSetting;
