import { useState } from 'react';
import { Start } from './components/Start.jsx';
import { Question } from './components/Question.jsx';
import Confetti from 'react-confetti';
import { triviaRequest, convertQuestions, countCorrectAnswers } from './utils';
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
	const [isFinished, setIsFinished] = useState(false);
	const [isError, setIsError] = useState(false);
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
			const data = await triviaRequest(amount, difficulty);
			const formatted = convertQuestions(data.results);
			setQuestions(formatted);
			setIsError(false);
			setIsLoading(false);
		} catch (err) {
			if (attempt < maxAttempts) {
				setTimeout(
					() =>
						fetchQuestionsWithRetry(
							amount,
							difficulty,
							interval,
							attempt + 1,
							maxAttempts
						),
					interval
				);
			} else {
				setIsError(true);
				setIsLoading(false);
			}
		}
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
				questionAnswerId={q.questionAnswerId}
				setAnswer={setAnswer}
				isFinished={isFinished}
			/>
		);
	});

	function checkAnswers() {
		setIsFinished(true);
		setIsWin(
			questions.every(
				(question) => question.questionAnswerId === question.userAnswerId
			)
		);
	}

	function handleNewGame() {
		setQuestions([]);
		setIsRun(false);
		setIsFinished(false);
		setIsWin(false);
		setIsError(false);
	}

	// return
	return (
		<>
			<img className='bg-svg-item blob-yellow' src='./yellow_blob.svg' />
			<img className='bg-svg-item blob-blue' src='./blue_blob.svg' />

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
				<div className='question-container'>
					{' '}
					{!isLoading && isRun && questionFields}
				</div>

				{isError && (
					<h1>
						Our question bank is temporarily closed! Please refresh and try
						again.
					</h1>
				)}
				{!isLoading && (
					<div className='score-box'>
						{isFinished && (
							<p className='score-text'>
								You scored {countCorrectAnswers(questions)}/
								{userSettings.numberOfQuestions} correct answers.
							</p>
						)}
						<button
							disabled={isAllSelected ? false : true}
							onClick={!isFinished ? checkAnswers : handleNewGame}
							type='button'
							className=' btn btn-check'
							style={{
								visibility: questions.length !== 0 ? 'visible' : 'hidden',
							}}>
							{isFinished ? 'Play again' : 'Check answers'}
						</button>
					</div>
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
