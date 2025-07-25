import { useState } from 'react';
import Start from './components/Start.jsx';

function App() {
	return (
		<>
			<div className='bg-svg'>
				<img
					className='bg-svg-item blob-yellow'
					src='src/assets/yellow_blob.svg'
				/>
				<img className='bg-svg-item blob-blue' src='src/assets/blue_blob.svg' />
			</div>
			<main>
				<Start />
			</main>
		</>
	);
}

export default App;
