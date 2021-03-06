'use strict';

module.change_code = 1;
import _ from 'lodash';
import Alexa from 'alexa-app';
const app = new Alexa.app('deanbot');
import config from './config';
import BankDataHelper from './bankDataHelper';
import PhoneFinderHelper from './phoneFinderHelper';

app.launch(function(req, res){
  var prompt = 'Help feature coming soon';
  res.say(prompt).shouldEndSession(false);
});

app.intent('deanbot', {
  'slots':{
    'TASK': 'TASKS'
  },
  'utterances': ['{|where is|get|to get|for|to find} {|the} {-|TASK}']
},
  function(req,res){
    let task = req.slot('TASK');
    if(!_.isEmpty(task)){
              console.log(task);

      switch(task){
        case "bank balance": {
          const bankHelper = new BankDataHelper();
           bankHelper.requestBankBalance().then((balance) => {
            res.say(bankHelper.formatCurrentBalance(balance)).send();
           }).catch((err) => {
              console.log('error', err.statusCode);
              let prompt = 'I could not find that data';
              res.say(prompt).shouldEndSession(true).send();
           });
           return false;
        }
        case 'WiFi password': {
          let prompt = `Your WiFi password is ${config.wifiPassword}, <say-as interpret-as="spell-out">${config.wifiPassword}</say-as>`;
          res.say(prompt).shouldEndSession(true).send();
          return false;
        }
        case 'my phone':{
          const phoneFinder = new PhoneFinderHelper();
          phoneFinder.fetchDevices().then(() => {
            res.say('I\'ve done that for you.').shouldEndSession(true).send();
          }).catch((err) => {
            console.log(err);
            let prompt = 'Trouble connecting to icloud';
            res.say(prompt).shouldEndSession(true).send();
          });
          return false;
        }
        default: {
          let prompt = 'I do not recognise that task';
          res.say(prompt).shouldEndSession(true);
          return true;
        }
      }
    } else {
      let prompt = 'I did not hear a task to do';
      res.say(prompt).shouldEndSession(true);
      return true;
    }
  }
);

const utterancesMethod = app.utterances;
app.utterances = () => {
  return utterancesMethod().replace(/\{\-\|/g, '{');
};

module.exports = app;
