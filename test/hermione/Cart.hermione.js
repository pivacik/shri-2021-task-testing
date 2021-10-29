describe("Страница /cart", async function () {
  it("Должна открывать с пустой корзиной", async function () {
    const browser = this.browser;
    await this.browser.url("/hw/store/cart");
    await browser.assertView("plain", ".Application", {
      compositeImage: true,
    });
  });

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

  it("При невалидных данных в Form должны отображаться поля с ошибкой", async function () {
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
