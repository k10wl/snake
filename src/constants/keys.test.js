/* eslint-disable */
import bindKeys from "./keys";

describe("Key binding snake controls", () => {
  const fnMock = jest.fn();
  const event = new KeyboardEvent('keydown', {'key': 'a'});
  document.dispatchEvent(event);
  it("should turn left", function() {
    expect(bindKeys(fnMock)).toMatchSnapshot();
  })
});