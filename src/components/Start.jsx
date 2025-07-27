export default function Start(props) {
	return (
		<section className='start'>
			<h1 className='start-title'>Quizzical</h1>
			<p className='start-description'>
				Challenge yourself with quick, engaging quizzes across various topics
				and see how much you really know. Ready to prove yourself? Start your
				first quiz now!
			</p>
			<form className='start-settings'>
				<label className='input-label' htmlFor='questions-amount'>
					Set number of questions:
				</label>
				<input
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
					className='input'
					name=' questions-difficulty'
					id='questions-difficulty'>
					<option value='easy'>Easy</option>
					<option value='medium' selected>
						Medium
					</option>
					<option value='hard'>Hard</option>
				</select>
			</form>

			<button className='btn start-btn' type='button'>
				Start quiz
			</button>
		</section>
	);
}
