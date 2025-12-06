const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Скрипт для генерации favicon и иконок из исходного изображения
 *
 * Использование:
 * 1. Поместите исходное изображение (PNG, 512x512 или больше) в src/images/logo/icon-source.png
 * 2. Запустите: npm run generate:icons
 *
 * Или используйте онлайн-генераторы:
 * - https://realfavicongenerator.net/
 * - https://favicon.io/
 * - https://www.favicon-generator.org/
 */

const sourceImagePath = path.join(__dirname, '../src/images/logo/icon-source.png');
const outputDir = path.join(__dirname, '../public/icons');

// Проверяем наличие исходного изображения
if (!fs.existsSync(sourceImagePath)) {
    console.error('❌ Исходное изображение не найдено!');
    console.log('\n📝 Инструкция:');
    console.log('1. Создайте PNG изображение размером минимум 512x512 пикселей');
    console.log('2. Сохраните его как: src/images/logo/icon-source.png');
    console.log('3. Запустите скрипт снова: npm run generate:icons');
    console.log('\n💡 Альтернатива: используйте онлайн-генераторы:');
    console.log('   - https://realfavicongenerator.net/');
    console.log('   - https://favicon.io/');
    console.log('   - https://www.favicon-generator.org/');
    process.exit(1);
}

console.log('✅ Исходное изображение найдено');
console.log('📦 Генерация иконок...\n');

// Создаем директорию для иконок, если её нет
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Используем sharp для генерации иконок (если установлен)
// Или можно использовать ImageMagick через командную строку
let sharp;
try {
    sharp = require('sharp');
} catch (e) {
    console.log('⚠️  Sharp не установлен. Установите: npm install --save-dev sharp');
    console.log('📝 Или используйте онлайн-генераторы, указанные выше.');
    process.exit(1);
}

// Запускаем генерацию
(async () => {
    try {
        await generateWithSharp(sharp, sourceImagePath, outputDir);
    } catch (error) {
        console.error('❌ Ошибка при генерации иконок:', error.message);
        process.exit(1);
    }
})();

async function generateWithSharp(sharp, sourcePath, outputPath) {
    const sizes = [
        { name: 'favicon-16x16.png', size: 16 },
        { name: 'favicon-32x32.png', size: 32 },
        { name: 'apple-touch-icon.png', size: 180 },
        { name: 'android-chrome-192x192.png', size: 192 },
        { name: 'android-chrome-512x512.png', size: 512 },
    ];

    // Генерируем PNG иконки
    for (const { name, size } of sizes) {
        await sharp(sourcePath)
            .resize(size, size, {
                fit: 'contain',
                background: { r: 255, g: 255, b: 255, alpha: 0 },
            })
            .png()
            .toFile(path.join(outputPath, name));
        console.log(`✅ Создано: ${name}`);
    }

    // Генерируем favicon.ico (16x16 и 32x32 в одном файле)
    // Для этого нужен дополнительный пакет, поэтому просто копируем 32x32
    const favicon32 = await sharp(sourcePath)
        .resize(32, 32, {
            fit: 'contain',
            background: { r: 255, g: 255, b: 255, alpha: 0 },
        })
        .png()
        .toBuffer();

    // Для .ico файла лучше использовать онлайн-генератор или специальный пакет
    // Здесь просто копируем PNG как временное решение
    fs.writeFileSync(path.join(outputPath, 'favicon.ico'), favicon32);
    console.log(
        '✅ Создано: favicon.ico (временное решение - лучше использовать онлайн-конвертер)'
    );

    console.log('\n✨ Генерация завершена!');
    console.log(
        '⚠️  Примечание: favicon.ico лучше создать через онлайн-конвертер для правильного формата'
    );
}
