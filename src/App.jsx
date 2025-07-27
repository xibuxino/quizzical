import { useState, useEffect } from 'react';
import Start from './components/Start.jsx';
import Question from './components/Question.jsx';
import getQuestions from './api/questions.js';
import { useWindowSize } from 'react';
import Confetti from 'react-confetti';

function App() {
	// states
	const [questions, setQuestions] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isRun, setIsRun] = useState(false);
	const [userSettings, setUserSettings] = useState({
		numberOfQuestions: 5,
		difficulty: 'easy',
	});
	const [isWin, setIsWin] = useState(false);
	// variables
	const isAllSelected = questions.every(
		(question) => question.userAnswerId !== null
	);

	//  effects

	useEffect(() => {
		async function fetchQuestions() {
			try {
				const data = await getQuestions(
					userSettings.numberOfQuestions,
					userSettings.difficulty
				);
				const formatted = convertQuestions(data.results);
				setQuestions(formatted);
			} catch (err) {
				console.log(err.message, err.stack);
			} finally {
				setIsLoading(false);
			}
		}
		fetchQuestions();
	}, []);
	// functions
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
				userAnswerId: null,
			};
		});
	}

	function decodeHtml(html) {
		const txt = document.createElement('textarea');
		txt.innerHTML = html;
		return txt.value;
	}

	function setAnswer(e) {
		if (e.target.type !== 'button') return;
		const parentId = Number(e.currentTarget.parentElement.dataset.id);
		const answerId = Number(e.target.dataset.id);
		setQuestions((prevQuestions) =>
			prevQuestions.map((item) => {
				return item.questionId === parentId
					? { ...item, userAnswerId: answerId }
					: item;
			})
		);
	}

	const questionFields = questions.map((q) => {
		return (
			<Question
				key={q.questionId}
				questionOptions={q.questionOptions}
				questionText={q.questionText}
				questionId={q.questionId}
				userAnswerId={q.userAnswerId}
				setAnswer={setAnswer}
			/>
		);
	});

	function checkAnswers() {
		setIsWin(
			questions.every(
				(question) => question.questionAnswerId === question.userAnswerId
			)
		);
	}

	// return
	return (
		<>
			<img
				className='bg-svg-item blob-yellow'
				src='src/assets/yellow_blob.svg'
			/>
			<img className='bg-svg-item blob-blue' src='src/assets/blue_blob.svg' />

			<main>
				{/* <Start
					numberOfQuestions={userSettings.numberOfQuestions}
					difficulty={userSettings.difficulty}
				/> */}

				{isLoading && isRun && (
					<div className='loading'>
						<h1 className='loading-text'>Preparing quiz questions...</h1>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='40'
							height='40'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
							className='spinner'>
							<path d='M21 12a9 9 0 1 1-6.219-8.56' />
						</svg>
					</div>
				)}
				{!isLoading && questionFields}
				{!isLoading && (
					<button
						onClick={checkAnswers}
						type='button'
						className=' btn btn-check'
						style={{
							visibility:
								questions.length !== 0 && isAllSelected ? 'visible' : 'hidden',
						}}>
						Check answers
					</button>
				)}
			</main>
			{isWin && (
				<Confetti
					numberOfPieces={500}
					recycle={false}
					gravity={0.2}
					tweenDuration={1000}
				/>
			)}
		</>
	);
}

export default App;
