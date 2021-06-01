import auth from "api/core/auth";
import { localStorageToDate, logOutIfInactive } from "./inactivityUtils";

describe("Log out user if inactive", () => {
  it("Returns today or local storage  lastActivityDate", () => {
    expect(localStorageToDate(null).toDateString()).toEqual(
      new Date().toDateString()
    );
  });

  it("Logs user out if lastActivityDate is over 7 days old", () => {
    const today = new Date();
    const eightDaysAgo = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 8
    );
    localStorage.setItem("authRefreshToken", "iasudoajsdlkwjdoiasdjalksdh");
    localStorage.setItem("lastActivityDate", eightDaysAgo.toDateString());
    logOutIfInactive();
    expect(localStorage.getItem("authRefreshToken")).toEqual(null);
  });
});

describe("auth.ts utils", () => {
  it("auth.ts logout works ", () => {
    localStorage.setItem("authRefreshToken", "iasudoajsdlkwjdoiasdjalksdh");
    auth.logout();
    expect(localStorage.getItem("authRefreshToken")).toEqual(null);
  });
});
