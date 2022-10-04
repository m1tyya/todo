import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Color, FiltersState, FilterStatus } from '../sidebar/filtersSlice';

type TodosState = {
	color: Color,
	completed: boolean,
	id: number,
	text: string,
};

const initialState: Array<TodosState> = [
	// { id: 0, text: 'Learn React', completed: true },
	// { id: 1, text: 'Learn Redux', completed: false, color: 'purple' },
	// { id: 2, text: 'Build something fun!', completed: false, color: 'blue' },
];

const todosReducer = createSlice({
	initialState,
	name: 'todos',
	reducers: {
		allCompleted(state) {
			state.map(todo => (todo.completed = true));
		},
		colorChanged(state, action: PayloadAction<{ color: Color, id: number, }>) {
			state.map(todo => {
				if (todo.id === action.payload.id) {
					todo.color = action.payload.color;
				}

				return todo;
			});
		},
		completedCleared(state) {
			return state.filter(todo => !todo.completed);
		},
		todoAdded(state, action: PayloadAction<string>) {
			return state.concat({
				color: Color.None,
				completed: false,
				id: generateId(state),
				text: action.payload,
			});
		},
		todoDeleted(state, action: PayloadAction<number>) {
			return state.filter(todo => todo.id !== action.payload);
		},
		todoToggled(state, action: PayloadAction<number>) {
			const todoIndex = state.findIndex(todo => todo.id === action.payload);
			state.at(todoIndex)!.completed = !state.at(todoIndex)!.completed;
		},
		todosLoaded(state, action: PayloadAction<Array<TodosState>>) {
			return action.payload;
		},
	},
});

function generateId(todos: Array<TodosState>) {
	const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1);

	return maxId + 1;
}

export const { allCompleted, colorChanged, completedCleared, todoAdded, todoDeleted, todoToggled } =
	todosReducer.actions;

export default todosReducer.reducer;

const selectTodos = state => state.todos;

export const selectTodoById = (state, todoId): TodosState => selectTodos(state).find(todo => todo.id === todoId);

export const selectFilteredTodos = createSelector(
	selectTodos,
	state => state.filters,
	(todos: Array<TodosState>, filters: FiltersState) => {
		const { colors, status } = filters;
		
		const showAll = (status === FilterStatus.All && colors.length === 0);
		
		if (showAll) {
			return todos;
		}

		const newTodos = [...todos];

		const filteredTodos = newTodos.filter(todo => {
			let statusMatches: boolean;

			switch (status) {
				case FilterStatus.Active:
					statusMatches = !todo.completed;
					break;
				case FilterStatus.Completed:
					statusMatches = todo.completed;
					break;
				case FilterStatus.All:
					statusMatches = true;
					break;
			}
			
			let colorMatches: boolean;
			if (colors.length === 0) {
				colorMatches = true;
			} else if (!todo.color) {
				colorMatches = false;
			} else {
				colorMatches = colors.includes(Color[todo.color]);
			}
			
			return statusMatches && colorMatches;
		});

		return filteredTodos;
	},
);

export const selectFilteredTodoIds = createSelector(
	selectFilteredTodos,
	filteredTodos => filteredTodos.map(todo => todo.id),
);