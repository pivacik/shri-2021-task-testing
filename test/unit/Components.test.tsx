/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import React from "react";
import { it, expect } from "@jest/globals";
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import events from "@testing-library/user-event";
import { ExampleApi, CartApi } from "../../src/client/api";
import { Provider } from "react-redux";
import {
  checkoutComplete,
  initStore,
  productsLoaded,
} from "../../src/client/store";
import { Image } from "../../src/client/components/Image";
import { Form } from "../../src/client/components/Form";
import { Router } from "react-router";
import { createMemoryHistory } from "history";
import { Helmet } from "react-helmet";
import axios from "axios";

import {
  CartItem,
  CartState,
  CheckoutFormData,
  Product,
  ProductShortInfo,
} from "../../src/common/types";
import { CartBadge } from "../../src/client/components/CartBadge";
import { ProductDetails } from "../../src/client/components/ProductDetails";
import { ProductItem } from "../../src/client/components/ProductItem";
import { Application } from "../../src/client/Application";
import { Cart } from "../../src/client/pages/Cart";
import { Catalog } from "../../src/client/pages/Catalog";

describe("Отображение компонента Image", () => {
  it("Компонент Image должен содержать классы и картинку-заглушку", () => {
    const tree = renderer.create(<Image className="card-img-top" />).toJSON();
    expect(tree).toMatchInlineSnapshot(`
<img
  className="Image card-img-top"
  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkMAYAADkANVKH3ScAAAAASUVORK5CYII="
/>
`);
  });
});

describe("Отображение компонента CartBage", () => {
  it("'Item in cart' не должен отображаться", () => {
    const basename = "/hw/store";
    const api = new ExampleApi(basename);
    const cart = new CartApi();
    cart.setState({});
    const store = initStore(api, cart);

    const tree = renderer
      .create(
        <Provider store={store}>
          <CartBadge id={1} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchInlineSnapshot(`null`);
  });

  it("'Item in cart' должен отображаться", () => {
    const basename = "/hw/store";
    const api = new ExampleApi(basename);
    const product: CartItem = {
      name: "Product",
      price: 222,
      count: 1,
    };
    const cart = new CartApi();
    cart.setState({ 1: product });
    const store = initStore(api, cart);

    const tree = renderer
      .create(
        <Provider store={store}>
          <CartBadge id={1} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchInlineSnapshot(`
<span
  className="CartBadge text-success mx-3"
>
  Item in cart
</span>
`);
  });
});

describe("Компонент ProductDetails", () => {
  it("должен отображаться", () => {
    const basename = "/hw/store";
    const api = new ExampleApi(basename);
    const cart = new CartApi();
    cart.setState({});
    const store = initStore(api, cart);
    const product: Product = {
      id: 1,
      name: "Product",
      price: 222,
      description: "short description",
      material: "steel",
      color: "white",
    };
    const tree = renderer
      .create(
        <Provider store={store}>
          <ProductDetails product={product} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchInlineSnapshot(`
<div
  className="ProductDetails row"
>
  <div
    className="col-12 col-sm-5 col-lg-4"
  >
    <img
      className="Image"
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkMAYAADkANVKH3ScAAAAASUVORK5CYII="
    />
  </div>
  <div
    className="col-12 col-sm-7 col-lg-6"
  >
    <h1
      className="ProductDetails-Name"
    >
      Product
    </h1>
    <p
      className="ProductDetails-Description"
    >
      short description
    </p>
    <p
      className="ProductDetails-Price fs-3"
    >
      $
      222
    </p>
    <p>
      <button
        className="ProductDetails-AddToCart btn btn-primary btn-lg"
        onClick={[Function]}
      >
        Add to Cart
      </button>
    </p>
    <dl>
      <dt>
        Color
      </dt>
      <dd
        className="ProductDetails-Color text-capitalize"
      >
        white
      </dd>
      <dt>
        Material
      </dt>
      <dd
        className="ProductDetails-Material text-capitalize"
      >
        steel
      </dd>
    </dl>
  </div>
</div>
`);
  });

  it("по нажатию на 'Add to cart' количество товаров в корзине должно увеличиваться", () => {
    const product: Product = {
      id: 1,
      name: "Product",
      price: 222,
      description: "short description",
      material: "steel",
      color: "white",
    };

    const basename = "/hw/store";
    const api = new ExampleApi(basename);
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

  it("при наличии товаро в корзине в шапке возле ссылки на Cart увеличивается счетчик товаров", () => {
    const history = createMemoryHistory({
      initialEntries: ["/catalog"],
      initialIndex: 0,
    });
    const sampleItem: CartItem = {
      name: "Product",
      price: 222,
      count: 1,
    };

    const basename = "/hw/store";
    const api = new ExampleApi(basename);
    const cart = new CartApi();
    cart.setState({ 1: sampleItem });
    const store = initStore(api, cart);

    const application = (
      <Provider store={store}>
        <Router history={history}>
          <Application />
        </Router>
      </Provider>
    );

    const { getByRole } = render(application);
    expect(getByRole("link", { name: /cart \(1\)/i })).toBeTruthy();
  });
});

describe("Компонент ProductItem", () => {
  it("Клик по ссылке 'Details' должен переводить на страницу с товаром", () => {
    const history = createMemoryHistory({
      initialEntries: ["/catalog"],
      initialIndex: 0,
    });
    const basename = "/hw/store";
    const api = new ExampleApi(basename);
    const cart = new CartApi();
    cart.setState({});
    const store = initStore(api, cart);

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
