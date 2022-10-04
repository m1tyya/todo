import Container from '@/features/container/Container';
import GridItem from '@/features/container/GridItem';
import Header from '@/features/header/Header';
import Sidebar from '@/features/sidebar/Sidebar';
import TaskList from '@/features/todos/TaskList';

function App() {
	return (
		<Container>
			<GridItem>
				<Header />
				<TaskList />
			</GridItem>
			<GridItem>
				<Sidebar />
			</GridItem>
		</Container>
	);
}

export default App;
