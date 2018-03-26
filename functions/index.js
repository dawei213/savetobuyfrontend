'use strict';

process.env.DEBUG = 'actions-on-google:*';
const { DialogflowApp } = require('actions-on-google');
const functions = require('firebase-functions');

const NAME_ACTION = 'make_name';
const COLOR_ARGUMENT = 'color';
const NUMBER_ARGUMENT = 'number';
const COST_ARGUMENT = 'unit-currency';
const DURATION_ARGUMENT = 'duration';

exports.savetobuyfrontend = functions.https.onRequest((request, response) => {
  const app = new DialogflowApp({request, response});
  console.log('Request headers: ' + JSON.stringify(request.headers));
  console.log('Request body: ' + JSON.stringify(request.body));

  // Make a silly name
  function makeName (app) {
    let number = app.getArgument(NUMBER_ARGUMENT);
    let color = app.getArgument(COLOR_ARGUMENT);
    let cost = app.getArgument(COST_ARGUMENT);
    let duration = app.getArgument(DURATION_ARGUMENT);
    console.log('-----COST-----:' + JSON.stringify(cost));
    console.log('-----DURATION------:' + JSON.stringify(duration));
    app.tell('Alright, your silly name is ' +
      color + ' ' + number +
      '! It will cost you ' + cost.amount + ' ' + cost.currency + ' over a period of ' + duration.amount + ' ' + duration.unit + '. That is all. No soup for you! Have a good day.');
   
    app.tell('Ok, we will transfer <X> amount on a weekly basis until you have reached your goal. Thank you for using Save to buy.');
  }

  let actionMap = new Map();
  actionMap.set(NAME_ACTION, makeName);

  app.handleRequest(actionMap);
});
