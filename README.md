go onto vs code

install git if you dont already it 
  - first install homebrew
  - then brew install git

clone git repo:
 git clone https://github.com/nathandhummi/cs35l

install node if not already installed
  - https://nodejs.org/en
  - OR brew install node
check if npm works
  - npm -v

install nodemon globally (from any location)
  - sudo npm install -g nodemon
verify installation
  - nodemon -v

go to terminal -> new terminal
go to terminal -> split terminal

on one terminal, change directory to backend: cd backend
on the other terminal, change directory to backend: cd frontend


**FRONTEND TERMINAL**
install react-scripts:
  - npm install react-scripts
  - if you get an error when running this, run sudo chown -R 501:20 "/Users/<User>/.npm", then run again

install react and react-dom:
  - npm install react react-dom

install fonts and images:
  - npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons

**BACKEND TERMINAL**
install dotenv:
  - npm install dotenv

then can do npm run dev to keep the backend running

**FRONTEND TERMINAL**
then can do npm start to keep the frontend running

app should now be up and running
