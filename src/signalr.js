import * as signalR from "@microsoft/signalr"; // Переконайтеся, що ви імпортуєте signalR

const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:7104/supportHub", { // Змініть на ваш фактичний шлях до хабу
        accessTokenFactory: () => localStorage.getItem("token") // Отримуємо токен з localStorage
    })
    .withAutomaticReconnect() // Додайте автоматичне перепідключення
    .build();

export default connection;