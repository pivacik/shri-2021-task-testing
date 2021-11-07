describe("Статические страницы", async function () {
  it("Отображение адаптивной верстки Home 1100px", async function () {
    const browser = this.browser;
    await browser.setWindowSize(1100, 1200);
    await this.browser.url("/hw/store");
    await browser.assertView("plain", ".Home", {});
  });
  it("Отображение адаптивной верстки Home 900px", async function () {
    const browser = this.browser;
    await browser.setWindowSize(900, 1200);
    await this.browser.url("/hw/store");
    await browser.assertView("plain", ".Home", {});
  });
  it("Отображение адаптивной верстки Contacts 1100px", async function () {
    const browser = this.browser;
    await browser.setWindowSize(1100, 1200);
    await this.browser.url("/hw/store/contacts");
    await browser.assertView("plain", ".Contacts", {});
  });
  it("Отображение адаптивной верстки Contacts 900px", async function () {
    const browser = this.browser;
    await browser.setWindowSize(900, 1200);
    await this.browser.url("/hw/store/contacts");
    await browser.assertView("plain", ".Contacts", {});
  });
  it("Отображение адаптивной верстки Contacts 640px", async function () {
    const browser = this.browser;
    await browser.setWindowSize(640, 1200);
    await this.browser.url("/hw/store/contacts");
    await browser.assertView("plain", ".Contacts", {});
  });
  it("Отображение адаптивной верстки Contacts 400px", async function () {
    const browser = this.browser;
    await browser.setWindowSize(400, 1200);
    await this.browser.url("/hw/store/contacts");
    await browser.assertView("plain", ".Contacts", {});
  });
  it("Отображение адаптивной верстки Delivery 1100px", async function () {
    const browser = this.browser;
    await browser.setWindowSize(1100, 1200);
    await this.browser.url("/hw/store/delivery");
    await browser.assertView("plain", ".Delivery", {});
  });
  it("Отображение адаптивной верстки Delivery 900px", async function () {
    const browser = this.browser;
    await browser.setWindowSize(900, 1200);
    await this.browser.url("/hw/store/delivery");
    await browser.assertView("plain", ".Delivery", {});
  });
  it("Отображение адаптивной верстки Delivery 640px", async function () {
    const browser = this.browser;
    await browser.setWindowSize(640, 1200);
    await this.browser.url("/hw/store/delivery");
    await browser.assertView("plain", ".Delivery", {});
  });
  it("Отображение адаптивной верстки Delivery 400px", async function () {
    const browser = this.browser;
    await browser.setWindowSize(400, 1200);
    await this.browser.url("/hw/store/delivery");
    await browser.assertView("plain", ".Delivery", {});
  });
});
