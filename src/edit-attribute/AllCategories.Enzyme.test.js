import React from "react";
import AllCategories from "./AllCategories";
import { shallow } from "enzyme";
import { bool } from "prop-types";

function renderAllCategories(args) {
  const defaultProps = {
    // authors: [],
    // course: {},
    // saving: false,
    categories: [],
    // onSave: () => {},
    loading: () => {}
  };

  const props = { ...defaultProps, ...args };
  return shallow(<AllCategories {...props} />);
}

it("should render Edit Attribute: ", () => {
  const wrapper = renderAllCategories();
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
