import { IFeaturesItem } from '@/feauters/main-block/Features/FeaturesItem/FeaturesItem';
import { IMainItem } from '@/feauters/main-block/MainWrapper/MainItem/MainItem';
import first from '../images/features/first.svg';
import sec from '../images/features/sec.svg';
import third from '../images/features/third.svg';
import forth from '../images/features/forth.svg';
import fifth from '../images/features/fifth.svg';
import sixth from '../images/features/sixth.svg';
import seventh from '../images/features/seventh.svg';
import eight from '../images/features/eight.svg';
import nine from '../images/features/nine.svg';
import { IDetailItem } from '@/feauters/main-block/Details/DetailItem/DetailItem';

export const mainItems: IMainItem[] = [
    {
        id: 1,
        value: '1',
        unit: 'день',
        description: 'Отгрузка готовых панелей',
    },
    {
        id: 2,
        value: '3',
        beforeUnit: 'от',
        unit: 'дней',
        description: 'Производство под заказ',
    },
    {
        id: 3,
        value: '20',
        unit: 'лет',
        description: 'Отгрузка готовых панелей',
    },
    {
        id: 4,
        value: '89',
        smallUnit: 'субъектов России',
        description: 'География работы',
    },
];

export const features: IFeaturesItem[] = [
    {
        id: 1,
        img: first,
        description:
            'Работаем <h>быстро</h> — отгрузка со склада за 1 день, производство от 3 рабочих дней',
    },
    {
        id: 2,
        img: sec,
        description: '<h>Точная геометрия</h> — панели собираются без подрезки и подгонки',
    },
    {
        id: 3,
        img: third,
        description: 'Работаем по ГОСТу, на материалы есть сертификаты и паспорта',
    },
    {
        id: 4,
        img: forth,
        description: 'Нарезка автоматическая, под заказ: от <h>2</h> до <h>15</h> метров',
    },
    {
        id: 5,
        img: fifth,
        description:
            'Утеплитель Rockwool® <h>экологичный</h>, <h>огнестойкий</h>, плотность — от 105 кг/м³',
    },
    {
        id: 6,
        img: sixth,
        description: 'Гарантия до <h>20</h> лет, срок службы ― от <h>50</h> лет',
    },
    {
        id: 7,
        img: seventh,
        description: 'Все в одном месте: докупите панели, <h>доборы</h>, <h>метизы</h>',
    },
    {
        id: 8,
        img: eight,
        description: '<h>Авторский надзор</h> от производителя ― бесплатно!',
    },
    {
        id: 9,
        img: nine,
        description:
            'Мы - реальные производители: закажите у нас и <h>не переплачивайте</h> посредникам!',
    },
];

export const details: IDetailItem[] = [
    {
        id: 1,
        text: 'Делаем <h>глубокие замки</h> сэндвич-панелей — места стыков не теряют <h>тепло</h> и в них не проникает влага',
    },
    {
        id: 2,
        text: '<h>Аккуратно</h> упаковываем: панели приходят ровные, благодаря чему монтаж идет <h>без подрезки</h>',
    },
    {
        id: 3,
        text: 'В кровельных панелях <h>заполняем утеплителем трапециевидные гофры</h> — так материал будет служить дольше, <h>выдержит</h> снег и ветер',
    },
    {
        id: 4,
        text: 'Проводим <h>шеф-монтаж</h> (выезд специалистов на объект для консультации) <h>бесплатно</h>, чтобы все встало как надо <h>с первого раза</h>',
    },
];
