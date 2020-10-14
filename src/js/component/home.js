import React from "react";

//include images into your bundle

//create your first component
export class Home extends React.Component {
	constructor() {
		super();
		this.player = null;
		this.state = {
			songs: [],
			currentIndex: 0
		};
	}
	// onload componentDidMount runs
	componentDidMount() {
		this.pauseBtn.style.display = "none";
		fetch("https://assets.breatheco.de/apis/sound/songs")
			.then(resp => resp.json())
			.then(songs => this.setState({ songs }));
	}
	play(index) {
		const url = this.state.songs[index].url;
		if (url)
			this.play.src = "https://assets.breatheco.de/apis/sound/" + url;
		this.player.play();
		this.playBtn.style.display = "none";
		this.pauseBtn.style.display = "inline-block";
		this.setState({ currentIndex: index });
	}
	pause() {
		this.player.pause();
		this.pauseBtn.style.display = "none";
		this.playBtn.style.display = "inline-block";
	}
	render() {
		return (
			<div className="text-center mt-5">
				<h1>Jasmin music</h1>
				<ol>
					{this.state.songs.map((song, index) => {
						return (
							<li onClick={() => this.play(index)} key={index}>
								{song.name}
							</li>
						);
					})}
				</ol>
				<section>
					<button
						className="skip"
						onClick={() => this.play(this.state.currentIndex - 1)}>
						<i className="fas fa-caret-square-left" />
					</button>
					<button
						ref={play => (this.playBtn = play)}
						onClick={() => this.play(this.state.currentIndex)}>
						<i className="fas fa-play" />
					</button>
					<button
						ref={pause => (this.pauseBtn = pause)}
						onClick={() => this.pause}>
						<i className="fas fa-pause-circle" />
					</button>
					<button onClick={() => {}}>
						<i className="fas fa-caret-square-right" />
					</button>
				</section>
				<audio ref={player => (this.player = player)} />
			</div>
		);
	}
}
