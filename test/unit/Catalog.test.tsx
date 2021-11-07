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
import { initStore, productsLoaded } from "../../src/client/store";
import { CartApi, ExampleApi } from "../../src/client/api";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import { ProductShortInfo } from "../../src/common/types";
import { AxiosResponse } from "axios";
import { first } from "rxjs";

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
  it("В каталоге должны отображаться товары, список которых приходит с сервера", async () => {
    const api = new ExampleApi("");
    api.getProducts = () =>
      Promise.resolve<AxiosResponse<ProductShortInfo[], any>>(
        mockResponse([
          { id: 123, name: "chair", price: 200 },
          { id: 124, name: "pants", price: 1000 },
        ])
      );
    const cart = new CartApi();
    const store = initStore(api, cart);
    const component = (
      <MemoryRouter>
        <Provider store={store}>
          <Catalog />
        </Provider>
      </MemoryRouter>
    );
    const { getByText, getAllByTestId } = render(component);
    await waitForElementToBeRemoved(() => getByText(/loading/i));

    const firstProd = getAllByTestId(123)[0];
    const secondProd = getAllByTestId(124)[0];
    expect(firstProd).toMatchSnapshot();
    expect(secondProd).toMatchSnapshot();
  });
});
