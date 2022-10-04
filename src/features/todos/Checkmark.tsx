import { useAppDispatch, useAppSelector } from 'src/store';

import styles from './Checkmark.module.scss';
import { selectTodoById, todoToggled } from './todosSlice';

function Checkmark({ id }) {
	switch (id) {
		case 'sd':
			break;
		case 'sdd':
			break;
	}

	const dispatch = useAppDispatch();
	const todo = useAppSelector(state => selectTodoById(state, id));
	const { completed } = todo;
	const loadComplete = completed ? styles.loadComplete : '';
	const checkmark = completed ? styles.checkmark : '';

	function handleCheckmark() {
		dispatch(todoToggled(id));
	}
	
	return (
		<>
			<button
				className={`
					${styles.circleLoader}
					${loadComplete}
				`}
				onClick={handleCheckmark}
			>
				<div
					className={`
						${checkmark}
						${styles.checkmarkDraw}
					`}
				></div>
			</button>
		</>
	);
}

export default Checkmark;
