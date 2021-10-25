const { assert } = require("chai");

describe("Страница /cart", async function () {
  it("Должна открывать с пустой корзиной", async function () {
    const browser = this.browser;
    await this.browser.url("/hw/store/cart");
    await browser.assertView("plain", ".Application", {
      compositeImage: true,
    });
  });
});

describe("Статические страницы", async function () {
  it("Отображение адаптивной верстки Home 1100px", async function () {
    const browser = this.browser;
    await browser.setWindowSize(1100, 1200);
    await this.browser.url("/hw/store");
    await browser.assertView("plain", ".Home", {
      // compositeImage: true,
    });
  });
  it("Отображение адаптивной верстки Home 900px", async function () {
    const browser = this.browser;
    await browser.setWindowSize(900, 1200);
    await this.browser.url("/hw/store");
    await browser.assertView("plain", ".Home", {
      // compositeImage: true,
    });
  });
  it("Отображение адаптивной верстки Contacts 1100px", async function () {
    const browser = this.browser;
    await browser.setWindowSize(1100, 1200);
    await this.browser.url("/hw/store/contacts");
    await browser.assertView("plain", ".Contacts", {
      // compositeImage: true,
    });
  });
  it("Отображение адаптивной верстки Contacts 900px", async function () {
    const browser = this.browser;
    await browser.setWindowSize(900, 1200);
    await this.browser.url("/hw/store/contacts");
    await browser.assertView("plain", ".Contacts", {
      // compositeImage: true,
    });
  });
  it("Отображение адаптивной верстки Contacts 640px", async function () {
    const browser = this.browser;
    await browser.setWindowSize(640, 1200);
    await this.browser.url("/hw/store/contacts");
    await browser.assertView("plain", ".Contacts", {
      // compositeImage: true,
    });
  });
  it("Отображение адаптивной верстки Contacts 400px", async function () {
    const browser = this.browser;
    await browser.setWindowSize(400, 1200);
    await this.browser.url("/hw/store/contacts");
    await browser.assertView("plain", ".Contacts", {
      // compositeImage: true,
    });
  });
  it("Отображение адаптивной верстки Delivery 1100px", async function () {
    const browser = this.browser;
    await browser.setWindowSize(1100, 1200);
    await this.browser.url("/hw/store/delivery");
    await browser.assertView("plain", ".Delivery", {
      // compositeImage: true,
    });
  });
  it("Отображение адаптивной верстки Delivery 900px", async function () {
    const browser = this.browser;
    await browser.setWindowSize(900, 1200);
    await this.browser.url("/hw/store/delivery");
    await browser.assertView("plain", ".Delivery", {
      // compositeImage: true,
    });
  });
  it("Отображение адаптивной верстки Delivery 640px", async function () {
    const browser = this.browser;
    await browser.setWindowSize(640, 1200);
    await this.browser.url("/hw/store/delivery");
    await browser.assertView("plain", ".Delivery", {
      // compositeImage: true,
    });
  });
  it("Отображение адаптивной верстки Delivery 400px", async function () {
    const browser = this.browser;
    await browser.setWindowSize(400, 1200);
    await this.browser.url("/hw/store/delivery");
    await browser.assertView("plain", ".Delivery", {
      // compositeImage: true,
    });
  });
});

describe("Header при ширине меньше 576 ", async function () {
  it("При выборе элемента из меню бургера, меню должно закрываться", async function () {
    const browser = this.browser;
    await browser.setWindowSize(575, 1000);
    await browser.url("/hw/store/contacts");
    await browser.assertView("plain", ".navbar", {
      compositeImage: true,
    });
    await browser.$(".navbar-toggler").click();
    await browser.pause(150);
    await browser.assertView("plain_opened", ".navbar", {
      compositeImage: true,
    });
    await browser.$(".nav-link.active").click();
    await browser.pause(150);
    await browser.assertView("plain-closed", ".navbar", {
      compositeImage: true,
    });
  });
});

describe("Наличие бургера ", async function () {
  it("При ширине 320 бургер должен отображаться корректно", async function () {
    const browser = this.browser;
    await browser.setWindowSize(320, 1000);
    await browser.url("/hw/store/contacts");
    await browser.assertView("plain", ".navbar", {
      compositeImage: true,
    });
  });
  it("При ширине 1000 бургер не должен отображаться", async function () {
    const browser = this.browser;
    await browser.setWindowSize(1000, 1000);
    await browser.url("/hw/store/contacts");
    await browser.assertView("plain", ".navbar", {
      compositeImage: true,
    });
  });
});

describe("Form компонент", async function () {
  it("При невалидных данных должен подсвечивать поля с ошибкой", async function () {
    const browser = this.browser;
    await browser.setWindowSize(600, 1200);
    await browser.url("/hw/store/catalog");

    const detailsLink = await browser.$(".ProductItem-DetailsLink.card-link");
    await browser.waitUntil(() => detailsLink.isClickable(), 2000);
    await detailsLink.click();
    const addToCartBtn = await browser.$(".ProductDetails-AddToCart.btn");
    await browser.waitUntil(() => addToCartBtn.isClickable(), 2000);
    await addToCartBtn.click();
    await addToCartBtn.click();
    await browser.url("/hw/store/cart");

    await browser.assertView("plain", ".navbar", {
      compositeImage: true,
    });
    const checkoutBtn = await browser.$(".Form-Submit");
    const form = await browser.$(".Form");
    await checkoutBtn.scrollIntoView();
    await browser.waitUntil(() => checkoutBtn.isDisplayedInViewport(), 2000);
    await checkoutBtn.click();

    await form.scrollIntoView();
    await browser.waitUntil(() => form.isDisplayedInViewport(), 2000);
    await browser.assertView("erroredOut", ".Form", {
      compositeImage: true,
      screenshotDelay: 500,
    });
  });
});

describe("Cart в navbar", async function () {
  it("При обновлении страницы товары из корзины не исчезают", async function () {
    const browser = this.browser;
    await browser.setWindowSize(1000, 1200);
    await browser.url("/hw/store/catalog");

    const detailsLink = await browser.$(".ProductItem-DetailsLink.card-link");
    await browser.waitUntil(() => detailsLink.isClickable(), 2000);
    await detailsLink.click();
    const addToCartBtn = await browser.$(".ProductDetails-AddToCart.btn");
    await browser.waitUntil(() => addToCartBtn.isClickable(), 2000);
    await addToCartBtn.click();
    await browser.refresh();

    await browser.assertView("plain-item-in-cart", ".navbar", {
      compositeImage: true,
    });
  });
});
