# LearnjskievSimpleTestTask 

Варіант розв’язання завдання https://github.com/learnjskiev/simple-test-task


Розробка
============
Для розробки потрібно встановити Nodejs та Gulp.

Потім можна втановити все інше:
```bash
npm install
```

Під час розробки в терміналі має бути запущено:
```bash
gulp 
```

Для того, щоб зыбрати проект, виконайте:
```bash
gulp build
```

Зібрані файли знаходитимуться в public_html/dist/


Використання
============

Angular та jQuery є необхідними залежностями. Bootstrap використовується для оформлення і є опціональним.
Увага! Коренем веб-директорії є public_html, а не папка проекту. Тому всі шляхи на веб-стрінці вказані відносно неї.

Додайте на веб-сторінку розмітку:
```html
<div ng-app="mathTestApp" math-test></div>
```

Підключення залежностей:
```html
<script src="js/libs/angular.js/angular.js"></script>    
<script src="js/libs/jquery/jquery.js"></script>   
<script src="js/libs/bootstrap/bootstrap.js"></script> 
```

Після залежностей підключається файл math-test.min.js або math-test.js (останній не мініфіковано).
Для розробки:
```html
<script src="build/compiled_templates/templates.js"></script>
<script src="js/app.js"></script>
```

Для production:
```html
<script src="/dist/math-test.min.js"></script>
```
> Важливо! Скрипт "math-test" підключається обов’язково після розмітки.