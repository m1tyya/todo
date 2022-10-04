import classNames from 'classnames/bind';
import { useAppDispatch, useAppSelector } from 'src/store';

import { Color, colorFilterToggled, selectFilterColors } from '@/features/sidebar/filtersSlice';

import styles from './ButtonColor.module.scss';

const cx = classNames.bind(styles);


interface ButtonColorProps {
	color: Color,
	title: string,
}

function ButtonColor({ color, title }: ButtonColorProps) {
	const activeColors = useAppSelector(state => selectFilterColors(state));

	const dispatch = useAppDispatch();
	const colorStyle = {
		backgroundColor: color,
	};

	const classes = cx('btnColor', {
		highlited: activeColors.includes(color),
	});

	function handleColorFilter() {
		dispatch(colorFilterToggled(color));
	}

	return (
		<button
			className={classes}
			onClick={handleColorFilter}
			style={colorStyle}
			title={title}
		></button>
	);
}

export default ButtonColor;
