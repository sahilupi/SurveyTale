import { expect, test } from "playwright/test";

import { login, signUpAndLogin, signupUsingInviteToken, skipOnboarding } from "./utils/helper";
import { invites, users } from "./utils/mock";

test.describe("Invite, accept and remove team member", async () => {
  test.describe.configure({ mode: "serial" });
  const { email, password, name } = users.team[0];
  let inviteLink: string;

  test("Invite team member", async ({ page }) => {
    await signUpAndLogin(page, name, email, password);
    await skipOnboarding(page);

    const dropdownTrigger = page.locator("#userDropdownTrigger");
    await expect(dropdownTrigger).toBeVisible();
    await dropdownTrigger.click();

    const dropdownContentWrapper = page.locator("#userDropdownContentWrapper");
    await expect(dropdownContentWrapper).toBeVisible();

    await page.getByRole("link", { name: "Team" }).click();

    // Add member button
    await expect(page.getByRole("button", { name: "Add Member" })).toBeVisible();
    await page.getByRole("button", { name: "Add Member" }).click();

    // Fill the member name and email form
    await expect(page.getByLabel("Email")).toBeVisible();
    await page.getByLabel("Full Name").fill(invites.addMember.name);

    await expect(page.getByLabel("Email Address")).toBeVisible();
    await page.getByLabel("Email Address").fill(invites.addMember.email);

    await page.getByRole("button", { name: "Send Invitation", exact: true }).click();
  });

  test("Copy Invite Link", async ({ page }) => {
    await login(page, email, password);

    const dropdownTrigger = page.locator("#userDropdownTrigger");
    await expect(dropdownTrigger).toBeVisible();
    await dropdownTrigger.click();

    const dropdownContentWrapper = page.locator("#userDropdownContentWrapper");
    await expect(dropdownContentWrapper).toBeVisible();

    await page.getByRole("link", { name: "Team" }).click();

    await expect(page.locator("#membersInfoWrapper")).toBeVisible();

    const lastMemberInfo = page.locator("#membersInfoWrapper > .singleMemberInfo:last-child");
    await expect(lastMemberInfo).toBeVisible();

    const pendingSpan = lastMemberInfo.locator("span").filter({ hasText: "Pending" });
    await expect(pendingSpan).toBeVisible();

    const shareInviteButton = page.locator("#shareInviteButton");
    await expect(shareInviteButton).toBeVisible();

    await shareInviteButton.click();

    const inviteLinkText = page.locator("#inviteLinkText");
    await expect(inviteLinkText).toBeVisible();

    // invite link text is a paragraph, and we need the text inside it
    const inviteLinkTextContent = await inviteLinkText.textContent();
    if (inviteLinkTextContent) {
      inviteLink = inviteLinkTextContent;
    }
  });

  test("Accept Invite", async ({ page }) => {
    const { email, name, password } = users.team[1];
    page.goto(inviteLink);

    await page.waitForURL(/\/invite\?token=[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+/);

    // Create account button
    await expect(page.getByRole("link", { name: "Create account" })).toBeVisible();
    await page.getByRole("link", { name: "Create account" }).click();

    await signupUsingInviteToken(page, name, email, password);
    await skipOnboarding(page);
  });

  test("Remove Member", async ({ page }) => {
    await login(page, email, password);

    const dropdownTrigger = page.locator("#userDropdownTrigger");
    await expect(dropdownTrigger).toBeVisible();
    await dropdownTrigger.click();

    const dropdownContentWrapper = page.locator("#userDropdownContentWrapper");
    await expect(dropdownContentWrapper).toBeVisible();

    await page.getByRole("link", { name: "Team" }).click();

    await expect(page.locator("#membersInfoWrapper")).toBeVisible();

    const lastMemberInfo = page.locator("#membersInfoWrapper > .singleMemberInfo:last-child");
    await expect(lastMemberInfo).toBeVisible();

    const deleteMemberButton = lastMemberInfo.locator("#deleteMemberButton");
    await expect(deleteMemberButton).toBeVisible();

    await deleteMemberButton.click();

    await expect(page.getByRole("button", { name: "Delete", exact: true })).toBeVisible();
    await page.getByRole("button", { name: "Delete", exact: true }).click();
  });
});
