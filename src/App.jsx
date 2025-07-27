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

	// functions
	async function handleStartGame(e) {
		e.preventDefault();
		const formData = new FormData(e.target);
		const amount = formData.get('questions-amount');
		const difficulty = formData.get('questions-difficulty');
		setUserSettings({
			numberOfQuestions: Number(amount),
			difficulty: difficulty,
		});
		setIsRun(true);
		setIsLoading(true);
		fetchQuestionsWithRetry(amount, difficulty);
	}
	async function fetchQuestionsWithRetry(
		amount,
		difficulty,
		interval = 3000,
		attempt = 1,
		maxAttempts = 3
	) {
		try {
			const data = await getQuestions(amount, difficulty);
			const formatted = convertQuestions(data.results);
			setQuestions(formatted);
			setIsLoading(false);
		} catch (err) {
			if (attempt < maxAttempts) {
				setTimeout(
					() =>
						fetchQuestionsWithRetry(amount, difficulty, interval, attempt + 1),
					interval
				);
			} else {
				setIsLoading(false);
			}
		}
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
				{!isRun && (
					<Start
						numberOfQuestions={userSettings.numberOfQuestions}
						difficulty={userSettings.difficulty}
						handleStartGame={handleStartGame}
					/>
				)}

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
				{!isLoading && isRun && questionFields}
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
