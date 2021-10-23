const { assert } = require("chai");

describe("github", async function () {
  it("Тест, который пройдет", async function () {
    await this.browser.url("https://github.com/gemini-testing/hermione");
    await this.browser.assertView("plain", "#readme", {
      compositeImage: true,
    });

    const title = await this.browser.$("#readme h1").getText();
    assert.equal(title, "Hermione");
  });
});
describe("Статические страницы", async function () {
  it("Странца / должа иметь статическое содержимое", async function () {
    const browser = this.browser;
    await this.browser.url("/hw/store");
    await browser.assertView("plain", ".Home", {
      compositeImage: true,
    });
  });
  it("Странца /contacts должа иметь статическое содержимое", async function () {
    const browser = this.browser;
    await this.browser.url("/hw/store/contacts");
    await browser.assertView("plain", ".Contacts", {
      compositeImage: true,
    });
  });
  it("Странца /delivery должа иметь статическое содержимое", async function () {
    const browser = this.browser;
    await this.browser.url("/hw/store/delivery");
    await browser.assertView("plain", ".Delivery", {
      compositeImage: true,
    });
  });
});

describe("Navbar", async function () {
  it("Ссылки в navbar отображаюся", async function () {
    const browser = this.browser;
    await this.browser.url("/hw/store");
    await browser.assertView("plain", ".navbar", {
      compositeImage: true,
    });
  });
});
