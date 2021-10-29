/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import React from "react";
import { it, expect } from "@jest/globals";
import { render } from "@testing-library/react";
import events from "@testing-library/user-event";
import { ExampleApi, CartApi } from "../../src/client/api";
import { Provider } from "react-redux";
import {
  checkoutComplete,
  initStore,
  productsLoaded,
} from "../../src/client/store";
import { Form } from "../../src/client/components/Form";
import { Router } from "react-router";
import { createMemoryHistory } from "history";

import {
  CartItem,
  CheckoutFormData,
  Product,
  ProductShortInfo,
} from "../../src/common/types";
import { ProductDetails } from "../../src/client/components/ProductDetails";
import { ProductItem } from "../../src/client/components/ProductItem";
import { Application } from "../../src/client/Application";
import { Cart } from "../../src/client/pages/Cart";
import { Catalog } from "../../src/client/pages/Catalog";

describe("Добавление товаров в корзину", () => {
  const history = createMemoryHistory({
    initialEntries: ["/catalog"],
    initialIndex: 0,
  });
  const basename = "/hw/store";
  const api = new ExampleApi(basename);

  it("по нажатию на 'Add to cart' количество товаров в корзине должно увеличиваться", () => {
    const product: Product = {
      id: 1,
      name: "Product",
      price: 222,
      description: "short description",
      material: "steel",
      color: "white",
    };

    const cart = new CartApi();
    cart.setState({});
    const store = initStore(api, cart);

    const application = (
      <Provider store={store}>
        <ProductDetails product={product} />
      </Provider>
    );

    const { getByRole } = render(application);

    const addToCartBtn = getByRole("button", {
      name: /add to cart/i,
    });
    events.click(addToCartBtn);
    expect(cart.getState()).toEqual({
      1: { name: "Product", price: 222, count: 1 },
    });

    events.click(addToCartBtn);
    expect(cart.getState()).toEqual({
      1: { name: "Product", price: 222, count: 2 },
    });
  });

  it("при наличии нескольких товаро в корзине в шапке возле ссылки на Cart верное число уникальных товаров", () => {
    const sampleItem1: CartItem = {
      name: "Pants",
      price: 22,
      count: 2,
    };
    const sampleItem2: CartItem = {
      name: "Chair",
      price: 342,
      count: 2,
    };

    const cart = new CartApi();
    cart.setState({ 1: sampleItem1, 2: sampleItem2 });
    const store = initStore(api, cart);

    const application = (
      <Provider store={store}>
        <Router history={history}>
          <Application />
        </Router>
      </Provider>
    );

    const { getByRole } = render(application);
    expect(getByRole("link", { name: /cart \(2\)/i })).toBeTruthy();
  });
});

describe("Детальная информация о товаре", () => {
  const history = createMemoryHistory({
    initialEntries: ["/catalog"],
    initialIndex: 0,
  });
  const basename = "/hw/store";
  const api = new ExampleApi(basename);
  const cart = new CartApi();
  const store = initStore(api, cart);

  it("Клик по ссылке 'Details' должен переводить на страницу с товаром", () => {
    const product: ProductShortInfo = {
      id: 1,
      name: "Product",
      price: 222,
    };
    const application = (
      <Router history={history}>
        <Provider store={store}>
          <ProductItem product={product} />
        </Provider>
      </Router>
    );

    const { getByRole } = render(application);
    const detailsLink = getByRole("link", { name: /details/i });
    events.click(detailsLink);
    expect(history.location.pathname).toEqual("/catalog/1");
  });
});

describe("Компонент Form", () => {
  it("При отправке формы без валидных данных, данные не отправляются", () => {
    let submitedDataSTUB = {};
    const onSubmitSTUB = (data: CheckoutFormData) => {
      submitedDataSTUB = data;
    };

    const application = <Form onSubmit={onSubmitSTUB} />;

    const { getByRole } = render(application);
    const checkoutBtn = getByRole("button", { name: /checkout/i });

    events.click(checkoutBtn);
    expect(submitedDataSTUB).toEqual({});
  });
});

describe("Проверка  Cart", () => {
  const history = createMemoryHistory({
    initialEntries: ["/cart"],
    initialIndex: 0,
  });
  const api = new ExampleApi("");

  it("Сообщение об оформлении заказа выводится", async () => {
    const cart = new CartApi();

    const store = initStore(api, cart);
    store.dispatch(checkoutComplete(42));
    const application = (
      <Router history={history}>
        <Provider store={store}>
          <Cart />
        </Provider>
      </Router>
    );

    const { getByText } = render(application);

    expect(getByText(/42/i)).toBeTruthy();
    expect(
      getByText(/order # has been successfully completed\./i)
    ).toBeTruthy();
  });
});

describe("Отображение  Catalog", () => {
  const history = createMemoryHistory({
    initialEntries: ["/catalog"],
    initialIndex: 0,
  });
  const api = new ExampleApi("");
  const cart = new CartApi();
  const store = initStore(api, cart);
  it("Выводится короткая информация о товарах", async () => {
    const product1 = {
      id: 1,
      name: "Pants",
      price: 34,
    } as ProductShortInfo;
    const product2 = {
      id: 2,
      name: "Chair",
      price: 2344,
    } as ProductShortInfo;

    const application = (
      <Router history={history}>
        <Provider store={store}>
          <Catalog />
        </Provider>
      </Router>
    );
    const { getAllByTestId } = render(application);
    store.dispatch(productsLoaded([product1, product2]));
    const productId1 = getAllByTestId("1");
    const productId2 = getAllByTestId("2");
    expect(productId1[0]).toMatchSnapshot();
    expect(productId2[0]).toMatchSnapshot();
  });
});
