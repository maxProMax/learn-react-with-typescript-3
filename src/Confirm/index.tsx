import React, { useState, useEffect, memo } from 'react';
import './Confirm.css';

interface IProps {
	open: boolean;
	title: string;
	content: string;
	cancelCaption?: string;
	okCaption?: string;
	onOkClick: () => void;
	onCancelClick: () => void;
}

const Confirm: React.FunctionComponent<IProps> = memo((props) => {
	const [cancelClickCount, setCancelClickCount] = useState(0);
	const handleCancelClick = () => {
		const newCount = cancelClickCount + 1;
		setCancelClickCount(newCount);
		if (newCount >= 2) {
			props.onCancelClick();
		}
	};
	const handleOkClick = () => {
		props.onOkClick();
	};

	useEffect(() => {
		console.log('Run');

		return () => {
			console.log('Remove');
		};
	}, [props.open]);

	console.log('Confirm rendering');

	return (
		<div
			className={`confirm-wrapper ${props.open ? 'confirm-visible' : ''}`}
		>
			<div className="confirm-container">
				<div className="confirm-title-container">
					<span>{props.title}</span>
				</div>
				<div className="confirm-content-container">
					<p>{props.content}</p>
				</div>
				<div className="confirm-buttons-container">
					<button
						onClick={handleCancelClick}
						className="confirm-cancel"
					>
						{props.cancelCaption}
					</button>
					<button onClick={handleOkClick} className="confirm-ok">
						{props.okCaption}
					</button>
				</div>
			</div>
		</div>
	);
});

Confirm.defaultProps = {
	cancelCaption: 'cancel',
	okCaption: 'ok',
	open: false
};

export default Confirm;

interface ITextBox {
	control: 'TextBox';
	value: string;
	multiline: boolean;
}

interface IDatePicker {
	control: 'DatePicker';
	value: Date;
}

interface INumberSlider {
	control: 'NumberSlider';
	value: number;
}

interface ICheckBox {
	control: 'CheckBox';
	value: boolean;
}

type Field = ITextBox | IDatePicker | INumberSlider | ICheckBox;

function initValue(field: Field) {
	switch (field.control) {
		case 'TextBox':
			field.value = '';
			break;
		case 'DatePicker':
			field.value = new Date();
			break;
		case 'NumberSlider':
			field.value = 0;
			break;
		case 'CheckBox':
			field.value = false;
			break;
		default:
			const shouldNotReac: never = field;
	}
}
