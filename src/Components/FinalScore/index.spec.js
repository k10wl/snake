/* eslint-disable */
import React from "react";
import { shallow } from "enzyme";
import FinalScore from ".";

describe("FinalScore component", () => {
  let props
  beforeEach(() => {
    props = {
      restart: jest.fn(),
      score: 1,
    };
  });
  it(`should return "You scored 1 point!"`, function() {
    let sut = shallow(<FinalScore {...props} />)
    expect(sut.text().includes("You scored 1 point!")).toBe(true);
  });
  it(`should return "You scored 3 points!"`, function(){
    props.score = 3;
    let sut = shallow(<FinalScore {...props} />)
    expect(sut.text().includes("You scored 3 points!")).toBe(true);
  })
  it("should match snapshot", function() {
    let sut = shallow(<FinalScore {...props} />)
    expect(sut).toMatchSnapshot();
  });
});
