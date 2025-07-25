import { useState } from 'react';
import Start from './components/Start.jsx';
import Question from './components/Question.jsx';

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
				{/* <Start /> */}
				<Question answer={1} />
				<Question answer={2} />
				<Question answer={3} />
				<Question answer={2} />
				<button type='button' className=' btn btn-check'>
					Check answers
				</button>
			</main>
		</>
	);
}

export default App;
