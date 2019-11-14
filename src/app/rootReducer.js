import { combineReducers } from "redux";
import courses from "../courses";
import authors from "../lookup/authors";
import apiCallsStatus from "../utilities/api-status";
import attributeReducer from "../attributes/";
import categoryReducer from "../category";
import categoryAttributesReducer from "../categoryAttribute";
import categoryInfoReducer from "../categoryInfo";
import editRange from "../edit-range";
import editAttribute from "../edit-attribute";

const rootReducer = combineReducers({
  courses,
  authors,
  apiCallsStatus,
  attributeReducer, // this redux state shape is not that correct
  categoryReducer,
  categoryAttributesReducer,
  categoryInfoReducer,
  editRange,
  editAttribute
});

export default rootReducer;
