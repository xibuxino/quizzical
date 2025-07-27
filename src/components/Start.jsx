export default function Start(props) {
	return (
		<section className='start'>
			<h1 className='start-title'>Quizzical</h1>
			<p className='start-description'>
				Challenge yourself with quick, engaging quizzes across various topics
				and see how much you really know. Ready to prove yourself? Start your
				first quiz now!
			</p>
			<form className='start-settings' onSubmit={props.handleStartGame}>
				<label className='input-label' htmlFor='questions-amount'>
					Number of questions:
				</label>
				<input
					defaultValue={props.numberOfQuestions}
					name='questions-amount'
					className='input'
					id='questions-amount'
					type='number'
					min='1'
					max='50'
				/>
				<label className='input-label' htmlFor='questions-difficulty'>
					Choose difficulty:
				</label>
				<select
					defaultValue={props.difficulty}
					className='input'
					name='questions-difficulty'
					id='questions-difficulty'>
					<option value='easy'>Easy</option>
					<option value='medium'>Medium</option>
					<option value='hard'>Hard</option>
				</select>
				<button className='btn start-btn' type='submit'>
					Start quiz
				</button>
			</form>
		</section>
	);
}
