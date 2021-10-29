/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import React from "react";
import { it, expect } from "@jest/globals";

import { render } from "@testing-library/react";

import { ExampleApi, CartApi } from "../../src/client/api";
import { Provider } from "react-redux";
import { initStore } from "../../src/client/store";

import { Router } from "react-router";
import { createMemoryHistory } from "history";
import { Helmet } from "react-helmet";

import { Application } from "../../src/client/Application";

describe("Проверка Helmet", () => {
  const api = new ExampleApi("");
  const cart = new CartApi();
  cart.setState({});
  const store = initStore(api, cart);

  it("title должен быть Shopping cart", () => {
    const history = createMemoryHistory({
      initialEntries: ["/cart"],
      initialIndex: 0,
    });
    const application = (
      <Router history={history}>
        <Provider store={store}>
          <Application />
        </Provider>
      </Router>
    );

    render(application);
    const helmet = Helmet.peek();
    expect(helmet.title).toEqual("Shopping cart — Example store");
  });

  it("title должен быть Catalog", () => {
    const history = createMemoryHistory({
      initialEntries: ["/catalog"],
      initialIndex: 0,
    });
    const application = (
      <Router history={history}>
        <Provider store={store}>
          <Application />
        </Provider>
      </Router>
    );

    render(application);
    const helmet = Helmet.peek();
    expect(helmet.title).toEqual("Catalog — Example store");
  });
  it("title должен быть Welcome", () => {
    const history = createMemoryHistory({
      initialEntries: ["/"],
      initialIndex: 0,
    });
    const application = (
      <Router history={history}>
        <Provider store={store}>
          <Application />
        </Provider>
      </Router>
    );

    render(application);
    const helmet = Helmet.peek();
    expect(helmet.title).toEqual("Welcome — Example store");
  });
  it("title должен быть Delivery", () => {
    const history = createMemoryHistory({
      initialEntries: ["/delivery"],
      initialIndex: 0,
    });
    const application = (
      <Router history={history}>
        <Provider store={store}>
          <Application />
        </Provider>
      </Router>
    );

    render(application);
    const helmet = Helmet.peek();
    expect(helmet.title).toEqual("Delivery — Example store");
  });
  it("title должен быть Contacts", () => {
    const history = createMemoryHistory({
      initialEntries: ["/contacts"],
      initialIndex: 0,
    });
    const application = (
      <Router history={history}>
        <Provider store={store}>
          <Application />
        </Provider>
      </Router>
    );

    render(application);
    const helmet = Helmet.peek();
    expect(helmet.title).toEqual("Contacts — Example store");
  });
});
