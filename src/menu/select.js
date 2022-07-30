import React from "react";
import { ControlledTreeEnvironment, Tree } from "react-complex-tree";
import "react-complex-tree/lib/style.css";

class Select extends React.Component {

  render() {
    const { dataItems, focusedItem = [], expandedItems = [] } = this.props;
    return (
      <ControlledTreeEnvironment
        items={dataItems}
        getItemTitle={(item) => item.data}
        viewState={{
          "tree-2": {
            focusedItem,
            expandedItems,
          },
        }}
        onFocusItem={(item) => this.props.handleChange("focusedItem", item.index)}
        onExpandItem={(item) => this.props.handleChange("expandedItems", [...expandedItems, item.index])}
        onCollapseItem={(item) =>
          this.props.handleChange(
            "expandedItems",
            expandedItems.filter((expandedItemIndex) => expandedItemIndex !== item.index)
          )
        }
      >
        <Tree treeId="tree-2" rootItem="root" />
      </ControlledTreeEnvironment>
    );
  }
}

export default Select;
