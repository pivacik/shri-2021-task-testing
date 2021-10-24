/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import React from "react";
import { it } from "@jest/globals";

import { render } from "@testing-library/react";
import events from "@testing-library/user-event";
import { ExampleApi, CartApi } from "../../src/client/api";
import { Provider } from "react-redux";
import { initStore } from "../../src/client/store";

import { Router } from "react-router";
import { createMemoryHistory } from "history";

import axios from "axios";

import { CartItem, CheckoutFormData } from "../../src/common/types";
import { Cart } from "../../src/client/pages/Cart";

import { Store } from "redux";

jest.mock("axios");
describe("Проверка оформления Cart", () => {
  const formData = {
    name: "name",
    phone: "89005553535",
    address: "Howw",
  } as CheckoutFormData;

  it("При валидных данных в форме, в Submit передаются введенные данные", async () => {
    const mockGet = jest.spyOn(axios, "get");
    const mockPost = jest.spyOn(axios, "post");
    mockPost.mockResolvedValue({
      data: { id: 42 },
    });
    mockGet.mockResolvedValue({ data: [{ id: 1, name: "Pants", price: 222 }] });

    const cartItem = {
      count: 1,
      name: "Pants",
      price: 222,
    } as CartItem;

    const api = new ExampleApi("");
    const cart = new CartApi();
    cart.setState({ 1: cartItem });
    const store = initStore(api, cart);

    const history = createMemoryHistory({
      initialEntries: ["/cart"],
      initialIndex: 0,
    });
    const application = (
      <Router history={history}>
        <Provider store={store}>
          <Cart />
        </Provider>
      </Router>
    );

    const { getByText, getByRole } = render(application);

    const nameInput = getByRole("textbox", { name: /name/i });
    const phoneInput = getByRole("textbox", { name: /phone/i });
    const addressInput = getByRole("textbox", { name: /address/i });
    const checkoutBtn = getByRole("button", { name: /checkout/i });

    events.type(nameInput, formData.name);
    events.type(phoneInput, formData.phone);
    events.paste(addressInput, formData.address);
    events.click(checkoutBtn);

    await (function (ms) {
      return new Promise((res) => setTimeout(() => res(1), ms));
    })(100);

    const orderText = getByText(/order # has been successfully completed\./i);
    const orderId = getByText(/42/i);
    expect(orderText).toBeTruthy();
    expect(orderId).toBeTruthy();
  });
});
