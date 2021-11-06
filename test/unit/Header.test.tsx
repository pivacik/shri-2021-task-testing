/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import React from "react";
import { it, expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import events from "@testing-library/user-event";
import { ExampleApi, CartApi } from "../../src/client/api";
import { Provider } from "react-redux";
import { initStore } from "../../src/client/store";

import { Router } from "react-router";
import { createMemoryHistory } from "history";

import { Application } from "../../src/client/Application";

describe("Переходы по страницам", () => {
  const history = createMemoryHistory({
    initialEntries: ["/"],
    initialIndex: 0,
  });
  const api = new ExampleApi("");
  const cart = new CartApi();
  const store = initStore(api, cart);

  it("Ссылка на Example Store ведет на ручку /", () => {
    const application = (
      <Router history={history}>
        <Provider store={store}>
          <Application />
        </Provider>
      </Router>
    );

    const { getByRole } = render(application);
    const homeLink = getByRole("link", {
      name: /example store/i,
    });
    const href = homeLink.getAttribute("href");
    expect(href).toEqual("/");
  });
  it("Ссылка на Catalog ведет на ручку /catalog", () => {
    const application = (
      <Router history={history}>
        <Provider store={store}>
          <Application />
        </Provider>
      </Router>
    );

    const { getByRole } = render(application);
    const catalogLink = getByRole("link", {
      name: /catalog/i,
    });
    const href = catalogLink.getAttribute("href");
    expect(href).toEqual("/catalog");
  });
  it("Ссылка на Delivery ведет на ручку /delivery", () => {
    const application = (
      <Router history={history}>
        <Provider store={store}>
          <Application />
        </Provider>
      </Router>
    );

    const { getByRole } = render(application);
    const deliveryLink = getByRole("link", {
      name: /delivery/i,
    });
    const href = deliveryLink.getAttribute("href");
    expect(href).toEqual("/delivery");
  });
  it("Ссылка на Contacts ведет на ручку /contacts", () => {
    const application = (
      <Router history={history}>
        <Provider store={store}>
          <Application />
        </Provider>
      </Router>
    );

    const { getByRole } = render(application);
    const contactsLink = getByRole("link", {
      name: /contacts/i,
    });
    const href = contactsLink.getAttribute("href");
    expect(href).toEqual("/contacts");
  });
  it("Ссылка на Cart ведет на ручку /cart", () => {
    const application = (
      <Router history={history}>
        <Provider store={store}>
          <Application />
        </Provider>
      </Router>
    );

    const { getByRole } = render(application);
    const cartLink = getByRole("link", {
      name: /cart/i,
    });
    const href = cartLink.getAttribute("href");
    expect(href).toEqual("/cart");
  });
});
