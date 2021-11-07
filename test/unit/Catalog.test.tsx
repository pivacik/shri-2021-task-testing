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
import { CartItem, ProductShortInfo } from "../../src/common/types";
import { AxiosResponse } from "axios";
import { first } from "rxjs";
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

function getProductShortInfo(
  data: Partial<ProductShortInfo>
): ProductShortInfo {
  return {
    id: 1,
    name: "test name",
    price: 100,
    ...data,
  };
}

function getCartItem(data: Partial<CartItem>): CartItem {
  return {
    name: "test name",
    price: 100,
    count: 1,
    ...data,
  };
}

async function renderCatalog(
  products: ProductShortInfo[],
  cartWithProducts: CartApi
): Promise<Element> {
  const api = new ExampleApi("");
  api.getProducts = () =>
    Promise.resolve<AxiosResponse<ProductShortInfo[], any>>(
      mockResponse(products)
    );
  const cart = cartWithProducts;
  const store = initStore(api, cart);
  const component = (
    <MemoryRouter>
      <Provider store={store}>
        <Catalog />
      </Provider>
    </MemoryRouter>
  );
  const { getByText, container } = render(component);
  await waitForElementToBeRemoved(() => getByText(/loading/i));

  return container;
}
describe("1", () => {
  it("В каталоге должны отображаться товары, список которых приходит с сервера", async () => {
    const cart = new CartApi();
    const container = await renderCatalog(
      [
        getProductShortInfo({ name: "pants", id: 1 }),
        getProductShortInfo({ name: "chair", id: 2 }),
      ],
      cart
    );
    const list = container.querySelectorAll(".ProductItem-Name");
    const namesList = Array.from(list).map((item) => item.textContent);

    expect(namesList).toEqual(["pants", "chair"]);
  });

  it("Для каждого товара в каталоге отображается название цена и ссылка на страницу с подробностями", async () => {
    const cart = new CartApi();
    const container = await renderCatalog(
      [getProductShortInfo({ name: "pants" })],
      cart
    );

    const item = container.querySelector(".ProductItem");

    expect(item.querySelector(".ProductItem-Name").textContent).toEqual(
      "pants"
    );
    expect(item.querySelector(".ProductItem-Price").textContent).toEqual(
      "$100"
    );
    expect(item.querySelector(".ProductItem-DetailsLink").textContent).toEqual(
      "Details"
    );
    const href = item
      .querySelector(".ProductItem-DetailsLink")
      .getAttribute("href");

    expect(href).toEqual("/catalog/1");
  });
  it("Eсли товар добавлен в корзину то должен отображаться бэйдж Added to cart", async () => {
    const cart = new CartApi();
    cart.setState({ 1: getCartItem({ name: "pants" }) });
    const container = await renderCatalog(
      [getProductShortInfo({ name: "pants", id: 1 })],
      cart
    );
    const badge = container.querySelector(".CartBadge");

    expect(badge.textContent).toEqual("Item in cart");
  });
});
