
import { Page, expect } from '@playwright/test';
import { setupTestData } from '../utils/helpers';

export class RoleManagementPage {
  readonly page: Page;
  readonly locators = {
    mainInput: '#rolemanagement-input',
    actionButton: '#rolemanagement-action',
    status: '#rolemanagement-status',
    header: '#rolemanagement-header'
  };

  constructor(page: Page) {
    this.page = page;
  }

  async gotoRoleManagement() {
    await setupTestData(this.page, { module: 'rolemanagement' });
    await this.page.goto('/rolemanagement');
    await expect(this.page).toHaveURL(/rolemanagement/);
  }

  async performAction(data = {}) {
    await this.page.fill(this.locators.mainInput, data.value || 'test-rolemanagement');
    await this.page.click(this.locators.actionButton);
    await expect(this.page.locator(this.locators.status)).toHaveText('Action completed');
  }

  async verifyUIElements() {
    await expect(this.page.locator(this.locators.header)).toBeVisible();
    await expect(this.page.locator(this.locators.mainInput)).toBeEnabled();
  }

  async performComplexAction(data = {}) {
    await this.performAction(data);
    await this.page.selectOption('#rolemanagement-select', data.option || 'option1');
    await expect(this.page.locator(this.locators.status)).toHaveText('Complex action completed');
  }

  async verifyState(expectedState) {
    await expect(this.page.locator(this.locators.status)).toHaveText(expectedState);
  }
}
