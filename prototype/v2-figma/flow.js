/* =====================================================================
   КАРТА ЭКРАНОВ И ПЕРЕХОДОВ (v2 — на реальных кадрах Figma)
   ---------------------------------------------------------------------
   Каждый экран: id, file (имя PNG в папке assets/), ctx ('wb' | 'site'),
   hotspots — кликабельные зоны поверх кадра.

   Координаты хотспотов — В ПРОЦЕНТАХ от размера картинки:
     x, y — левый верхний угол, w, h — ширина и высота, go — id экрана.
   Проще всего их правится в режиме разметки: откройте прототип и
   нажмите клавишу H — зоны подсветятся, а клик с зажатым Alt выведет
   в консоль готовые координаты выделенной области.
   ===================================================================== */

window.FLOW = {
  start: 'wb-search',

  screens: [
    /* ---------------- Приложение WB: витрина ---------------- */
    { id:'wb-search', file:'wb-01-poisk.png', ctx:'wb',
      title:'WB · Поиск',
      hotspots:[ {x:2,y:47,w:47,h:14,go:'wb-product'}, {x:51,y:47,w:47,h:14,go:'wb-product'} ] },

    { id:'wb-product', file:'wb-02-kartochka.png', ctx:'wb',
      title:'WB · Карточка товара',
      hotspots:[
        {x:2,y:45.8,w:40,h:2,go:'wb-credit-promo'},    // бейдж «по 50 000 ₽ в месяц»
        {x:2,y:71,w:96,h:4,go:'wb-credit-promo'},      // строка «В автокредит»
        {x:1.5,y:78.2,w:42,h:3.6,go:'wb-credit-promo'},// оранжевая кнопка
        {x:46,y:78.2,w:40,h:3.6,go:'wb-cart'} ] },     // «В корзину»

    { id:'wb-credit-promo', file:'wb-03-promo-kredit.png', ctx:'wb',
      title:'WB · Кредит от банков-партнёров',
      hotspots:[ {x:4,y:94,w:92,h:4,go:'site-calc'} ] },   // «Оформить кредит» → сайт ОФМ

    { id:'wb-cart', file:'wb-04-korzina.png', ctx:'wb',
      title:'WB · Корзина',
      hotspots:[ {x:3,y:88.6,w:94,h:6.2,go:'wb-orders-created'} ] },

    /* ---------------- Сайт ОФМ: заявка ---------------- */
    { id:'site-calc', file:'site-01-kalkulyator.png', ctx:'site',
      title:'ОФМ · Подберите условия',
      hotspots:[ {x:4,y:59,w:92,h:5.4,go:'site-gos'} ] },  // «Продолжить»

    { id:'site-gos', file:'site-02-gosuslugi.png', ctx:'site',
      title:'ОФМ · Авторизация в Госуслугах',
      auto:{ go:'site-step1', delay:2200 } },              // сам уходит дальше

    { id:'site-step1', file:'site-03-shag1-usloviya.png', ctx:'site',
      title:'ОФМ · Шаг 1: условия',
      hotspots:[ {x:3,y:48.6,w:94,h:2.9,go:'site-step2'} ] },  // «Далее»

    { id:'site-step2', file:'site-04-shag2-kontakty.png', ctx:'site',
      title:'ОФМ · Шаг 2: контактные данные',
      hotspots:[ {x:21,y:91,w:76,h:5.5,go:'site-step3'}, {x:2.5,y:91,w:13,h:5.5,go:'site-step1'} ] },

    { id:'site-step3', file:'site-05-shag3-rabota.png', ctx:'site',
      title:'ОФМ · Шаг 3: работа и доход',
      hotspots:[ {x:22,y:91,w:74,h:5,go:'site-step4'}, {x:4,y:91,w:12,h:5,go:'site-step2'} ] },

    { id:'site-step4', file:'site-06-shag4-dop-info.png', ctx:'site',
      title:'ОФМ · Шаг 4: доп. информация',
      hotspots:[ {x:22,y:92,w:74,h:5,go:'site-preparing'}, {x:4,y:92,w:12,h:5,go:'site-step3'} ] },

    /* ---------------- Сайт ОФМ: подбор офера ---------------- */
    { id:'site-preparing', file:'site-07-gotovim-predlozheniya.png', ctx:'site',
      title:'ОФМ · Готовим предложения',
      auto:{ go:'site-offers-wait', delay:2600 } },

    { id:'site-offers-wait', file:'site-08-predlozheniya-ozhidanie.png', ctx:'site',
      title:'ОФМ · Шаг 5: ожидаем ответ',
      wbStatus:'review',
      auto:{ go:'site-offers', delay:3000 } },

    { id:'site-offers', file:'site-09-predlozheniya-odobreno.png', ctx:'site',
      title:'ОФМ · Шаг 5: одобрено (развилка банка)',
      wbStatus:'approved',
      hotspots:[
        {x:7,y:59.5,w:86,h:3.5,go:'otp-docs',  set:{bank:'otp'}},   // «Продолжить» у ОТП
        {x:7,y:84.2,w:86,h:3.5,go:'vtb-docs',  set:{bank:'vtb'}} ]},// «Продолжить» у ВТБ

    /* ---------------- Ветка ОТП ---------------- */
    { id:'otp-docs', file:'otp-01-dop-dokumenty.png', ctx:'site',
      title:'ОТП · Шаг 6: прикрепите документы',
      hotspots:[ {x:6,y:57,w:88,h:4,go:'otp-docs-filled'} ] },   // «Отправить»

    { id:'otp-docs-filled', file:'otp-02-dokumenty-zagruzheny.png', ctx:'site',
      title:'ОТП · Документы загружены',
      hotspots:[ {x:6,y:63,w:88,h:4,go:'otp-pv'} ] },

    { id:'otp-pv', file:'otp-03-oplata-pv.png', ctx:'site',
      title:'ОТП · Оплата первоначального взноса',
      wbStatus:'pv',
      hotspots:[ {x:8,y:46,w:50,h:4,go:'site-bank-prep'} ] },    // «Оплатить первый взнос»

    /* ---------------- Ветка ВТБ ---------------- */
    { id:'vtb-docs', file:'vtb-01-dop-dokumenty.png', ctx:'site',
      title:'ВТБ · Шаг 6: прикрепите документы',
      hotspots:[ {x:6,y:57,w:88,h:4,go:'vtb-docs-filled'} ] },

    { id:'vtb-docs-filled', file:'vtb-02-dokumenty-zagruzheny.png', ctx:'site',
      title:'ВТБ · Документы загружены',
      hotspots:[ {x:6,y:63,w:88,h:4,go:'vtb-dkp'} ] },

    { id:'vtb-dkp', file:'vtb-03-podpisanie-dkp.png', ctx:'site',
      title:'ВТБ · Подпишите договор купли-продажи',
      hotspots:[ {x:8,y:60,w:60,h:4,go:'vtb-dkp-doc'} ] },       // «Ознакомиться с договором»

    { id:'vtb-dkp-doc', file:'vtb-04-dkp-dokument.png', ctx:'site',
      title:'ВТБ · Договор купли-продажи',
      hotspots:[ {x:6,y:92,w:88,h:5,go:'vtb-sign-empty'} ] },    // «Подписать»

    { id:'vtb-sign-empty', file:'vtb-05-postavte-podpis.png', ctx:'site',
      title:'ВТБ · Поставьте подпись',
      draw:true,                                                  // рисуем подпись прямо на кадре
      hotspots:[
        {x:51,y:92.5,w:45,h:5.3,go:'vtb-pv', needDraw:true},        // «Готово»
        {x:4.5,y:92.5,w:44,h:5.3,go:'vtb-sign-empty'} ] },          // «Стереть» — перерисовать заново

    { id:'vtb-pv', file:'vtb-06-oplata-pv.png', ctx:'site',
      title:'ВТБ · Оплата первоначального взноса',
      wbStatus:'pv',
      hotspots:[ {x:8,y:53,w:50,h:4,go:'site-bank-prep'} ] },

    /* ---------------- Общая ветка: договор ---------------- */
    { id:'site-bank-prep', file:'site-10-bank-gotovit-dogovor.png', ctx:'site',
      title:'ОФМ · Банк готовит кредитный договор',
      wbStatus:'pvdone',
      auto:{ go:'@sign', delay:3000 } },                          // @sign — по выбранному банку

    { id:'otp-sign', file:'otp-04-podpishite-dokumenty.png', ctx:'site',
      title:'ОТП · Подпишите документы',
      wbStatus:'sign',
      hotspots:[ {x:6,y:70,w:88,h:4,go:'otp-sms'} ] },            // «Подписать договор»

    { id:'otp-sms', file:'otp-05-sms-kod.png', ctx:'site',
      title:'ОТП · Код из СМС',
      auto:{ go:'otp-wait', delay:2500 } },

    { id:'otp-wait', file:'otp-06-ozhidaem-otvet-banka.png', ctx:'site',
      title:'ОТП · Ожидаем ответа от банка',
      auto:{ go:'site-success', delay:3000 } },

    { id:'otp-expired', file:'otp-07-dogovor-ne-aktualen.png', ctx:'site',
      title:'ОТП · Договор не актуален',
      hotspots:[ {x:14,y:22,w:30,h:4,go:'otp-sign'} ] },

    { id:'vtb-sign', file:'vtb-07-podpishi-dogovor-vtb.png', ctx:'site',
      title:'ВТБ · Подпиши договор с ВТБ',
      wbStatus:'sign',
      hotspots:[ {x:8,y:80,w:50,h:4,go:'vtb-online'} ] },         // «Подписать договор ↗»

    { id:'vtb-client', file:'vtb-08-stan-klientom-vtb.png', ctx:'site',
      title:'ВТБ · Стань клиентом ВТБ',
      wbStatus:'sign',
      hotspots:[ {x:8,y:83,w:50,h:4,go:'vtb-sign'} ] },           // «Я стал клиентом ВТБ»

    { id:'vtb-online', file:'vtb-09-vtb-onlain.png', ctx:'site',
      title:'ВТБ Онлайн · Подписание КОД',
      hotspots:[ {x:10,y:60,w:80,h:8,go:'site-success'} ] },

    /* ---------------- Финал ---------------- */
    { id:'site-success', file:'site-11-ekran-uspeha.png', ctx:'site',
      title:'ОФМ · Кредит выдан',
      wbStatus:'paid' },        // возврат в ВБ — по пилюле слева сверху

    /* ---------------- Приложение WB: статусы заявки ---------------- */
    { id:'wb-orders-created', file:'wb-05-zakaz-sozdan.png', ctx:'wb', status:'created',
      title:'WB · Заказ создан',
      hotspots:[ {x:6,y:36,w:88,h:4,go:'@resume'} ] },            // «Заполнить заявку» → на шаг анкеты

    { id:'wb-orders-review', file:'wb-08-zayavku-rassmatrivayut.png', ctx:'wb', status:'review',
      title:'WB · Заявку рассматривают' },

    { id:'wb-orders-approved', file:'wb-10-zayavka-odobrena.png', ctx:'wb', status:'approved',
      title:'WB · Заявка одобрена',
      hotspots:[ {x:6,y:40,w:88,h:4,go:'site-offers'} ] },        // «Выбрать условия»

    { id:'wb-orders-cancelled', file:'wb-12-zakaz-otmenen.png', ctx:'wb', status:'cancelled',
      title:'WB · Заказ отменён' },

    { id:'wb-orders-pv', file:'wb-14-vnesite-pv.png', ctx:'wb', status:'pv',
      title:'WB · Внесите первоначальный взнос',
      hotspots:[ {x:6,y:38,w:88,h:4,go:'@pv'} ] },                // «Внести 1 200 000 ₽»

    { id:'wb-orders-pvdone', file:'wb-15-pv-vnesen.png', ctx:'wb', status:'pvdone',
      title:'WB · Первоначальный взнос внесён' },

    { id:'wb-orders-sign', file:'wb-16-podpishite-dogovor.png', ctx:'wb', status:'sign',
      title:'WB · Подпишите договор',
      hotspots:[ {x:6,y:44,w:88,h:4,go:'@sign'} ] },              // «Подписать»

    { id:'wb-orders-paid', file:'wb-17-zakaz-oplachen.png', ctx:'wb', status:'paid',
      title:'WB · Заказ оплачен',
      hotspots:[ {x:6,y:60,w:88,h:5,go:'wb-details-paid'} ] },

    { id:'wb-details-paid', file:'wb-18-detali-zakaza.png', ctx:'wb', status:'paid',
      title:'WB · Детали заказов' },
  ],
};
