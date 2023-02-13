import { useAppDispatch } from '@/store';

import styles from './ButtonAction.module.scss';


interface ButtonActionProps {
	text: string,
	action: () => void,
}

function ButtonAction({ action, text }: ButtonActionProps) {
	const dispatch = useAppDispatch();

	function handleAction(action) {
		dispatch(action());
	}

	return (
		<button className={styles.sidebar__btn} onClick={() => handleAction(action)} >
			{text}
		</button>
	);
}

export default ButtonAction;