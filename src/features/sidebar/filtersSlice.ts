import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum FilterStatus {
	All = 'All',
	Active = 'Active',
	Completed = 'Completed',
}

export enum Color {
	None = '',
	Blue = 'hsl(229 60% 48%)',
	Green = 'hsl(88 68% 50%)',
	Orange = 'hsl(18 78% 56%)',
	Purple = 'hsl(277 57% 51%)',
	Red = 'hsl(0 57% 50%)',
}

export type FiltersState = {
	colors: Array<Color>,
	status: FilterStatus,
};

const initialState: FiltersState = {
	colors: [],
	status: FilterStatus.All,
};

const filtersReducer = createSlice({
	initialState,
	name: 'filters',
	reducers: {
		colorFilterReset(state) {
			state.colors = [];
		},
		colorFilterToggled(state, action: PayloadAction<Color>) {
			const filterActive = state.colors.includes(action.payload);
			if (filterActive) {
				state.colors = state.colors.filter(color => color !== action.payload);
			} else {
				state.colors = state.colors.concat(action.payload);
			}
		},
		statusFilterChanged(state, action: PayloadAction<FilterStatus>) {
			state.status = action.payload;
		},
	},
});

export const { colorFilterReset, colorFilterToggled, statusFilterChanged } =
	filtersReducer.actions;

export default filtersReducer.reducer;

const selectFilters = state => state.filters;

export const selectFilterStatus = createSelector(
	selectFilters,
	filters => filters.status,
);

export const selectFilterColors = createSelector(
	selectFilters,
	filters => filters.colors,
);