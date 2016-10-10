import { findmyphone as icloud} from 'find-my-iphone';
import config from './config';

icloud.apple_id = config.iCloudEmail;
icloud.password = config.iCloudPassword;

export default class PhoneFinderHelper{
  fetchDevices(){
    return new Promise((resolve, reject) => {
      icloud.getDevices((error, devices) => {
        let device;
        if(error){
          console.log(error);
          reject(error); return;
        }
        devices.forEach(function(d) {
          if(device == undefined && d.location && d.lostModeCapable) {
            device = d;
          }
        });

        if(device) {
          icloud.alertDevice(device.id, function(err) {
            resolve(true);
          });
        }
      });
    });
  }
}
