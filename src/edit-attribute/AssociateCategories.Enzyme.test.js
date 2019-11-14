import React from "react";
import AssociateCategories from "./AssociateCategories";
import { shallow } from "enzyme";
import { bool } from "prop-types";

function renderAssociateCategories(args) {
  const defaultProps = {
    // authors: [],
    // course: {},
    // saving: false,
    associate: [],
    // onSave: () => {},
    loading: () => {}
  };

  const props = { ...defaultProps, ...args };
  return shallow(<AssociateCategories {...props} />);
}

it("should render Edit Attribute: ", () => {
  const wrapper = renderAssociateCategories();
  // console.log(wrapper.debug());
  expect(wrapper.find("div").length).toBe(4);
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
