import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly pageHeading: Locator;
  readonly cartTable: Locator;
  readonly productName: Locator;
  readonly productPrice: Locator;
  readonly quantity: Locator;
  readonly subtotal: Locator;
  readonly total: Locator;
  readonly updateCartButton: Locator;
  readonly proceedToCheckoutButton: Locator;
  readonly removeItemLink: Locator;
  readonly shippingInfo: Locator;
  readonly cartTotalsSection: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeading = page.getByRole('heading', { name: 'Reservations' });
    this.cartTable = page.locator('table').first();
    this.productName = page.getByRole('link', { name: 'Objects' });
    this.productPrice = page.locator('td').filter({ hasText: '€300' });
    this.quantity = page.getByRole('spinbutton', { name: 'Product quantity' });
    this.subtotal = page.locator('td').filter({ hasText: '€300' });
    this.total = page.locator('strong').getByText('€300');
    this.updateCartButton = page.getByRole('button', { name: 'Update cart' });
    this.proceedToCheckoutButton = page.getByRole('link', { name: 'Proceed to checkout' });
    this.removeItemLink = page.getByRole('link', { name: /Remove.*from cart/ });
    this.shippingInfo = page.getByText('Pickup appointment');
    this.cartTotalsSection = page.getByRole('heading', { name: 'Cart totals' });
  }

  async verifyPageContent() {
    await expect(this.page).toHaveTitle(/Reservations.*Anne van der Waerden/);
    await expect(this.pageHeading).toBeVisible();
    await expect(this.cartTable).toBeVisible();
  }

  async verifyCartContents(productName: string, price: string, expectedQuantity: string = '1') {
    await expect(this.page.getByRole('link', { name: productName, exact: true })).toBeVisible();
    await expect(this.page.getByText(price).first()).toBeVisible();
    await expect(this.quantity).toHaveValue(expectedQuantity);
  }

  async verifyCartTotals(expectedSubtotal: string, expectedTotal: string) {
    await expect(this.cartTotalsSection).toBeVisible();
    
    // Verify subtotal
    const subtotalRow = this.page.locator('tr', { hasText: 'Subtotal' });
    await expect(subtotalRow.getByText(expectedSubtotal)).toBeVisible();
    
    // Verify total
    const totalRow = this.page.locator('tr', { hasText: 'Total' });
    await expect(totalRow.getByText(expectedTotal).first()).toBeVisible();
  }

  async verifyShippingOptions() {
    await expect(this.shippingInfo).toBeVisible();
    await expect(this.page.getByText('Shipping options will be updated during checkout.')).toBeVisible();
  }

  async verifyCheckoutButton() {
    await expect(this.proceedToCheckoutButton).toBeVisible();
    await expect(this.proceedToCheckoutButton).toHaveAttribute('href', /checkout/);
  }

  async updateQuantity(newQuantity: string) {
    await this.quantity.fill(newQuantity);
    await this.updateCartButton.click();
  }

  async removeItem() {
    await this.removeItemLink.click();
  }

  async proceedToCheckout() {
    await this.proceedToCheckoutButton.click();
  }
}