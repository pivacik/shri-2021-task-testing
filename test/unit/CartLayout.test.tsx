/**
 * @jest-environment jsdom
 */
import React from "react";

import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { Catalog } from "../../src/client/pages/Catalog";
import { initStore } from "../../src/client/store";
import { CartApi, ExampleApi } from "../../src/client/api";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import { CartItem, ProductShortInfo } from "../../src/common/types";
import { AxiosResponse } from "axios";
import { Cart } from "../../src/client/pages/Cart";
import { container } from "webpack";

function mockResponse<T>(data: T): AxiosResponse<T, any> {
  return {
    status: 200,
    statusText: "OK",
    headers: {},
    config: {},
    data,
  };
}
describe("1", () => {
  it("Верстка страницы корзины с товарами внутри", async () => {
    const api = new ExampleApi("");
    const product1: CartItem = {
      name: "Pants",
      price: 1102,
      count: 3,
    };
    const product2: CartItem = {
      name: "Chair",
      price: 200,
      count: 1,
    };

    const cart = new CartApi();
    cart.setState({ 1: product1, 2: product2 });
    const store = initStore(api, cart);
    const component = (
      <MemoryRouter>
        <Provider store={store}>
          <Cart />
        </Provider>
      </MemoryRouter>
    );
    const { container } = render(component);
    const cartLayout = container.querySelector(".Cart");
    expect(cartLayout).toMatchSnapshot();
    screen.logTestingPlaygroundURL();
  });
});
