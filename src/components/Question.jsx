export default function Question(props) {
	const buttons = props.questionOptions.map((option, index) => {
		return (
			<button
				disabled={props.isFinished}
				key={index}
				data-id={index}
				value={option}
				className={`answer ${
					props.isFinished &&
					props.userAnswerId === index &&
					props.userAnswerId === props.questionAnswerId
						? 'correct'
						: ''
				} ${
					props.isFinished &&
					props.userAnswerId === index &&
					props.userAnswerId !== props.questionAnswerId
						? 'incorrect'
						: ''
				}
				${props.userAnswerId === index ? 'selected' : ''}`}
				type='button'>
				{option}
			</button>
		);
	});

	return (
		<div className='question-box' data-id={props.questionId}>
			<h2 className='question'>
				<span className='question-number'>{props.questionId + 1}</span>
				<span className='question-text'>{props.questionText}</span>
			</h2>
			<div className='answer-box' onClick={props.setAnswer}>
				{buttons}
			</div>
		</div>
	);
}
