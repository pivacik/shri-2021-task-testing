/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import React from "react";
import { it, expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { Router } from "react-router";
import { createMemoryHistory } from "history";
import { ExampleApi, CartApi } from "../../src/client/api";
import { Provider } from "react-redux";

import { Application } from "../../src/client/Application";
import { initStore } from "../../src/client/store";

describe("Отображение страницы /home", () => {
  it('по адресу / должна открываться страница "Home" с приветствем', () => {
    const history = createMemoryHistory({
      initialEntries: ["/"],
      initialIndex: 0,
    });

    const basename = "/hw/store";

    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const store = initStore(api, cart);
    const application = (
      <Router history={history}>
        <Provider store={store}>
          <Application />
        </Provider>
      </Router>
    );

    const { getByText } = render(application);

    expect(getByText(/welcome to example store!/i).textContent).toEqual(
      "Welcome to Example store!"
    );
    // screen.logTestingPlaygroundURL();
  });
});

//  --CATALOG--

describe("Отображение страницы /catalog", () => {
  it('по адресу /catalog должна открываться страница "Catalog"', () => {
    const history = createMemoryHistory({
      initialEntries: ["/catalog"],
      initialIndex: 0,
    });

    const basename = "/hw/store";

    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const store = initStore(api, cart);
    const application = (
      <Router history={history}>
        <Provider store={store}>
          <Application />
        </Provider>
      </Router>
    );

    const { getByRole } = render(application);

    expect(getByRole("heading", { name: /catalog/i }).textContent).toEqual(
      "Catalog"
    );
    // screen.logTestingPlaygroundURL();
  });
});

// --DELIVERY--
describe("Отображение страницы /delivery", () => {
  it('по адресу /delivery должна открываться страница "Delivery"', () => {
    const history = createMemoryHistory({
      initialEntries: ["/delivery"],
      initialIndex: 0,
    });

    const basename = "/hw/store";

    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const store = initStore(api, cart);
    const application = (
      <Router history={history}>
        <Provider store={store}>
          <Application />
        </Provider>
      </Router>
    );

    const { getByRole } = render(application);

    expect(getByRole("heading", { name: /delivery/i }).textContent).toEqual(
      "Delivery"
    );
    // screen.logTestingPlaygroundURL();
  });
});

// --CONTACTS--
describe("Отображение страницы /contacts", () => {
  it('по адресу /contacts должна открываться страница "Contacts"', () => {
    const history = createMemoryHistory({
      initialEntries: ["/contacts"],
      initialIndex: 0,
    });

    const basename = "/hw/store";

    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const store = initStore(api, cart);
    const application = (
      <Router history={history}>
        <Provider store={store}>
          <Application />
        </Provider>
      </Router>
    );

    const { getByRole } = render(application);

    expect(getByRole("heading", { name: /contacts/i }).textContent).toEqual(
      "Contacts"
    );
    // screen.logTestingPlaygroundURL();
  });
});
// --SHOPPING CART--
describe("Отображение страницы /cart", () => {
  it('по адресу /cart должна открываться страница "Shopping Cart"', () => {
    const history = createMemoryHistory({
      initialEntries: ["/cart"],
      initialIndex: 0,
    });

    const basename = "/hw/store";

    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const store = initStore(api, cart);
    const application = (
      <Router history={history}>
        <Provider store={store}>
          <Application />
        </Provider>
      </Router>
    );

    const { getByRole } = render(application);

    expect(
      getByRole("heading", { name: /shopping cart/i }).textContent
    ).toEqual("Shopping cart");
    // screen.logTestingPlaygroundURL();
  });
});
