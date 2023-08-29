import type { Meta, StoryObj } from "@storybook/react";
import React, { useRef, useState } from "react";
import { action } from "@storybook/addon-actions";
import OrderableList, {
  OrderableListProps,
  ItemComponentProps,
  OnDropParams,
  OnRemoveParams,
} from "@adrianbielawski/orderable-list";
import "./orderableList.css";

const Item = (params: ItemComponentProps<string>) => {
  let className = "grabbable item";
  if (params.grabbed) {
    className += " grabbed";
  }
  return (
    <div className="wrapper">
      <OrderableList.Grabbable className={className}>
        {params.item}
      </OrderableList.Grabbable>
    </div>
  );
};

const ItemWithGrabButton = (params: ItemComponentProps<string>) => {
  let className = "item";
  if (params.grabbed) {
    className += " grabbed";
  }
  return (
    <div className="wrapper">
      <div className={className}>
        <OrderableList.Grabbable className="grab">Grab</OrderableList.Grabbable>
        {params.item}
      </div>
    </div>
  );
};

const RemovableItem = (params: ItemComponentProps<string>) => {
  let className = "grabbable removable item";
  if (params.grabbed) {
    className += " grabbed";
  }
  return (
    <div className="wrapper">
      <OrderableList.Grabbable className={className}>
        {params.item}
        <OrderableList.RemoveButton className="remove-button">
          Remove
        </OrderableList.RemoveButton>
      </OrderableList.Grabbable>
    </div>
  );
};

const initialItems = [
  "Small item",
  "Slightly bigger, two lines item",
  "Large item, this is second biggest item displays three lines",
  "Very, very large item. This is the biggest item on this fancy list and also the last one",
];

const Form = ({ onSubmit }: { onSubmit: (value: string) => void }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    inputRef.current!.focus();

    if (inputRef.current!.value.length === 0) {
      return;
    }

    onSubmit(inputRef.current!.value);
    inputRef.current!.value = "";
  };

  return (
    <>
      <input placeholder="Item text" ref={inputRef} />
      <button onClick={handleAddItem}>Add item</button>
    </>
  );
};

const ListWithForm = (args?: Partial<OrderableListProps<string>>) => {
  const [items, setItems] = useState<string[]>(initialItems);

  const onSubmit = (value: string) => {
    setItems([value, ...items]);
  };

  const onRemove = (params: OnRemoveParams<string>) => {
    action("onRemove")(params);
    setItems(params.newItems);
  };

  const onDrop = (params: OnDropParams<string>) => {
    action("onDrop")(params);
  };

  return (
    <>
      <Form onSubmit={onSubmit} />
      <OrderableList
        items={items}
        itemComponent={Item}
        className="list"
        onRemove={onRemove}
        onDrop={onDrop}
        {...args}
      />
    </>
  );
};
const meta: Meta<typeof ListWithForm> = {
  component: ListWithForm,
  title: "Orderable-list/Examples",
};

type Story = StoryObj<typeof ListWithForm>;

export const Primary: Story = { args: {} };

export const WithGrabButton: Story = {
  ...Primary,
  args: { itemComponent: ItemWithGrabButton },
};

export const RemovableItemsWithGrabButton: Story = {
  ...Primary,
  args: { itemComponent: RemovableItem, animationDirection: "left" },
  parameters: { expanded: true },
};
RemovableItemsWithGrabButton.argTypes = {
  animationDirection: {
    options: ["right", "left"],
    control: { type: "radio" },
    description: "Direction of animation on removed item",
  },
};

export default meta;
