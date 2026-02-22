1. подключение к серверу

# Обновление системы

apt update && apt upgrade -y

# Установка Node.js (22+)

curl -fsSL https://deb.nodesource.com/setup_22.x | sudo bash -
sudo apt-get install -y nodejs

# Установка PM2 глобально

npm install -g pm2

# Проверка версий

node -v
npm -v

2. Настройка Nginx

# Создание папки для проекта

mkdir -p /var/www/portfolio
chmod 755 /var/www/portfolio # чтобы nginx мог заходить в папку

# Создание конфигурации Nginx

nano /etc/nginx/sites-available/portfolio

Вставьте конфигурацию (скопируйте с текущего сервера):

server {
listen 80;
server_name es-portfolio.ru www.es-portfolio.ru;
root /var/www/portfolio/dist;
index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

}

# Активация сайта

ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
rm /etc/nginx/sites-enabled/default # отключение дефолтного сайта
nginx -t
systemctl reload nginx

3. Клонирование проекта и сборка

# Клонирование репозитория

cd /var/www/portfolio
git clone https://github.com/Yogurt7v/portfolio.git .

# или через SSH: git clone git@github.com:Yogurt7v/portfolio.git .

# Установка зависимостей и сборка

npm install
npm run build

# результат появится в dist/

# После сборки папка dist будет принадлежать root, а nginx работает от www-data. Чтобы nginx мог читать файлы, дайте права на чтение для всех:

bash
chmod -R 755 /var/www/portfolio/dist

# Проверка

ls -la dist/ # должен быть index.html

4. SSL-сертификат (HTTPS)

# Установка Certbot

apt install -y certbot python3-certbot-nginx

# Получение сертификата (настроит автоматически)

certbot --nginx -d es-portfolio.ru -d www.es-portfolio.ru

# Автообновление настроится автоматически

certbot renew --dry-run # проверка

5. Настройка автодеплоя (webhook-сервер)

# Создание webhook-сервера [citation:8]

mkdir -p /root/webhook-server
cd /root/webhook-server
npm init -y
npm install express

# Создание index.js

nano index.js

const express = require('express');
const { exec } = require('child_process');
const crypto = require('crypto');
const fs = require('fs');

const app = express();
const PORT = 9000;
const SECRET = 'es-portfolio-secret-key-2026'; // ЗАМЕНИТЕ НА СВОЙ КЛЮЧ!

app.use(express.json({
verify: (req, res, buf) => {
req.rawBody = buf.toString();
}
}));

// Health check endpoint
app.get('/health', (req, res) => {
res.status(200).json({
status: 'OK',
time: new Date().toISOString(),
server: 'webhook-server',
port: PORT
});
});

// GET /webhook — информация о сервере
app.get('/webhook', (req, res) => {
res.status(200).json({
name: 'GitHub Webhook Server',
version: '1.0.0',
description: 'Сервер для приёма вебхуков от GitHub',
endpoints: {
health: '/webhook/health',
webhook: '/webhook (POST only)',
local_health: '/health'
},
status: 'running'
});
});

// GET /webhook/health — проверка доступности
app.get('/webhook/health', (req, res) => {
res.status(200).json({
status: 'OK',
time: new Date().toISOString(),
server: 'webhook-server',
endpoint: '/webhook/health'
});
});

// POST /webhook — приём уведомлений от GitHub
app.post('/webhook', (req, res) => {
console.log('\n📨 ===== НОВЫЙ WEBHOOK ЗАПРОС =====');
console.log(`🕐 Время: ${new Date().toISOString()}`);

    const event = req.headers['x-github-event'];
    const delivery = req.headers['x-github-delivery'];

    console.log(`📌 Event: ${event || 'не указан'}`);
    console.log(`📌 Delivery: ${delivery || 'не указан'}`);

    // Проверка подписи
    const signature = req.headers['x-hub-signature-256'];
    if (signature) {
        const hmac = crypto.createHmac('sha256', SECRET);
        const digest = 'sha256=' + hmac.update(req.rawBody).digest('hex');
        if (signature !== digest) {
            console.log('❌ ОШИБКА: Неверная подпись!');
            return res.status(401).json({ error: 'Invalid signature' });
        }
        console.log('✅ Подпись верна');
    } else {
        console.log('⚠️ Подпись отсутствует');
    }

    // Обработка ping
    if (event === 'ping') {
        console.log('🏓 Получен ping от GitHub');
        return res.status(200).json({ message: 'pong', event: 'ping' });
    }

    // Обработка push
    if (event === 'push') {
        console.log('🚀 ЗАПУСК ДЕПЛОЯ!');

        const deployScript = '/var/www/portfolio/deploy.sh';

        if (!fs.existsSync(deployScript)) {
            console.error(`❌ Скрипт деплоя не найден: ${deployScript}`);
            return res.status(500).json({ error: 'Deploy script not found' });
        }

        exec(deployScript, (error, stdout, stderr) => {
            if (error) {
                console.error(`❌ Ошибка выполнения: ${error.message}`);
                return;
            }
            console.log(`✅ Деплой успешен`);
            if (stdout) console.log(`📋 STDOUT:\n${stdout}`);
            if (stderr) console.log(`⚠️ STDERR:\n${stderr}`);
        });

        res.status(202).json({ status: 'accepted', message: 'Deploy started' });
    } else {
        console.log(`ℹ️ Игнорируем событие: ${event}`);
        res.status(200).json({ status: 'ignored', event });
    }

});

// Обработка 404
app.use((req, res) => {
res.status(404).json({ error: 'Not Found' });
});

app.listen(PORT, '127.0.0.1', () => {
console.log('\n🚀 ================================');
console.log('🚀 WEBHOOK-СЕРВЕР ЗАПУЩЕН!');
console.log('🚀 ================================');
console.log(`📌 Порт: ${PORT}`);
console.log(`📌 Webhook: https://es-portfolio.ru/webhook`);
console.log('🚀 ================================\n');
});

# Запуск через PM2

pm2 start index.js --name webhook
pm2 save
pm2 startup systemd

# Создайте скрипт деплоя

nano /var/www/portfolio/deploy.sh

# Содержимое deploy.sh:

#!/bin/bash
cd /var/www/portfolio
git pull origin main
npm install
npm run build
chmod -R 755 /var/www/portfolio/dist
systemctl reload nginx

chmod +x /var/www/portfolio/deploy.sh

# Проверка

pm2 status
curl http://localhost:9000/health

8. Проверка работоспособности

# Локально на сервере

curl -I http://localhost
curl -I https://localhost -k

# Проверка логов

pm2 logs webhook --lines 20
tail -f /var/log/nginx/error.log

# Открытие портов (если используется ufw)

ufw allow 80/tcp
ufw allow 443/tcp
ufw reload

Дополнительно: что ещё нужно сделать после выполнения плана

# Настроить DNS (указать A-записи для домена на IP нового сервера).

# Настроить GitHub Webhook (в репозитории указать https://es-portfolio.ru/webhook и тот же секретный ключ).
