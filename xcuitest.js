const request = require('request')


const username = 'Nixton'
const apiKey = 'acbc2f9c-8122-4997-80cc-22292ac54adb'

const iOS = { 
version1: "13.1",
version2: '13.3',
version3: '14.2',
version4: '14.3',
version5: '14.4'
};

const devicesName ={
device1: "iPhone XS",
device2: "iPhone 11",
device3: "iPhone 11 Pro Max",
device4: "iPhone 11 Pro",
device5: "iPhone 12 Pro",
device6: "iPhone XR"
};

const encodeAuth= `Basic ${Buffer.from(`${username}:${apiKey}`).toString('base64')}`

const runner = "https://kobiton-us-east.s3.amazonaws.com/test-runner/users/121602/Runner-be16e350-8377-11eb-a5c4-fb116d54b6ff.ipa?AWSAccessKeyId=AKIAJ7BONOZUJZMWR4WQ&Expires=1615626809&Signature=aOZv0pzRuIePIr1Af5SMOjX9kl0%3D";
const app = "kobiton-store:168852";
const testPlan = "https://kobiton-us-east.s3.amazonaws.com/test-plan/users/121602/XcodeTestPlan-c26dba50-8377-11eb-bc65-9d2063c7247c.xctestplan?AWSAccessKeyId=AKIAJ7BONOZUJZMWR4WQ&Expires=1615626796&Signature=FRgDRoL1vS30r3yGhBzTpKdpNpc%3D";

const headers = {
  'Content-Type':'application/json',
  'Authorization': encodeAuth,
  'Accept':'application/json'
}

let devices = [
  { 
  sessionName:        'Automation test session',
  sessionDescription: 'This is an example for XCUITEST on iphone 11 plus testing', 
  noReset:            true,
  fullReset:          false,     
  deviceName:         devicesName.device6,
  platformVersion:    iOS.version5,   
  groupId:            2249,
  deviceGroup:        'KOBITON',
  app:                app,
  testRunner:         runner, 
  testFramework:      'XCUITEST',
  sessionTimeout:     30,
  testPlan:           testPlan
},
{ 
  sessionName:        'Automation test session',
  sessionDescription: 'This is an example for XCUITEST on iphone X testing', 
  noReset:            true,
  fullReset:          false,     
  deviceName:         devicesName.device4,
  platformVersion:    iOS.version4,   
  groupId:            2249,
  deviceGroup:        'KOBITON',
  app:                app,
  testRunner:         runner, 
  testFramework:      'XCUITEST',
  sessionTimeout:     30,
  testPlan:           testPlan

}
]

for(var i = 0; i <= devices.length; i++){
  var configuration  = devices[i];
var body = {
  configuration
}
myFunc(body)
}



function myFunc(body){
  request({
    url: 'https://api.kobiton.com/hub/session',
    json: true,
    method: 'POST',
    body,
    headers
  }, function (err, response, body) {
    if (err) return console.error('Error:', err)
    console.log('Response', body)
  }) 
}








