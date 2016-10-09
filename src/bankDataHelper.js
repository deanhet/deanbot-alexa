'use strict';

import request from 'request';
import config from './config';

export default class BankDataHelper{
  formatCurrentBalance(currentBalance){
    const balance = `£${String((Number(currentBalance.RBS) - (1200 - Number(currentBalance.Amex))).toFixed(2))}`
    const balanceString = `Your current balance is ${balance}.`
    return balanceString;
  }
  async requestBankBalance(){
    const response = await this.getBankBalance();
    if(response){
      return response;
    }
  }
  getBankBalance(){
    const options = {
      method: 'GET',
      uri: config.bankEndpoint,
      resolveWithFullResponse: true,
      json: true
    };
    return new Promise((resolve, reject) => {
      request(options, (err, res, body) => {
        if(err){
          reject(err); return;
        }
        resolve(body);
      });
    });
  }
}
