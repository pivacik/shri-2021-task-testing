describe("Адаптивная верстка", async function () {
  // it("Home 1100px", async function () {
  //   const browser = this.browser;
  //   await browser.setWindowSize(1100, 1200);
  //   await this.browser.url("/hw/store");
  //   await browser.assertView("plain", ".Home", {});
  // });
  // it("Home 900px", async function () {
  //   const browser = this.browser;
  //   await browser.setWindowSize(900, 1200);
  //   await this.browser.url("/hw/store");
  //   await browser.assertView("plain", ".Home", {});
  // });
  // it("Contacts 1100px", async function () {
  //   const browser = this.browser;
  //   await browser.setWindowSize(1100, 1200);
  //   await this.browser.url("/hw/store/contacts");
  //   await browser.assertView("plain", ".Contacts", {});
  // });
  // it("Contacts 900px", async function () {
  //   const browser = this.browser;
  //   await browser.setWindowSize(900, 1200);
  //   await this.browser.url("/hw/store/contacts");
  //   await browser.assertView("plain", ".Contacts", {});
  // });
  // it("Contacts 640px", async function () {
  //   const browser = this.browser;
  //   await browser.setWindowSize(640, 1200);
  //   await this.browser.url("/hw/store/contacts");
  //   await browser.assertView("plain", ".Contacts", {});
  // });
  // it("Contacts 400px", async function () {
  //   const browser = this.browser;
  //   await browser.setWindowSize(400, 1200);
  //   await this.browser.url("/hw/store/contacts");
  //   await browser.assertView("plain", ".Contacts", {});
  // });
  // it("Delivery 1100px", async function () {
  //   const browser = this.browser;
  //   await browser.setWindowSize(1100, 1200);
  //   await this.browser.url("/hw/store/delivery");
  //   await browser.assertView("plain", ".Delivery", {});
  // });
  // it("Delivery 900px", async function () {
  //   const browser = this.browser;
  //   await browser.setWindowSize(900, 1200);
  //   await this.browser.url("/hw/store/delivery");
  //   await browser.assertView("plain", ".Delivery", {});
  // });
  // it("Delivery 640px", async function () {
  //   const browser = this.browser;
  //   await browser.setWindowSize(640, 1200);
  //   await this.browser.url("/hw/store/delivery");
  //   await browser.assertView("plain", ".Delivery", {});
  // });
  // it("Delivery 400px", async function () {
  //   const browser = this.browser;
  //   await browser.setWindowSize(400, 1200);
  //   await this.browser.url("/hw/store/delivery");
  //   await browser.assertView("plain", ".Delivery", {});
  // });
  it("Catalog 700px", async function () {
    const browser = this.browser;
    await browser.setWindowSize(700, 900);
    await browser.url("/hw/store/catalog");

    const card = await browser.$(".ProductItem");
    await browser.waitUntil(() => card.isDisplayedInViewport(), 3000);
    await browser.assertView("plain", ".Catalog", {
      allowViewportOverflow: true,
      captureElementFromTop: false,
      ignoreElements: [".ProductItem-Price", ".ProductItem-Name"],
    });
  });

  it("Catalog 400px", async function () {
    const browser = this.browser;
    await browser.setWindowSize(400, 900);
    await browser.url("/hw/store/catalog");

    const card = await browser.$(".ProductItem");
    await browser.waitUntil(() => card.isDisplayedInViewport(), 3000);
    await browser.assertView("plain", ".Catalog", {
      allowViewportOverflow: true,
      captureElementFromTop: false,
      ignoreElements: [".ProductItem-Price", ".ProductItem-Name"],
    });
  });
});
