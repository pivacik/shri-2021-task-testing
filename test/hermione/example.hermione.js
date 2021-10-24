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
