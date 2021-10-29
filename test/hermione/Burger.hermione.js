describe("Наличие бургера ", async function () {
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
