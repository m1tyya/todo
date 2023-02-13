import '@/styles/index.scss';

import Head from 'next/head';
import { Provider } from 'react-redux';

import { wrapper } from '../store';

import type { AppProps } from 'next/app';

function MyApp({ Component, ...rest }: AppProps) {
	const { props, store } = wrapper.useWrappedStore(rest);

	return (
		<>
			<Head>
				<meta charSet='utf-8' />
				<meta content='width=device-width, initial-scale=1' name='viewport' />
				<title>Todo</title>
			</Head>
			<Provider store={store}>
				<Component {...props.pageProps} />
			</Provider>
		</>
	);
}

export default MyApp;