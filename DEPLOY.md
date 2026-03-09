# Деплой и обслуживание

## Сервер
- **URL:** https://trc-galactika-mvp.grandfs-develop.ru
- **Папка проекта:** `/var/www/trc-galactika-mvp/trc-galactika-mvp/`
- **GitLab:** `git@gitlab.com:grandfs/anyother/trc-galactika-mvp.git`

---

## Пересборка после изменений

```bash
cd /var/www/trc-galactika-mvp/trc-galactika-mvp

git pull

docker build -t trc-galaktika .

docker stop trc-galaktika && docker rm trc-galaktika

docker run -d \
  --name trc-galaktika \
  --restart unless-stopped \
  -p 127.0.0.1:3044:3044 \
  --add-host=host.docker.internal:host-gateway \
  --env-file .env.local \
  trc-galaktika
```

**Одной командой:**
```bash
cd /var/www/trc-galactika-mvp/trc-galactika-mvp && git pull && docker build -t trc-galaktika . && docker stop trc-galaktika && docker rm trc-galaktika && docker run -d --name trc-galaktika --restart unless-stopped -p 127.0.0.1:3044:3044 --add-host=host.docker.internal:host-gateway --env-file .env.local trc-galaktika
```

---

## Обновить JWT-токен (истекает периодически)

1. Открыть https://ai-ollama.grandfs-develop.ru → Настройки → Учётная запись → скопировать **Токен JWT**
2. Обновить на сервере:
```bash
nano /var/www/trc-galactika-mvp/trc-galactika-mvp/.env.local
# Изменить OLLAMA_API_KEY, сохранить: Ctrl+O → Enter → Ctrl+X
```
3. Перезапустить контейнер (шаги `docker stop` → `docker run` выше)

---

## Проверка состояния

```bash
# Контейнер запущен?
docker ps | grep trc

# Логи (последние 50 строк)
docker logs trc-galaktika --tail 50

# Слушает ли порт?
ss -tlnp | grep 3044
```

---

## Структура .env.local на сервере

```
OLLAMA_BASE_URL=http://host.docker.internal:3080/api
OLLAMA_MODEL=deepseek-v3.1:671b-cloud
OLLAMA_API_KEY=<JWT токен из Open WebUI>
```

> `host.docker.internal` — обращение к Open WebUI напрямую внутри сервера,
> минуя внешний домен. Без флага `--add-host=host.docker.internal:host-gateway`
> в `docker run` работать не будет.

---

## Nginx

Конфиг: `nginx.conf` в корне проекта.

```bash
# Применить обновлённый конфиг
cp /var/www/trc-galactika-mvp/trc-galactika-mvp/nginx.conf /etc/nginx/sites-available/trc-galactika-mvp
nginx -t && systemctl reload nginx
```
