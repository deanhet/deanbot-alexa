# deanbot-alexa
Amazon Alexa skill written with ES6. Designing to be as extensible as possible. Have multiple actions on one skill.

# Running
First of all pull this repo and run `npm install`. 
Compile the code by running `npm run dev`
Writing Alexa Skills can be a massive pain but [alexa-app-server](https://github.com/matt-kruse/alexa-app-server) lets you develop locally. Pull that project and then put this one under `/examples/apps/`. 

# Deploying
Run `npm run lambda`, creates a .zip file. Upload that to your AWS instance.

# TODO
- There's some file loading/babel compile hackery between alexa-app-server and this project. It's not pretty. Think it can be fixed with a config file somewhere.
