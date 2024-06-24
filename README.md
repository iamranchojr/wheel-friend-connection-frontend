## Wheel Friend Connection Frontend

Wheel Friend Connection Frontend: a NextJs powered web app that allows users to connect with friends,
send and receive friend requests, and get live updates on friends' statuses.

## Getting Started

First install node version manager on your device. You can find the instructions [here](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating). After execute the command below to activate the node version required for the application.

```bash
nvm use
```

Next, run the command below to install necessary dependencies required to run the app.

```bash
npm install
# or
yarn install
```

After, you can run the development server with any of the commands below; Before doing that, make sure to have created a `.env` file with all the env variables required by the application. This is for the application to run without errors. There is an .env.example file that will let you know what values are needed.

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Note: The application will not be functional without the corresponding backend it integrates with. You can find that [here](https://github.com/iamranchojr/wheel-friend-connection-frontend) with instructions on how to run it locally on your device.
