.PHONY: install build start develop lint

install:
	npm ci

build: # собираем фронтенв 
	rm -rf frontend/dist && cd frontend && npm run build && cd ..

start-frontend:
	make -C frontend start

start-backend:
	npx start-server -p 5001 -s ./frontend/dist

start:
	make start-backend

develop: # запустить dev фронтенд и бэк
	make start-backend & make start-frontend

lint:
	cd frontend && npm run lint