import React from 'react';
import logo from './logo.svg';
import Confirm from './Confirm';
import './App.css';

interface IState {
	confirmOpen: boolean;
	confirmMsg: string;
	confirmVisible: boolean;
	countDown: number;
}

class App extends React.Component<{}, IState> {
	public static getDerivedStateFromProps(props: {}, state: IState) {
		// console.log('getDerivedStateFromProps', props, state);

		return null;
	}

	private timer: number = 0;
	private renderCount = 0;

	constructor(props: {}) {
		super(props);

		this.state = {
			confirmMsg: 'please hot confirm btn',
			confirmOpen: false,
			confirmVisible: true,
			countDown: 5
		};
	}

	private handleCancelConfirmClick = () => {
		this.setState({ confirmOpen: false });
	};

	private handleOkConfirmClick = () => {
		this.setState({ confirmOpen: false, confirmMsg: 'cool' });
		clearInterval(this.timer);
	};

	private handleConfirmClick = () => {
		this.setState({ confirmOpen: true, confirmMsg: 'Take a break' });
		clearInterval(this.timer);
	};

	private handleTimerTick = () => {
		this.setState(
			{
				confirmMsg: `msg appeare ${this.state.countDown}`,
				countDown: this.state.countDown - 1
			},
			() => {
				if (this.state.countDown <= 0) {
					clearInterval(this.timer);
					this.setState({
						confirmMsg: 'to late',
						confirmVisible: false
					});
				}
			}
		);
	};

	componentDidMount() {
		this.timer = window.setInterval(() => this.handleTimerTick(), 1000);
	}

	componentWillUnmount() {
		clearInterval(this.timer);
	}

	getSnapshotBeforeUpdate(prevProps: {}, prevState: IState) {
		this.renderCount += 1;
		// console.log('getSnapshotBeforeUpdate', prevProps, prevState, {
		// 	renderCount: this.renderCount
		// });

		return this.renderCount;
	}

	componentDidUpdate(prevProps = {}, prevState: IState, snapshot: number) {
		// console.log('componentDidUpdate', prevProps, prevState, snapshot, {
		// 	renderCount: this.renderCount
		// });
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<p>
						Edit <code>src/App.tsx</code> and save to reload.
					</p>
					<a
						className="App-link"
						href="https://reactjs.org"
						target="_blank"
						rel="noopener noreferrer"
					>
						Learn React And TypeScript
					</a>
				</header>
				<main>
					<p>{this.state.confirmMsg}</p>
					{this.state.confirmVisible && (
						<button onClick={this.handleConfirmClick}>
							Confirm
						</button>
					)}
					{this.state.confirmVisible && (
						<Confirm
							open={this.state.confirmOpen}
							title="This is where our title should go"
							content="This is where our content should go"
							okCaption="Yes please!"
							cancelCaption="No Way"
							onCancelClick={this.handleCancelConfirmClick}
							onOkClick={this.handleOkConfirmClick}
						/>
					)}
				</main>
			</div>
		);
	}
}

export default App;
