build:
	docker build -t backoffice-portal -f .\apps\backoffice-portal\Dockerfile .

up:
	docker-compose -f .\apps\backoffice-portal\docker-compose.yml up


build-bash:
	docker build -t backoffice-portal -f ./apps/backoffice-portal/Dockerfile .

up-bash:
	docker compose -f ./apps/backoffice-portal/docker-compose.yml up

run: build-bash up-bash

run-bash: build-bash up-bash
