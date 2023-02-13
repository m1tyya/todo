import { Manrope } from '@next/font/google';
import { clsx } from 'clsx';

import { Color, FilterStatus } from '@/features/sidebar/filtersSlice';
import { allCompleted, completedCleared } from '@/features/todos/todosSlice';

import ButtonAction from './ButtonAction';
import ButtonColor from './ButtonColor';
import ButtonColorReset from './ButtonColorReset';
import ButtonStatus from './ButtonStatus';
import styles from './Sidebar.module.scss';

const manrope = Manrope();


function Sidebar() {
	return (
		<div className={clsx(styles.sidebar, manrope.className)}>
			<h2 className={styles.sidebar__title}>Actions</h2>
			<ButtonAction action={() => allCompleted()} text='Mark All Completed' />
			<ButtonAction action={() => completedCleared()} text='Clear Completed' />
			<h2 className={styles.sidebar__title}>Status</h2>
			{Object.keys(FilterStatus).map((filter, index) => (
				<ButtonStatus
					key={index}
					status={FilterStatus[filter]}
					text={filter}
				/>
			))}
			<h2 className={styles.sidebar__title}>Colors</h2>
			<div className={styles.sidebar__colorFilters}>
				{Object.keys(Color).map((color, index) => {
					if (Color[color] !== Color.None) {
						return (<ButtonColor color={Color[color]} key={index} title={color} />);
					}
				})}
				<ButtonColorReset />
			</div>
		</div>
	);
}

export default Sidebar;
