import styles from './App.module.css';
import React, { useState } from 'react';

const buttonsText = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

export function App() {
	const [number, setNumber] = useState(0);
	const [operation, setOperation] = useState(true);
	const [memo, setMemo] = useState([]);
	const [resDisp, setResDisp] = useState(false);

	const correctNumByOperation = (number, operation) => {
		return operation ? number : -number;
	};

	const operationClick = (number, operation, operator) => {
		setMemo([...memo, correctNumByOperation(number, operation)]);
		setNumber(0);
		setOperation(operator === '+' ? true : false);
		setResDisp(false);
	};

	const res = (number, operation) => {
		setNumber(memo.reduce((acc, cur) => acc + cur, 0) + correctNumByOperation(number, operation));
		setMemo([]);
		setResDisp(true);
	};

	const cancel = () => {
		setNumber(0);
		setResDisp(false);
	};

	const numberClick = (value) => {
		setNumber(+(number + value));
		setResDisp(false);
	};

	return (
		<div className={styles.calculator}>
			<input
				disabled
				className={resDisp ? styles.res : null}
				value={number}
				type="number"
				onChange={(e) => setNumber(+e.target.value)}
			/>
			<div className={styles.buttons}>
				<div className={styles.buttonsGrid}>
					{buttonsText.map((item) => {
						return (
							<div key={item} onClick={(e) => numberClick(e.target.innerText)} className={styles.button}>
								{item}
							</div>
						);
					})}
				</div>
				<div className={styles.buttonsStaff}>
					<div className={styles.button} onClick={(e) => operationClick(number, operation, e.target.innerText)}>
						+
					</div>
					<div className={styles.button} onClick={(e) => operationClick(number, operation, e.target.innerText)}>
						-
					</div>
					<div className={styles.button} onClick={() => res(number, operation)}>
						=
					</div>
					<div className={styles.button} onClick={cancel}>
						C
					</div>
				</div>
			</div>
		</div>
	);
}
