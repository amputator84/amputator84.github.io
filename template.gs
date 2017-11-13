/*Шаблон для google scripts*/

var list = 0; //Номер листа
var ss = SpreadsheetApp.getActiveSpreadsheet(); //Выбор активной таблицы
var sheet = ss.getSheets()[list];
sheet.getRange("A1").setValue('ТЕКСТ'); //Вписать текст в ячейку
sheet.getLastRow() //номер последней заполненной строки

return ContentService.createTextOutput('Возвращаемый текст');

var data = sheet.getDataRange().getValues(); //значения всех ячеек в массив
//Перебор массива
for (var i = 0; i < data.length; i++) {
    //...
}

//Если функция doGet(e), словить параметр
e.parameters['name_url']

var html = UrlFetchApp.fetch('http://....'); //Загрузка по ссылке
JSON.parse(html, function(k, v) { //парсинг JSON
    //k, v
});

 sheet.getRange("A1").getRange("A1").copyTo(sheet.getRange('A1')); //Копирование ячейки .getCell(1, 1)
 sheet.insertRowsAfter(1/*после какой*/, 2/*сколько*/); /*Вставить строку*/