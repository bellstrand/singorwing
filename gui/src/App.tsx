import React from "react"
import "./App.css"
import { Spotify } from "./spotify"

type Props = {}
type State = { spotify?: Spotify }
export class App extends React.PureComponent<Props, State> {
	state: State = {}
	componentDidMount() {
		const spotify = new Spotify()
		this.setState({ spotify })
	}
	render() {
		return (
			<div className="App">
				<header className="App-header">
					{this.state.spotify && (
						<a href={this.state.spotify.url} rel="login">
							Login
						</a>
					)}
				</header>
			</div>
		)
	}
}
