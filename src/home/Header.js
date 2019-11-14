import React from "react";
// import {
//   Button,
//   ButtonVariant,
//   Dropdown,
//   DropdownToggle,
//   DropdownItem,
//   DropdownSeparator,
//   PageHeader,
//   Toolbar,
//   ToolbarGroup,
//   ToolbarItem
// } from "@patternfly/react-core";
// make sure you've installed @patternfly/patternfly
// import accessibleStyles from "@patternfly/patternfly/utilities/Accessibility/accessibility.css";
// import { css } from "@patternfly/react-styles";
// import { BellIcon, CogIcon } from "@patternfly/react-icons";

// const header = (isDropdownOpen, onDropdownToggle, onDropdownSelect) => {
//   const userDropdownItems = [
//     <DropdownItem key="1">Link</DropdownItem>,
//     <DropdownItem key="2" component="button">
//       Action
//     </DropdownItem>,
//     <DropdownItem key="3" isDisabled>
//       Disabled Link
//     </DropdownItem>,
//     <DropdownItem key="4" isDisabled component="button">
//       Disabled Action
//     </DropdownItem>,
//     <DropdownSeparator key="5" />,
//     <DropdownItem key="6">Separated Link</DropdownItem>,
//     <DropdownItem key="7" component="button">
//       Separated Action
//     </DropdownItem>
//   ];

//   const PageToolbar = (
//     <Toolbar>
//       <ToolbarGroup
//         className={css(
//           accessibleStyles.screenReader,
//           accessibleStyles.visibleOnLg
//         )}
//       >
//         <ToolbarItem>
//           <Button
//             id="simple-example-uid-01"
//             aria-label="Notifications actions"
//             variant={ButtonVariant.plain}
//           >
//             <BellIcon />
//           </Button>
//         </ToolbarItem>
//         <ToolbarItem>
//           <Button
//             id="simple-example-uid-02"
//             aria-label="Settings actions"
//             variant={ButtonVariant.plain}
//           >
//             <CogIcon />
//           </Button>
//         </ToolbarItem>
//       </ToolbarGroup>
//       <ToolbarGroup>
//         <ToolbarItem
//           className={css(
//             accessibleStyles.screenReader,
//             accessibleStyles.visibleOnMd
//           )}
//         >
//           <Dropdown
//             isPlain
//             position="right"
//             onSelect={onDropdownSelect}
//             isOpen={isDropdownOpen}
//             toggle={
//               <DropdownToggle onToggle={onDropdownToggle}>
//                 Andrew
//               </DropdownToggle>
//             }
//             dropdownItems={userDropdownItems}
//           />
//         </ToolbarItem>
//       </ToolbarGroup>
//     </Toolbar>
//   );

//   return (
//     <PageHeader
//       // logo={<Brand src={imgBrand} alt="Patternfly Logo" />}
//       toolbar={PageToolbar}
//       // avatar={<Avatar src={imgAvatar} alt="Avatar image" />}
//       showNavToggle
//     />
//   );
// };

// export default header;
