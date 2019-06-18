import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ContainerFactory } from "./Core/Container/Factory/ContainerFactory";
import { Strategies } from "./Core/Container/Strategies";
import { IContainerService } from "./Core/Container/IContainerService";
import { IApplicationConfiguration } from "./Config/IApplicationConfiguration";
import { ApplicationConfiguration } from "./Config/ApplicationConfiguration";
import { ContainerRegistry } from "./Config/ContainerRegistry";

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);
const RestaurantSetting = React.lazy(() =>
  import("./Views/Restaurant/RestaurantSetting")
);
const RestaurantRegistry = React.lazy(() =>
  import("./Views/Restaurant/RestaurantRegistry")
);
const RestaurantEditBooking = React.lazy(() =>
  import("./Views/Restaurant/EditBooking")
);

const Booking = React.lazy(() => import("./Views/Customer/Booking"));

async function booting() {
  const container: IContainerService = await ContainerFactory.create(
    Strategies.INVERSIFY
  );

  container.register<IApplicationConfiguration>(
    IApplicationConfiguration,
    () => {
      return new Promise<IApplicationConfiguration>(async resolve => {
        let config = new ApplicationConfiguration();

        await config.loadConfig();

        resolve(config);
      });
    }
  );

  const containerRegistry: ContainerRegistry = new ContainerRegistry(container);

  await containerRegistry.registerAll();

  ReactDOM.render(
    <BrowserRouter>
      <React.Suspense fallback={loading()}>
        <Switch>
          <Route
            path="/"
            exact={true}
            render={props => <App container={container} {...props} />}
          />
          <Route
            path="/booking"
            exact={true}
            render={props => <Booking container={container} {...props} />}
          />
          <Route
            path="/admins/restaurants"
            exact={true}
            render={props => (
              <RestaurantRegistry container={container} {...props} />
            )}
          />
          <Route
            path="/admins/restaurants/:restaurantGuid"
            exact={true}
            render={props => (
              <RestaurantSetting container={container} {...props} />
            )}
          />
          <Route
            path="/admins/restaurants/:restaurantGuid/bookings/:bookingGuid"
            exact={true}
            render={props => (
              <RestaurantEditBooking container={container} {...props} />
            )}
          />
        </Switch>
      </React.Suspense>
    </BrowserRouter>,
    document.getElementById("root")
  );
}

booting();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
