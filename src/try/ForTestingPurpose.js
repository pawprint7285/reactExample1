import React, { Component } from "react";
// import { Button } from "@patternfly/react-core";
// import {
//   Toolbar,
//   ToolbarGroup,
//   // ToolbarSection,
//   ToolbarItem
// } from "@patternfly/react-core";
// import {
//   // Avatar,
//   // Brand,
//   Button,
//   ButtonVariant,
//   Card,
//   CardBody,
//   Dropdown,
//   DropdownToggle,
//   DropdownItem,
//   DropdownSeparator,
//   Gallery,
//   GalleryItem,
//   Nav,
//   NavItem,
//   NavList,
//   NavVariants,
//   Page,
//   PageHeader,
//   PageSection,
//   PageSectionVariants,
//   PageSidebar,
//   SkipToContent,
//   TextContent,
//   Text,
//   Toolbar,
//   ToolbarGroup,
//   ToolbarItem
// } from "@patternfly/react-core";
// make sure you've installed @patternfly/patternfly
// import accessibleStyles from "@patternfly/patternfly/utilities/Accessibility/accessibility.css";
// import spacingStyles from "@patternfly/patternfly/utilities/Spacing/spacing.css";
// import { css } from "@patternfly/react-styles";
// import { BellIcon, CogIcon } from "@patternfly/react-icons";
// import "./for-testing-purpose.scss";

