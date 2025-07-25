export default function Question(props) {
	return (
		<div className='question-box'>
			<h2 className='question'>How would one say goodbye in Spanish?</h2>
			<div className='answer-box'>
				<button
					className={
						props.answer === 1
							? 'answer answer-one selected'
							: 'answer answer-one'
					}
					type='button'>
					Answer
				</button>
				<button
					className={
						props.answer === 2
							? 'answer answer-one selected'
							: 'answer answer-one'
					}
					type='button'>
					Answer 2
				</button>
				<button
					className={
						props.answer === 3
							? 'answer answer-one selected'
							: 'answer answer-one'
					}
					type='button'>
					Answer 3
				</button>
				<button
					className={
						props.answer === 4
							? 'answer answer-one selected'
							: 'answer answer-one'
					}
					type='button'>
					Answer 4
				</button>
			</div>
		</div>
	);
}
