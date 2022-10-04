import { MdOutlineFormatColorReset } from 'react-icons/md';

import store, { useAppDispatch } from '@/store';

import styles from './ButtonColorReset.module.scss';
import { colorFilterReset } from './filtersSlice';

function ButtonColorReset() {
	const dispatch = useAppDispatch();
	function handleColorReset() {
		dispatch(colorFilterReset());
		console.log(store.getState().filters.colors);
	}

	return (
		<MdOutlineFormatColorReset
			className={styles.filters__colorReset}
			onClick={handleColorReset}
			title='Reset filters'
		/>
	);
}

export default ButtonColorReset;
