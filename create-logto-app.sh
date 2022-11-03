#!/bin/bash

BASIC_TOKEN='bHNrRnpFUlFDQlkyT29DMnVlV3diOktuS3pFdUpSN2ZpWTBobXVacTUySg=='

function get_token {
  curl --location \
    --request POST 'http://localhost:3001/oidc/token' \
    --header "Authorization: Basic $BASIC_TOKEN" \
    --header 'Content-Type: application/x-www-form-urlencoded' \
    --data-urlencode 'code=KnKzEuJR7fiY0hmuZq52J' \
    --data-urlencode 'grant_type=client_credentials' \
    --data-urlencode 'resource=http://localhost:3001'
}

TOKEN=`get_token | jq -r .access_token`
WORKSPACE_URL=`gp url 3333`

function create_app {
  curl -X POST localhost:3001/api/applications \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $TOKEN" \
    -d "{\"name\":\"$WORKSPACE_URL\",\"type\":\"SPA\"}"
}

create_app
