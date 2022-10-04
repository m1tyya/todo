import { capitalize } from 'lodash';
import { useState } from 'react';
import { MdColorize, MdOutlineCancel } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from 'src/store';

import { Color } from '../sidebar/filtersSlice';

import Checkmark from './Checkmark';
import styles from './TaskListItem.module.scss';
import { colorChanged, selectTodoById, todoDeleted } from './todosSlice';


function TaskListItem({ id }) {
	const dispatch = useAppDispatch();
	const todo = useAppSelector(state => selectTodoById(state, id));
	const [color, setColor] = useState(todo.color);

	function handleColorChange(event) {
		const newColor = event.currentTarget.value;
		dispatch(colorChanged({ color: newColor, id: todo.id }));
		setColor(newColor);
	}

	function handleDelete() {
		dispatch(todoDeleted(id));
	}

	const colorList = Object.keys(Color).map(color => (
		<option key={color} value={color}>
			{capitalize(color)}
		</option>
	));

	return (
		<div className={styles.todo__listItem}>
			<Checkmark id={todo.id} />
			<p className={styles.todo__listText}>{todo.text}</p>
			<select
				className={styles.todo__colorMenu}
				onChange={handleColorChange}
				value={color}>
				{colorList}
			</select>
			<MdColorize className={styles.todo__colorMenuIcon} style={{ color: Color[color] }} />
			<button className={styles.todo__remove} onClick={handleDelete}>
				<MdOutlineCancel className={styles.todo__removeIcon} title='Delete' />
			</button>
		</div>
	);
}

export default TaskListItem;
