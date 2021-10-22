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
