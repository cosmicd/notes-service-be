#!/bin/bash
# Some tests of the aws backend services.
# you may call indvidual tasks using: ./thisscript.sh taskname

doall(){ 
create-user
confirm-user
test-apig
}


# creat user
create-user(){
aws cognito-idp sign-up \
  --region us-east-1 \
  --client-id appClientId \
  --username YourUsername \
  --password Passw0rd!
}
confirm-user(){
aws cognito-idp admin-confirm-sign-up \
  --region us-east-1 \
  --user-pool-id cognitoUserpoolId \
  --username YourUsername
}  

test-apig(){
apig-test \
--username='YourUsername' \
--password='Passw0rd!' \
--user-pool-id='' \
--app-client-id='' \
--cognito-region='us-east-1' \
--identity-pool-id='' \
--invoke-url='' \
--api-gateway-region='us-east-1' \
--path-template='/aPath' \
--method='POST' \
--body='{"content":"hello world","attachment":"pic.jpg"}'  
}

$@ 