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
