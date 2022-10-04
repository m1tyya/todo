import classNames from 'classnames/bind';
import { useAppDispatch, useAppSelector } from 'src/store';

import { selectFilterStatus } from '@/features/sidebar/filtersSlice';

import styles from './ButtonStatus.module.scss';
import { FilterStatus, statusFilterChanged } from './filtersSlice';

interface ButtonStatusProps {
	text: string,
	status: FilterStatus,
}

const cx = classNames.bind(styles);

function ButtonStatus({ status, text }: ButtonStatusProps) {
	const dispatch = useAppDispatch();
	const currentStatus = useAppSelector(state => selectFilterStatus(state));
	const classes = cx(
		'sidebar__btn',
		{
			highlited: status === currentStatus,
		},
	);

	function handleStatusChange(newStatus) {
		dispatch(statusFilterChanged(newStatus));
	}

	return (
		<button className={classes} onClick={() => handleStatusChange(status)}>
			{text}
		</button>
	);
}

export default ButtonStatus;