module.exports = {
    apps: [
        {
            name: 'frontend',
            script: 'node_modules/.bin/next',
            args: 'start', // Указывает на команду для запуска в продакшене
            env: {
                NODE_ENV: 'production',
                PORT: 3000,
            },
        },
    ],
};
