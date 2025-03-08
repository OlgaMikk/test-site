# Lennar - Backend

## Git
Используется GitFlow подход.

Желательно в проекте не делать прямых изменений в ветках(master, dev, stage).

Если коммит не является важным, и не несет существенной нагрузки, делать его в ветках(main, dev, stage) - нежелательно

### Naming branch
Ветки именовать следующим образом: `develop/LEN-112`:
- `develop` - указывает на то что ветка была сделана в develop среде
- `LEN-112` - номер задачи

#### Правило
Для нейминга веток, лучше придерживаться правила: `Convential Commit`:
- Для продуктов JetBrains, можно использовать plugin `Convential Commit`

## Runing

`cp .env.example .env` - настроить переменные окружения

### Local
#### App
1. `pre-commit install` - включить при git pull; ИСПОЛЬЗУЕТСЯ ПО ВСЕМУ ПРОЕКТУ.
2. `python manage.py runserver`

### Docker
1. `docker-compose up --build`

### Prod
1. `docker-compose -f docker-compos.prod.yml --build -d`