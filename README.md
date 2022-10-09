# To launch the application
- `pnpm install`
- Put api key into the .env file or use `app-with-mocked-services` branch with mock data
- `pnpm run dev`

# Important notice

Unfortunately, due to problems with git near the end of my work on this application
I deleted the repository and lost the commit history.

Commit history here is just an approximation of deleted commit history, I am sorry
for this inconvenience.

Fake backend was created and will be launched when `dev` script is used.
It is done because of AccuWeather cors policy which makes it impossible to
make requests directly from browser.
