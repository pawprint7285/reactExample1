import React from "react";
import AttributeMainEdit from "./AttributeMainEdit";
import { shallow } from "enzyme";

function renderAttributeMainEdit(args) {
  const defaultProps = {
    // authors: [],
    // course: {},
    // saving: false,
    attribute: {},
    // onSave: () => {},
    onChange: () => {}
  };

  const props = { ...defaultProps, ...args };
  return shallow(<AttributeMainEdit {...props} />);
}

it("should render Edit Attribute: ", () => {
  const wrapper = renderAttributeMainEdit();
  // console.log(wrapper.debug());
  expect(wrapper.find("div").length).toBe(1);
  // expect(wrapper.find("h6").text()).toEqual("Edit Attribute:");
});

// it('labels save buttons as "Save" when not saving', () => {
//   const wrapper = renderAttributeMainEdit();
//   expect(wrapper.find("button").text()).toBe("Save");
// });

// it('labels save button as "Saving..." when saving', () => {
//   const wrapper = renderAttributeMainEdit({ saving: true });
//   expect(wrapper.find("button").text()).toBe("Saving...");
// });
