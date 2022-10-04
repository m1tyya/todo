import styles from './GridItem.module.scss';

function GridItem({ children }) {
	return <div className={styles.gridItem}>{children}</div>;
}

export default GridItem;
