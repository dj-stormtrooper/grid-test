# grid-test

В selenoid таймаут сессии не учитывает запросы по devtools протоколу

Для проверки

```
npm test
```

Тест побегают и упадут по таймауту от jest, но в логах бразуера будет видно, что кем-то проинициализировалась команда QUIT ровно спустя минуту после последней команды. При этом последующие page.goto и прочие вызовы по devtools-протоколу просто тихо висят, пока тест не отвалится по таймауту

Можно раскомментировать в тесте 10-минутный таймаут в selenoid:options - тогда тест пройдет
