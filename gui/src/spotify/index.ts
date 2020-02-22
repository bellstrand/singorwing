export class Spotify {
	url?: string

	private code =
		"AQDY5-4fDbHYByb2INhbEoO0JFnZcdfviKDJHDMavTRftjGxLxq99ozF_OmZWocNztWRMG9JHTcNRNfVp2fnTJIpH7NHjVsQTeIEgQArMcLegzDY-0pjoVaFbkhCJaG4ggFoUPpFV-KcE48F1czHZNHNTzZVbIqGj3pu8vaD4LsYvJGwSfJSahPn5R4cG6n6g5qacD_FPKbGvCOkMkigm69k0XrFl7k-XxH0dyVO7P22-DXvJivpYmitPkWrjtptot9xuu1EskG7F2ryU1NLnwhej25MYBrwFmkSybr9bKMq"
	private redirectUri = "http://localhost:3000/"
	private clientId = "dd7a6bf1da324794b739810592722887"
	private clientSecret = "a2887e0b80964eccae11fc7e5df9fb54"

	constructor() {
		;(window as any).SPOTIFY = this
		;(window as any).onSpotifyWebPlaybackSDKReady = () => {
			console.log("init")
		}
		this.login()
	}

	login() {
		const scopes = "user-read-playback-state user-modify-playback-state user-read-currently-playing"
		const loginUrl = "https://accounts.spotify.com/authorize"
		this.url = `${loginUrl}?response_type=code&client_id=${this.clientId}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(this.redirectUri)}`
		console.log(this.url)
	}

	async token() {
		const body: { [key: string]: string } = {
			grant_type: "authorization_code",
			code: this.code,
			redirect_uri: this.redirectUri,
		}
		const response = await fetch("https://accounts.spotify.com/api/token", {
			method: "post",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				Authorization: `Authorization: Basic ${btoa(`${this.clientId}:${this.clientSecret}`)}`,
			},
			body: Object.keys(body)
				.map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(body[key])}`)
				.join("&"),
		})
		console.log(response)
	}
}
