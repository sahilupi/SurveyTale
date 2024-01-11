/**
 * @jest-environment jsdom
 */
import {
  mockEventTrackResponse,
  mockInitResponse,
  mockRegisterRouteChangeResponse,
  mockResetResponse,
  mockSetCustomAttributeResponse,
  mockSetEmailIdResponse,
  mockSetUserIdResponse,
  mockUpdateEmailResponse,
} from "./__mocks__/apiMock";

import { TPersonAttributes } from "@formbricks/types/people";

import formbricks from "../src/index";
import { constants } from "./constants";

const consoleLogMock = jest.spyOn(console, "log").mockImplementation();

test("Test Jest", () => {
  expect(1 + 9).toBe(10);
});

const {
  environmentId,
  apiHost,
  initialUserId,
  initialUserEmail,
  updatedUserEmail,
  customAttributeKey,
  customAttributeValue,
} = constants;

beforeEach(() => {
  fetchMock.resetMocks();
});

/*
test("Formbricks should Initialise", async () => {
  mockInitResponse();

  await formbricks.init({
    environmentId,
    apiHost,
    userId: initialUserId,
  });

  const configFromBrowser = localStorage.getItem("formbricks-js");
  expect(configFromBrowser).toBeTruthy();

  if (configFromBrowser) {
    const jsonSavedConfig = JSON.parse(configFromBrowser);
    expect(jsonSavedConfig.environmentId).toStrictEqual(environmentId);
    expect(jsonSavedConfig.apiHost).toStrictEqual(apiHost);
  }
});

test("Formbricks should set email", async () => {
  mockSetEmailIdResponse();
  await formbricks.setEmail(initialUserEmail);

  const currentStatePerson = formbricks.getPerson();

  const currentStatePersonAttributes = currentStatePerson.attributes;
  const numberOfUserAttributes = Object.keys(currentStatePersonAttributes).length;
  expect(numberOfUserAttributes).toStrictEqual(2);

  const userId = currentStatePersonAttributes.userId;
  expect(userId).toStrictEqual(initialUserId);
  const email = currentStatePersonAttributes.email;
  expect(email).toStrictEqual(initialUserEmail);
});

test("Formbricks should set custom attribute", async () => {
  mockSetCustomAttributeResponse();
  await formbricks.setAttribute(customAttributeKey, customAttributeValue);

  const currentStatePerson = formbricks.getPerson();

  const currentStatePersonAttributes = currentStatePerson.attributes;
  const numberOfUserAttributes = Object.keys(currentStatePersonAttributes).length;
  expect(numberOfUserAttributes).toStrictEqual(3);

  const userId = currentStatePersonAttributes.userId;
  expect(userId).toStrictEqual(initialUserId);
  const email = currentStatePersonAttributes.email;
  expect(email).toStrictEqual(initialUserEmail);
  const customAttribute = currentStatePersonAttributes[customAttributeKey];
  expect(customAttribute).toStrictEqual(customAttributeValue);
});

test("Formbricks should update attribute", async () => {
  mockUpdateEmailResponse();
  await formbricks.setEmail(updatedUserEmail);

  const currentStatePerson = formbricks.getPerson();

  const currentStatePersonAttributes = currentStatePerson.attributes;

  const numberOfUserAttributes = Object.keys(currentStatePersonAttributes).length;
  expect(numberOfUserAttributes).toStrictEqual(3);

  const userId = currentStatePersonAttributes.userId;
  expect(userId).toStrictEqual(initialUserId);
  const email = currentStatePersonAttributes.email;
  expect(email).toStrictEqual(updatedUserEmail);
  const customAttribute = currentStatePersonAttributes[customAttributeKey];
  expect(customAttribute).toStrictEqual(customAttributeValue);
});

test("Formbricks should track event", async () => {
  mockEventTrackResponse();
  const mockButton = document.createElement("button");
  mockButton.addEventListener("click", async () => {
    await formbricks.track("Button Clicked");
  });
  await mockButton.click();
  expect(consoleLogMock).toHaveBeenCalledWith(
    expect.stringMatching(/Formbricks: Event "Button Clicked" tracked/)
  );
});

test("Formbricks should register for route change", async () => {
  mockRegisterRouteChangeResponse();
  await formbricks.registerRouteChange();
  expect(consoleLogMock).toHaveBeenCalledWith(expect.stringMatching(/Checking page url/));
});

test("Formbricks should reset", async () => {
  mockResetResponse();
  await formbricks.reset();
  const currentStatePerson = formbricks.getPerson();
  const currentStatePersonAttributes = currentStatePerson.attributes;

  expect(Object.keys(currentStatePersonAttributes).length).toBe(0);
});

*/
