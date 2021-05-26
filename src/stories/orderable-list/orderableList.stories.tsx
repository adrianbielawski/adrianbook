import React, { ComponentProps, useRef, useState } from 'react'
import { Story } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import OrderableList, { ItemComponentProps, OnDropParams, OnRemoveParams } from '@adrianbielawski/orderable-list'
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

const Form: React.FC<any> = (props) => {
	const { onSubmit } = props
	const inputRef = useRef<HTMLInputElement>(null)

	const handleAddItem = (e: React.FormEvent) => {
		e.preventDefault()
		inputRef.current!.focus()

		if (inputRef.current!.value.length === 0) {
			return
		}

		onSubmit(inputRef.current!.value)
		inputRef.current!.value = ''
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
		</>
	)
}

const Template: Story<ComponentProps<typeof OrderableList>> = (args) => {
	const [items, setItems] = useState<string[]>(initialItems)

	const onSubmit = (value: string) => {
		setItems([value, ...items])
	}

	const onRemove = (params: OnRemoveParams<string>) => {
		action('onRemove')(params)
		setItems(params.newItems)
	}

	const onDrop = (params: OnDropParams<string>) => {
		action('onDrop')(params)
	}

	return (
		<>
			<Form onSubmit={onSubmit} />
			<OrderableList
				{...args}
				items={items}
				className="list"
				onRemove={onRemove}
				onDrop={onDrop}
			/>
		</>
	)
}

export default {
	title: 'Orderable-list/Examples',
	component: OrderableList,
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
	animationDirection: 'left',
}
RemovableItems.parameters = {
	controls: { expanded: true }
}
RemovableItems.argTypes = {
	animationDirection: {
		options: ['right', 'left'],
		control: { type: 'radio' },
		description: 'Direction of animation on removed item'
	}
}