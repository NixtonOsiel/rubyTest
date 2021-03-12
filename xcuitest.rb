require 'uri'
require 'net/http'
require 'json'
require 'base64'

username = "Nixton";
apiKey = "acbc2f9c-8122-4997-80cc-22292ac54adb";
encodeAuth = 'Basic ' + Base64.encode64(username + ':' + apiKey).gsub("\n", '')

url = URI('https://api.kobiton.com/hub/session')

https = Net::HTTP.new(url.host, url.port)
https.use_ssl = true

request = Net::HTTP::Post.new(url)
request['Content-Type'] = 'application/json'
request['Authorization'] = encodeAuth
request['Accept'] = 'application/json'

App = 'kobiton-store:168852'
TestRunner = 'https://kobiton-us-east.s3.amazonaws.com/test-runner/users/121602/Runner-be16e350-8377-11eb-a5c4-fb116d54b6ff.ipa?AWSAccessKeyId=AKIAJ7BONOZUJZMWR4WQ&Expires=1615626809&Signature=aOZv0pzRuIePIr1Af5SMOjX9kl0%3D'
#TestPlan = 'https://kobiton-us-east.s3.amazonaws.com/test-plan/users/121602/XcodeTestPlan-c26dba50-8377-11eb-bc65-9d2063c7247c.xctestplan?AWSAccessKeyId=AKIAJ7BONOZUJZMWR4WQ&Expires=1615626796&Signature=FRgDRoL1vS30r3yGhBzTpKdpNpc%3D'

devices = [{
  'configuration': {
    :sessionName =>        'Automation test session',
    :sessionDescription => 'This is an example for XCUITest testing',      
    :udid =>               '00008020-001451640C53802E',
    :deviceGroup =>        'KOBITON',
    :app =>                App,
    :testRunner =>         TestRunner,
    :testFramework =>      'XCUITEST',
    :sessionTimeout =>     30,

    # The user can specifically test running via testPlan or tests
    # If the testPlan and tests are set, the test framework will auto-select the testPlan first
    :tests =>              []
    #:testPlan =>           TestPlan 
  }
}, {
  'configuration': {
    :sessionName =>        'Automation test session',
    :sessionDescription => 'This is an example for XCUITest testing',      
    :udid =>               '00008030-000A751E21BA802E',
    :deviceGroup =>        'KOBITON',
    :app =>                App,
    :testRunner =>         TestRunner,
    :testFramework =>      'XCUITEST',
    :sessionTimeout =>     30,

    # The user can specifically test running via testPlan or tests
    # If the testPlan and tests are set, the test framework will auto-select the testPlan first
    :tests =>              []
    #:testPlan =>           TestPlan 
  }
}]

devices.each { |device| puts device
configuration_json = device.to_json
request.body = configuration_json
response = https.request(request)
puts response.read_body
}