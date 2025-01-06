# build:
# 	docker build -t backoffice-portal -f .\apps\backoffice-portal\Dockerfile .

# up:
# 	docker-compose -f .\apps\backoffice-portal\docker-compose.yml up


# build-bash:
# 	docker build -t backoffice-portal -f ./apps/backoffice-portal/Dockerfile .

# up-bash:
# 	docker compose -f ./apps/backoffice-portal/docker-compose.yml up

# run: build-bash up-bash

# run-bash: build-bash up-bash


build-backoffice-portal:
	docker build -t backoffice-portal -f ./apps/backoffice-portal/Dockerfile . --no-cache --add-host repo.sadad.ir:172.29.235.93

build-business-portal:
	docker build -t business-portal -f ./apps/business-portal/Dockerfile . --no-cache --add-host repo.sadad.ir:172.29.235.93

build-customer-portal:
	docker build -t customer-portal -f ./apps/customer-portal/Dockerfile . --no-cache --add-host repo.sadad.ir:172.29.235.93

up: build-backoffice-portal build-business-portal build-customer-portal
	docker compose up
