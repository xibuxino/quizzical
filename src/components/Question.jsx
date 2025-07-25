export default function Question(props) {
	const buttons = props.questionOptions.map((option, index) => {
		return (
			<button
				key={index}
				data-id={index}
				value={option}
				className={`answer ${props.userAnswerId === index ? 'selected' : ''}`}
				type='button'>
				{option}
			</button>
		);
	});

	return (
		<div className='question-box' data-id={props.questionId}>
			<h2 className='question'>{props.questionText}</h2>
			<div className='answer-box' onClick={props.selectAnswer}>
				{buttons}
			</div>
		</div>
	);
}
