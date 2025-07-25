import { useState, useEffect } from 'react';
import Start from './components/Start.jsx';
import Question from './components/Question.jsx';
import getQuestions from './api/questions.js';

function App() {
	const numberOfQuestions = 4;

	// states
	const [isLoading, setIsLoading] = useState(true);
	const [userAnswer, setUserAnswer] = useState(
		Array.from({ length: numberOfQuestions }, () => ({
			userAnswerId: null,
		}))
	);
	const isAllSelected = userAnswer.every(
		(answer) => answer.userAnswerId !== null
	);

	useEffect(() => {
		async function fetchQuestions() {
			try {
				const data = getQuestions(numberOfQuestions);
				console.log(data);
			} catch (err) {
				console.log('blad');
			} finally {
				setIsLoading(false);
			}
		}
		fetchQuestions();
	}, []);

	const [questions, setQuestions] = useState([
		{
			questionId: 0,
			questionAnswerId: 1,
			questionText: 'Question text1',
			questionOptions: [
				'question 1 option 1',
				'question 1 option 2',
				'question 1 option 3',
				'question 1 option 4',
			],
		},
		{
			questionId: 1,
			questionAnswerId: 0,
			questionText: 'Question text2',
			questionOptions: [
				'question 2 option 1',
				'question 2 option 2',
				'question 2 option 3',
				'question 2 option 4',
			],
		},
		{
			questionId: 2,
			questionAnswerId: 2,
			questionText: 'Question text3',
			questionOptions: [
				'question 3 option 1',
				'question 3 option 2',
				'question 3 option 3',
				'question 3 option 4',
			],
		},
		{
			questionId: 3,
			questionAnswerId: 2,
			questionText: 'Question text4',
			questionOptions: [
				'question 4 option 1',
				'question 4 option 2',
				'question 4 option 3',
				'question 4 option 4',
			],
		},
	]);

	function selectAnswer(e) {
		const parentId = Number(e.currentTarget.parentElement.dataset.id);
		const answerId = Number(e.target.dataset.id);
		if (e.target.type !== 'button') return;
		setUserAnswer(
			userAnswer.map((item, index) =>
				index === parentId ? { userAnswerId: answerId } : item
			)
		);
	}

	const questionFields = questions.map((q, index) => <h1>Test</h1>);

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
				<Question
					questionText={questions[0].questionText}
					questionId={0}
					questionOption1={questions[0].questionOptions[0]}
					questionOption2={questions[0].questionOptions[1]}
					questionOption3={questions[0].questionOptions[2]}
					questionOption4={questions[0].questionOptions[3]}
					selectAnswer={selectAnswer}
					userAnswerId={userAnswer[0].userAnswerId}
				/>
				<Question
					questionText={questions[1].questionText}
					questionId={1}
					questionOption1={questions[1].questionOptions[0]}
					questionOption2={questions[1].questionOptions[1]}
					questionOption3={questions[1].questionOptions[2]}
					questionOption4={questions[1].questionOptions[3]}
					selectAnswer={selectAnswer}
					userAnswerId={userAnswer[1].userAnswerId}
				/>
				<Question
					questionText={questions[2].questionText}
					questionOption1={questions[2].questionOptions[0]}
					questionOption2={questions[2].questionOptions[1]}
					questionOption3={questions[2].questionOptions[2]}
					questionOption4={questions[2].questionOptions[3]}
					questionId={questions[2].questionId}
					selectAnswer={selectAnswer}
					userAnswerId={userAnswer[2].userAnswerId}
				/>
				<Question
					questionText={questions[3].questionText}
					questionOption1={questions[3].questionOptions[0]}
					questionOption2={questions[3].questionOptions[1]}
					questionOption3={questions[3].questionOptions[2]}
					questionOption4={questions[3].questionOptions[3]}
					questionId={questions[3].questionId}
					selectAnswer={selectAnswer}
					userAnswerId={userAnswer[3].userAnswerId}
				/>
				{/* {questionFields} */}
				<button
					type='button'
					className=' btn btn-check'
					style={{ visibility: isAllSelected ? 'visible' : 'hidden' }}>
					Check answers
				</button>
			</main>
		</>
	);
}

export default App;
