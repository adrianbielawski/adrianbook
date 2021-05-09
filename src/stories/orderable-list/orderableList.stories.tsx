import React, { ComponentProps, useRef, useState } from 'react'
import { Story } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import OrderableList, { ItemComponentProps, OnRemoveParams } from '@adrianbielawski/orderable-list'
import './orderableList.css'

const Item = (params: ItemComponentProps<string>) => {
	let className = "grabable item"
	if (params.grabbed) {
		className += ' grabbed'
	}
	return (
		<div className="wrapper">
			<OrderableList.Grabbable className={className}>
				{params.item}
			</OrderableList.Grabbable>
		</div>
	)
}

const ItemWithGrabButton = (params: ItemComponentProps<string>) => {
	let className = "item"
	if (params.grabbed) {
		className += ' grabbed'
	}
	return (
		<div className="wrapper">
			<div className={className}>
				<OrderableList.Grabbable className="grab">
					Grab
				</OrderableList.Grabbable>
				{params.item}
			</div>
		</div>
	)
}

const RemovableItem = (params: ItemComponentProps<string>) => {
	let className = "grabable removable item"
	if (params.grabbed) {
		className += ' grabbed'
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
	)
}

const initialItems = [
	'Small item',
	'Slightly bigger, two lines item',
	'Large item, this is second bigest item displays three lines',
	'Very, very large item. This is the biggest item on this fancy list and also the last one'
]

const Template: Story<ComponentProps<typeof OrderableList>> = (args) => {
	const [items, setItems] = useState<string[]>(initialItems)
	const inputRef = useRef<HTMLInputElement>(null)

	const handleAddItem = (e: React.FormEvent) => {
		e.preventDefault()
		inputRef.current!.focus()

		if (inputRef.current!.value.length === 0) {
			return
		}

		setItems([inputRef.current!.value, ...items])
		inputRef.current!.value = ''
	}

	const handleRemove = (params: OnRemoveParams<string>) => {
		action('onRemove')(params)
		setItems(params.newItems)
	}

	return (
		<>
			<input
				placeholder="Item text"
				ref={inputRef}
			/>
			<button onClick={handleAddItem} >
				Add item
			</button>
			<OrderableList
				{...args}
				items={items}
				className="list"
				onRemove={handleRemove}
			/>
		</>
	)
}

export default {
	title: 'OrderableList',
	component: OrderableList,
	argTypes: {
		onDrop: { action: 'item dropped' },
		onRemove: { action: 'item removed' }
	}
}

export const Primary = Template.bind({})
Primary.args = {
	itemComponent: Item,
}

export const WithGrabButton = Template.bind({})
WithGrabButton.args = {
	itemComponent: ItemWithGrabButton,
}

export const RemovableItems = Template.bind({})
RemovableItems.args = {
	itemComponent: RemovableItem,
	animationDirection: 'right',
}
RemovableItems.argTypes = {
	animationDirection: {
		options: ['right', 'left'],
		control: { type: 'radio' }
	}
}