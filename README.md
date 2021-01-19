## Habit Tracker React Client

Strona uruchamia się na http://localhost:3000.

### Konfiguracja API

W celu korzystania z lokalnego API (Habit Tracker API) należy w pliku  `index.js` w katalogu `constans` ustawić wartość `API_URL` w sposób następujący:

```
export const API_URL = `http://localhost:8080/api`;
```
Istnieje możliwość korzystania z zewnętrznego API co nie zmusza nas do samodzielnego uruchamiania. W tym przypadku wartość `API_URL` to:

```
export const API_URL = `https://habt-tracker.herokuapp.com/api`;
```





