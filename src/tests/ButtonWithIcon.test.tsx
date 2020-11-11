import * as React from "react";
import { shallow } from "enzyme";
import { ButtonWIthIcon } from "../components/ButtonWithIcon";

test("Button has icon", () => {
  const Button = shallow(<ButtonWIthIcon icon={"fa fa-plus"} />);

  expect(Button.childAt(0).hasClass("fa fa-plus")).toBe(true);
  expect(Button).toMatchSnapshot();
});

test("Button has text", () => {
  const Button = shallow(<ButtonWIthIcon text={"inputText"} />);

  expect(Button.childAt(0).text()).toEqual("inputText");
});

test("Button has both icon and text", () => {
  const Button = shallow(
    <ButtonWIthIcon text={"inputText"} icon={"fa fa-plus"} />
  );

  expect(Button.childAt(1).text()).toEqual("inputText");
  expect(Button.childAt(0).hasClass("fa fa-plus")).toBe(true);
});

test("Button callback test", () => {
  let test = false;
  const Button = shallow(
    <ButtonWIthIcon
      callback={(e) => {
        test = true;
      }}
    />
  );
  Button.simulate("click");
  expect(test).toBe(true);
});

