import { useAppSelector } from 'src/store';

import styles from './TaskList.module.scss';
import TaskListItem from './TaskListItem';
import { selectFilteredTodoIds } from './todosSlice';

function TaskList() {
	const todoIds = useAppSelector(selectFilteredTodoIds);
	const todosList = todoIds.map(todoId => <TaskListItem id={todoId} key={todoId} />);

	return <div className={styles.todo__list}>{todosList}</div>;
}

export default TaskList;
