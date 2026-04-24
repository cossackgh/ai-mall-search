# Деплой и обслуживание

## Сервер
- **URL:** https://trc-galactica.za-vod.ru
- **GitHub:** `git@github.com:cossackgh/ai-mall-search.git`

---

## Первый деплой

```bash
git clone git@github.com:cossackgh/ai-mall-search.git /var/www/trc-galactica.za-vod.ru
cd /var/www/trc-galactica.za-vod.ru

# Создать .env.local (взять у владельца)
nano .env.local

# Запустить приложение
docker compose up -d --build
```

Проверить:
```bash
docker compose ps
curl http://localhost:3044
```

Подключить nginx:
```bash
cp nginx.conf /etc/nginx/sites-available/trc-galactica
ln -s /etc/nginx/sites-available/trc-galactica /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
```

Получить SSL-сертификат (certbot сам добавит HTTPS блок):
```bash
certbot --nginx -d trc-galactica.za-vod.ru
```

---

## Пересборка после изменений в коде

```bash
cd /var/www/trc-galactica.za-vod.ru
git pull origin main
docker compose up -d --build
```

---

## Обновить API-ключ (истекает периодически)

1. Получить новый токен у провайдера Ollama
2. Обновить на сервере:
```bash
nano /var/www/trc-galactica.za-vod.ru/.env.local
# Изменить OLLAMA_API_KEY, сохранить: Ctrl+O → Enter → Ctrl+X
```
3. Перезапустить контейнер:
```bash
cd /var/www/trc-galactica.za-vod.ru && docker compose restart
```

---

## Проверка состояния

```bash
# Контейнер запущен?
docker compose ps

# Логи (последние 50 строк)
docker compose logs --tail 50

# Слушает ли порт?
ss -tlnp | grep 3044
```

---

## Структура .env.local на сервере

```
OLLAMA_BASE_URL=https://ai-ollama.grandfs-develop.ru/api
OLLAMA_MODEL=deepseek-v3.1:671b-cloud
OLLAMA_API_KEY=<токен>
```

---

## Обновить nginx.conf

```bash
cp /var/www/trc-galactica.za-vod.ru/nginx.conf /etc/nginx/sites-available/trc-galactica
nginx -t && systemctl reload nginx
```
