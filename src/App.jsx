import { useState, useEffect } from 'react';
import Start from './components/Start.jsx';
import Question from './components/Question.jsx';
import getQuestions from './api/questions.js';

function App() {
	const numberOfQuestions = 4;

	// states
	const [isLoading, setIsLoading] = useState(true);
	const [questions, setQuestions] = useState([]);
	const [userAnswer, setUserAnswer] = useState(
		Array.from({ length: numberOfQuestions }, () => ({
			userAnswerId: null,
		}))
	);

	// variables
	const isAllSelected = userAnswer.every(
		(answer) => answer.userAnswerId !== null
	);
	//  effects
	useEffect(() => {
		async function fetchQuestions() {
			try {
				const data = await getQuestions(numberOfQuestions);
				setQuestions(convertQuestions(data.results));
			} catch (err) {
				console.log('error');
			} finally {
				setIsLoading(false);
			}
		}
		fetchQuestions();
	}, []);
	// functions
	function decodeHtml(html) {
		const txt = document.createElement('textarea');
		txt.innerHTML = html;
		return txt.value;
	}

	function convertQuestions(results) {
		function randomAnswerId(length) {
			return Math.floor(Math.random() * length);
		}
		return results.map((item, index) => {
			const questionAnswerId = randomAnswerId(
				item.incorrect_answers.length + 1
			);
			const questionOptions = [
				...item.incorrect_answers.slice(0, questionAnswerId).map(decodeHtml),
				decodeHtml(item.correct_answer),
				...item.incorrect_answers.slice(questionAnswerId).map(decodeHtml),
			];
			return {
				questionId: index,
				questionText: decodeHtml(item.question),
				questionAnswerId: questionAnswerId,
				questionOptions: questionOptions,
			};
		});
	}

	function selectAnswer(e) {
		const parentId = Number(e.currentTarget.parentElement.dataset.id);
		const answerId = Number(e.target.dataset.id);
		if (e.target.type !== 'button') return;
		console.log(parentId, answerId);
		setUserAnswer(
			userAnswer.map((item, index) =>
				index === parentId ? { userAnswerId: answerId } : item
			)
		);
	}

	const questionFields = questions.map((q, index) => {
		return (
			<Question
				questionOptions={q.questionOptions}
				questionText={q.questionText}
				questionId={index}
				userAnswerId={userAnswer.userAnswerId}
				selectAnswer={selectAnswer}
			/>
		);
	});
	// return
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
				{!isLoading && questionFields}
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
