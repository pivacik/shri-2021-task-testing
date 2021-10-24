const { assert } = require("chai");

describe("Статические страницы", async function () {
  it("Странца / должа иметь статическое содержимое", async function () {
    const browser = this.browser;
    await this.browser.url("/hw/store");
    await browser.assertView("plain", ".Application", {
      compositeImage: true,
    });
  });
  it("Странца /contacts должа иметь статическое содержимое", async function () {
    const browser = this.browser;
    await this.browser.url("/hw/store/contacts");
    await browser.assertView("plain", ".Application", {
      compositeImage: true,
    });
  });
  it("Странца /delivery должа иметь статическое содержимое", async function () {
    const browser = this.browser;
    await this.browser.url("/hw/store/delivery");
    await browser.assertView("plain", ".Application", {
      compositeImage: true,
    });
  });
});

describe("Страница /cart", async function () {
  it("Должна открывать с пустой корзиной", async function () {
    const browser = this.browser;
    await this.browser.url("/hw/store/cart");
    await browser.assertView("plain", ".Application", {
      compositeImage: true,
    });
  });
});
