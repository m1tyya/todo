import { useState } from 'react';
import styles from './Header.module.scss';
import { MdTaskAlt } from 'react-icons/md';
import { useAppDispatch } from 'src/store';
import { todoAdded } from '@/features/todos/todosSlice';

function Header() {
	const [newTodoText, setNewTodoText] = useState('');
	const dispatch = useAppDispatch();

	function handleSubmit(event) {
		event.preventDefault();
		const trimmedTodoText = newTodoText.trim();
		dispatch(todoAdded(trimmedTodoText));
		setNewTodoText('');
	}
	return (
		<header className={styles.header}>
			<form className={styles.header__form} onSubmit={event => handleSubmit(event)}>
				<MdTaskAlt className={styles.header__icon} />
				<input
					className={styles.header__input}
					onChange={event => setNewTodoText(event.target.value)}
					placeholder='Add a task'
					type='text'
					value={newTodoText}
				/>
			</form>
		</header>
	);
}

export default Header;