class ForTestingPurpose extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDropdownOpen: false,
      activeItem: 0
    };
  }

  // state = {
  //   product: {
  //     prodName: undefined,
  //     catalogId: undefined
  //   }
  // };

  // handleSubmit = () => {
  //   // debugger;
  //   console.log("An essay was submitted: " + this.state.prodName);
  //   event.preventDefault();
  // };

  // handleChange = event => {
  //   const { name, value } = event.target;
  //   console.log("form field value: " + value);
  //   this.setState({
  //     ...this.state.product,
  //     [name]: value
  //   });
  // };

  onDropdownToggle = isDropdownOpen => {
    this.setState({
      isDropdownOpen
    });
  };

  onDropdownSelect = () => {
    this.setState({
      isDropdownOpen: !this.state.isDropdownOpen
    });
  };

  onNavSelect = result => {
    this.setState({
      activeItem: result.itemId
    });
  };

  render() {
    // const catalogOptions = [
    //   { id: 1, text: "Kitchen" },
    //   { id: 2, text: "Consumption" },
    //   { id: 3, text: "Refrigerator" }
    // ];
    // const { isDropdownOpen, activeItem } = this.state;

    // const userDropdownItems = [
    //   <DropdownItem key="1">Link</DropdownItem>,
    //   <DropdownItem key="2" component="button">
    //     Action
    //   </DropdownItem>,
    //   <DropdownItem key="3" isDisabled>
    //     Disabled Link
    //   </DropdownItem>,
    //   <DropdownItem key="4" isDisabled component="button">
    //     Disabled Action
    //   </DropdownItem>,
    //   <DropdownSeparator key="5" />,
    //   <DropdownItem key="6">Separated Link</DropdownItem>,
    //   <DropdownItem key="7" component="button">
    //     Separated Action
    //   </DropdownItem>
    // ];

    // const PageToolbar = (
    //   <Toolbar>
    //     <ToolbarGroup
    //       className={css(
    //         accessibleStyles.screenReader,
    //         accessibleStyles.visibleOnLg
    //       )}
    //     >
    //       <ToolbarItem>
    //         <Button
    //           id="simple-example-uid-01"
    //           aria-label="Notifications actions"
    //           variant={ButtonVariant.plain}
    //         >
    //           <BellIcon />
    //         </Button>
    //       </ToolbarItem>
    //       <ToolbarItem>
    //         <Button
    //           id="simple-example-uid-02"
    //           aria-label="Settings actions"
    //           variant={ButtonVariant.plain}
    //         >
    //           <CogIcon />
    //         </Button>
    //       </ToolbarItem>
    //     </ToolbarGroup>
    //     <ToolbarGroup>
    //       <ToolbarItem
    //         className={css(
    //           accessibleStyles.screenReader,
    //           accessibleStyles.visibleOnMd
    //         )}
    //       >
    //         <Dropdown
    //           isPlain
    //           position="right"
    //           onSelect={this.onDropdownSelect}
    //           isOpen={isDropdownOpen}
    //           toggle={
    //             <DropdownToggle onToggle={this.onDropdownToggle}>
    //               Andrew
    //             </DropdownToggle>
    //           }
    //           dropdownItems={userDropdownItems}
    //         />
    //       </ToolbarItem>
    //     </ToolbarGroup>
    //   </Toolbar>
    // );

    // const PageNav = (
    //   <Nav onSelect={this.onNavSelect} aria-label="Nav">
    //     <NavList variant={NavVariants.simple}>
    //       <NavItem to="#nav-link1" itemId={0} isActive={activeItem === 0}>
    //         System Panel
    //       </NavItem>
    //       <NavItem to="#nav-link2" itemId={1} isActive={activeItem === 1}>
    //         Policy
    //       </NavItem>
    //       <NavItem to="#nav-link3" itemId={2} isActive={activeItem === 2}>
    //         Authentication
    //       </NavItem>
    //       <NavItem to="#nav-link4" itemId={3} isActive={activeItem === 3}>
    //         Network Services
    //       </NavItem>
    //       <NavItem to="#nav-link5" itemId={4} isActive={activeItem === 4}>
    //         Server
    //       </NavItem>
    //     </NavList>
    //   </Nav>
    // );

    // const Header = (
    //   <PageHeader
    //     // logo={<Brand src={imgBrand} alt="Patternfly Logo" />}
    //     toolbar={PageToolbar}
    //     // avatar={<Avatar src={imgAvatar} alt="Avatar image" />}
    //     showNavToggle
    //   />
    // );

    // const Sidebar = <PageSidebar nav={PageNav} />;

    // const PageSkipToContent = (
    //   <SkipToContent href="#main-content-page-layout-default-nav">
    //     Skip to Content
    //   </SkipToContent>
    // );

    return (
      <React.Fragment>
        {/* <Page
          header={Header}
          sidebar={Sidebar}
          isManagedSidebar
          skipToContent={PageSkipToContent}
        > */}
        {/* <PageSection variant={PageSectionVariants.light}> */}
        {/* <TextContent> */}
        {/* <Text component="h1">Main Title</Text> */}
        {/* <Text component="p">
                Body text should be Overpass Regular at 16px. It should have
                leading of 24px because <br />
                of it’s relative line height of 1.5.
              </Text> */}
        {/* </TextContent> */}
        {/* </PageSection> */}
        {/* <PageSection> */}
        {/* <Gallery gutter="md"> */}
        {/* {Array.apply(0, Array(10)).map((x, i) => (
                <GalleryItem key={i}>
                  <Card>
                    <CardBody>This is a card</CardBody>
                  </Card>
                </GalleryItem>
              ))} */}
        {/* </Gallery> */}
        {/* </PageSection> */}
        {/* </Page> */}
      </React.Fragment>
      // <Toolbar>
      //   <ToolbarGroup>
      //     <ToolbarItem>Item 1</ToolbarItem>
      //   </ToolbarGroup>
      //   <ToolbarGroup>
      //     <ToolbarItem>Item 2</ToolbarItem>
      //     <ToolbarItem>Item 3</ToolbarItem>
      //   </ToolbarGroup>
      //   <ToolbarGroup>
      //     <ToolbarItem>Item 4</ToolbarItem>
      //   </ToolbarGroup>
      // </Toolbar>
      // <div className="testing">
      //   <Button className="test-patternfly" variant="primary">
      //     Primary Button
      //   </Button>{" "}
      //   <form onSubmit={this.handleSubmit}>
      //     <input
      //       type="text"
      //       name="prodName"
      //       label="Product name"
      //       className="form-control"
      //       value={this.state.product.prodName}
      //       onChange={this.handleChange}
      //     />
      //     <select
      //       name="catalogId"
      //       className="form-control"
      //       label="Catalog"
      //       value={this.state.product.catalogId}
      //       onChange={this.handleChange}
      //     >
      //       <option value="">Set Catalog</option>
      //       {catalogOptions.map(option => {
      //         return (
      //           <option key={option.id} value={option.id}>
      //             {option.text}
      //           </option>
      //         );
      //       })}
      //     </select>
      //     <button type="submit" className="btn btn-primary">
      //       Save
      //     </button>
      //   </form>
      // </div>
    );
  }
}

// doing nothing just push for develop branch build
export default ForTestingPurpose;
