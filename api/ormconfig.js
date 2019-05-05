const path = process.env.NODE_PATH || "src"

module.exports = {
	type: "postgres",
	replication: {
		master: {
			host: process.env.DB_HOST || "localhost",
			port: process.env.DB_PORT || 5432,
			username: process.env.DB_USER || "postgres",
			password: process.env.DB_PASSWORD || "password",
			database: process.env.DB_DATABASE || "singorwing",
		},
		slaves: [],
	},
	cache: true,
	synchronize: false,
	logging: false,
	entities: [`${path}/entities/index.{t,j}s`],
	migrations: [`${path}/migrations/**/*.{t,j}s`],
	subscribers: [`${path}/subscriber/**/*.{t,j}s`],
	cli: {
		entitiesDir: `${path}/entities`,
		migrationsDir: `${path}/migrations`,
		subscribersDir: `${path}/subscriber`,
	},
}
