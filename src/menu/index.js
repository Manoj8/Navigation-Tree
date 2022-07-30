import React, { Component } from "react";

import { toast } from "react-toast";
import { UncontrolledTreeEnvironment, StaticTreeDataProvider, Tree } from "react-complex-tree";
import Select from "./select";
import dataItems from "../select";
import "./menu.css";

export default class Menu extends Component {
  constructor() {
    super();
    this.state = {
      menuItems: dataItems.items,
      newCategory: "",
      focusedItem: [],
      expandedItems: [],
      isNavOpen: false,
    };
  }

  handleChange = (name, value) => {
    this.setState({ [name]: value });
  };

  addMenu = () => {
    let { menuItems = {}, newCategory = "", focusedItem = [] } = this.state;
    const newMenu = newCategory + Math.floor(Math.random() * 1000);
    if (!menuItems[focusedItem]["hasChildren"]) {
      menuItems[focusedItem]["hasChildren"] = true;
    }
    menuItems[focusedItem]["children"].push(newMenu);
    menuItems = {
      ...menuItems,
      [newMenu]: {
        index: newMenu,
        hasChildren: false,
        children: [],
        data: newCategory,
      },
    };
    this.setState({ menuItems, newCategory: "" }, () => {
      toast.success("Successfully added the data");
    });
  };

  deleteMenu = (menuIndex, subIndex) => {

  };

  render() {
    const { menuItems, focusedItem = [], expandedItems = [], newCategory, isNavOpen } = this.state;
    const list = (<UncontrolledTreeEnvironment dataProvider={new StaticTreeDataProvider(menuItems, (item, data) => ({ ...item, data }))} getItemTitle={(item) => item.data} viewState={{}}>
    <Tree treeId="tree-1" rootItem="root" treeLabel="Tree Example" />
  </UncontrolledTreeEnvironment>);
    return (
      <div className="menu-categories">
        <span className="nav-icon" onClick={() => this.handleChange("isNavOpen", true)}>
          &#9776;
        </span>

        <div className="nav-bar">
          {list}
        </div>

        {isNavOpen && <div className="side-nav">
          <span className="close-btn" onClick={() => this.handleChange("isNavOpen", false)}>
            X
          </span>
          {list}
        </div>}

        <div className="category-form">
          <div className="form new-category">
            <p>Enter New Category</p>
            <input type="text" className="input-field" name="newCategory" value={newCategory} onChange={(ev) => this.handleChange("newCategory", ev.target.value)} />
          </div>

          <div className="form category">
            <p>Select Category </p>
            <Select dataItems={menuItems} handleChange={this.handleChange} focusedItem={focusedItem} expandedItems={expandedItems} addMenu={this.addMenu} />
          </div>

          <button className="form add-button" disabled={focusedItem.length === 0 || newCategory.length === 0} onClick={this.addMenu}>
            Add Category
          </button>

        </div>
      </div>
    );
  }
}
