# deanbot-alexa
Amazon Alexa skill written with ES6. Designing to be as extensible as possible. Have multiple actions on one skill.

# Running
- First of all pull this repo and run `npm install`. 
- Compile the code by running `npm run dev`
- Writing Alexa Skills can be a massive pain but [alexa-app-server](https://github.com/matt-kruse/alexa-app-server) lets you develop locally. Pull that project and then put this one under `/examples/apps/`. Might need to do some config so the server points at your `lib` folder.

# Deploying
Run `npm run lambda`, creates a .zip file in a `build` directory. Upload that to your AWS instance.
