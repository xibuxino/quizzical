export default function Question(props) {
	return (
		<div className='question-box' data-id={props.questionId}>
			<h2 className='question'>{props.questionText}</h2>
			<div className='answer-box' onClick={props.selectAnswer}>
				<button
					data-id='0'
					value={props.answer1}
					className={
						props.userAnswerId === 0
							? 'answer answer-one selected'
							: 'answer answer-one'
					}
					type='button'>
					{props.questionOption1}
				</button>
				<button
					data-id='1'
					className={
						props.userAnswerId === 1
							? 'answer answer-one selected'
							: 'answer answer-one'
					}
					type='button'>
					{props.questionOption2}
				</button>
				<button
					data-id='2'
					className={
						props.userAnswerId === 2
							? 'answer answer-one selected'
							: 'answer answer-one'
					}
					type='button'>
					{props.questionOption3}
				</button>
				<button
					data-id='3'
					className={
						props.userAnswerId === 3
							? 'answer answer-one selected'
							: 'answer answer-one'
					}
					type='button'>
					{props.questionOption4}
				</button>
			</div>
		</div>
	);
}
