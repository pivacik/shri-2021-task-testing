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
import { initStore } from "../../src/client/store";
import { Image } from "../../src/client/components/Image";

import { CartItem, CartState, Product } from "../../src/common/types";
import { CartBadge } from "../../src/client/components/CartBadge";
import { ProductDetails } from "../../src/client/components/ProductDetails";

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

  it("по нажатию на 'Add to cart' должен появляться 'Item in cart'", () => {
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

    const { getByRole, getByText } = render(application);

    const addToCartBtn = getByRole("button", {
      name: /add to cart/i,
    });
    events.click(addToCartBtn);

    expect(getByText(/item in cart/i).textContent).toEqual("Item in cart");
  });

  it("по нажатию на 'Add to cart' товар должен добавляться в корзину", () => {
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

    const item: CartItem = {
      name: "Product",
      price: 222,
      count: 1,
    };
    const cartItem: CartState = {
      1: item,
    };
    expect(cart.getState()).toEqual(cartItem);
  });
});
