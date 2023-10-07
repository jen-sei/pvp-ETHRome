#!/bin/bash

set -e

if [ -f .env ]; then
    source .env
else
    echo "missing .env file"
    return 1
fi

if [[ -z "${DEV_GEN_SU}" ]]; then
  echo "General Su is not ready."
  exit 1
fi

if [[ -z "${DEV_BE_VERSION}" ]]; then
  echo "backend version argument needed."
  exit 1
fi

if [[ -z "${DEV_FE_VERSION}" ]]; then
  echo "frontend version argument needed."
  exit 1
fi

printf "building backend...\n"
make build_be

printf "testing...\n"                   
make test_be

printf "creating contract.wasm...\n"
make wasm 

printf "optimising contract...\n"
make optim 

printf "using custom update-dotenv...\n"
python3 dev_gen_update_dotenv.py '---'

DEV_CODE_ID=''
printf "loading contract...\n"
npm run load_contract || printf "action failed, trying failover...\n" && /bin/bash ./load_contract.sh
source .env
if [[ -z "${DEV_CODE_ID}" ]]; then
  echo "DEV_CODE_ID not set, load contract may have failed."
  exit 1
fi

if [[ $* == *--migrate* ]]; then
  printf "performing migration...\n"
  npm run migrate_contract
else
  DEV_CONTRACT_ADDRESS=''
  printf "instantiating contract...\n"
  npm run instantiate_contract
  source .env
  if [[ -z "${DEV_CONTRACT_ADDRESS}" ]]; then
    echo "DEV_CONTRACT_ADDRESS not set, instantiate contract may have failed."
    exit 1
  fi
fi


printf "building frontend...\n"
make build_fe

if [[ $* == --docker* ]]; then
  cd frontend
  printf "building and uploading to docker\n"
  sudo docker build -t "yaesha/pvp:$DEV_FE_VERSION" .
  sudo docker push "yaesha/pvp:$DEV_FE_VERSION"
fi

printf "done!\n"


