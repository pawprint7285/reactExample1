import React from "react";
import RangeMainEdit from "./RangeMainEdit";
import { shallow } from "enzyme";

function renderRangeMainEdit(args) {
  const defaultProps = {
    // authors: [],
    // course: {},
    // saving: false,
    range: {},
    // onSave: () => {},
    onChange: () => {}
  };

  const props = { ...defaultProps, ...args };
  return shallow(<RangeMainEdit {...props} />);
}

it("should render Edit Range: ", () => {
  const wrapper = renderRangeMainEdit();
  // console.log(wrapper.debug());
  expect(wrapper.find("div").length).toBe(3);
  // expect(wrapper.find("h6").text()).toEqual("Edit Range:");
});

// it('labels save buttons as "Save" when not saving', () => {
//   const wrapper = renderRangeMainEdit();
//   expect(wrapper.find("button").text()).toBe("Save");
// });

// it('labels save button as "Saving..." when saving', () => {
//   const wrapper = renderRangeMainEdit({ saving: true });
//   expect(wrapper.find("button").text()).toBe("Saving...");
// });
