function doGet(e){
  var city_cell = SpreadsheetApp.getActiveSpreadsheet().getSheets()[7].getRange("D6:D6").getCell(1, 1);
  var new_old = SpreadsheetApp.getActiveSpreadsheet().getSheets()[7].getRange("E6:E6").getCell(1, 1);
  var yes_no = SpreadsheetApp.getActiveSpreadsheet().getSheets()[7].getRange("F6:F6").getCell(1, 1);
  var name_url = e.parameters['name_url'];
  var acoust_input = e.parameters['acoust_input'];
  var city_name_in = e.parameters['city_name'];
  var genre = e.parameters['genre'];
  var html = UrlFetchApp.fetch('https://api.vk.com/api.php?oauth=1&method=groups.getById&group_ids='+name_url+'&fields=city,description');
  var name_rus = '';
  var url_short = '';
  var city = '';
  var city_num = '';
  var list = '';
  JSON.parse(html, function(k, v) {
    if (k == 'name') name_rus = v;
    if (k == 'screen_name') url_short = v;
    //if (k == 'description') genre = v;
    if (k == 'city'){
      city_num = v;
      if (v == '99')city = 'Новосибирск';
      if (v == '144')city = 'Томск';
      if (v == '25')city = 'Барнаул';
      if(v == '104')city = 'Омск';
      if(v == '64')city = 'Кемерово';
      if(v == '1133')city = 'Бердск';
      if (v == '27')city = 'Бийск';
      if (v == '14876')city = 'Искитим';
      if (v == '73')city = 'Красноярск';
      if (v == '1142')city = 'Железногорск';
      if (v == '97')city = 'Новокузнецк';
      if (v == '126')city = 'Северск';
    }
  });
  
  var city_name = 'D';
  var new_old_name = 'E';
  var yes_no_name = 'F';
  
  if (city_name_in == 'Новосибирск' && acoust_input != '11'){
    list = 0;
    new_old_name = 'D';
    yes_no_name = 'E';
  }
  if (city_name_in != 'Новосибирск') list = 1;
  if (acoust_input == '11') list = 2;
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  var sheet = ss.getSheets()[list]; /* Лист */
  var data = sheet.getDataRange().getValues();
  /*Поиск уже существующих групп*/
  for (var i = 0; i < data.length; i++) {
    if (name_url == data[i][1]) return ContentService.createTextOutput("Такая группа уже есть!");
  }
  var numRows = sheet.getLastRow()+1; /* Номер последней строки */

  name_rus = name_rus.replace(/группа/gi,"");
  name_rus = name_rus.replace(/Рок-группа/gi,"");
  name_rus = name_rus.replace(/</gi,"");
  name_rus = name_rus.replace(/>/gi,"");
  name_rus = name_rus.replace(/\"/gi,"");
  name_rus = name_rus.replace(/&gt;/gi,"");
  name_rus = name_rus.replace(/&lt;/gi,"");
  name_rus = name_rus.replace('[',"");
  name_rus = name_rus.replace(']',"");
  name_rus = name_rus.replace('/',"");
  name_rus = name_rus.replace('#',"");
  name_rus = name_rus.replace(/(^\s*)|(\s*)$/g, ''); //удалить пробелы в начале
  
  sheet.insertRowsAfter(numRows/*после какой*/, 1/*сколько*/); /*Вставить строку*/
  sheet.getRange("A"+numRows).setValue(name_rus);
  sheet.getRange("B"+numRows).setValue('=HYPERLINK("https://vk.com/'+url_short+'";"'+url_short+'")');
  sheet.getRange("C"+numRows).setValue(genre);
  
  if (city_name_in != 'Новосибирск' || acoust_input == '11'){
    city_cell.copyTo(sheet.getRange(city_name+numRows)); /*Копирование списка городов в ячейку*/
    sheet.getRange(city_name+numRows).setValue(city_name_in);
  }
                 
  new_old.copyTo(sheet.getRange(new_old_name+numRows)); /*Старый/Новый*/
  yes_no.copyTo(sheet.getRange(yes_no_name+numRows)); /*Списался/Нет*/
  sortEdit(list);
  return ContentService.createTextOutput("Занесено успешно!");
}

function sortEdit(list) {
    if (list != null) {
        var ss = SpreadsheetApp.getActiveSpreadsheet();
        var sheet = ss.getSheets()[list];
        var numRows = sheet.getLastRow() + 1;
        var columnToSortBy = 1;
        var tableRange = "A2:H999";
        var editedCell = sheet.getActiveCell();

        if (editedCell.getColumn() == columnToSortBy) {
            var range = sheet.getRange(tableRange);
            range.sort({
                column: columnToSortBy,
                ascending: true
            });
        }
    }
}

  
/*Поиск инфы о городе по БД ВК*/
/*JSON.parse('https://api.vk.com/api.php?oauth=1&method=database.getCitiesById&city_ids='+city, function(k2, v2) {
if (k2 == 'name') city = v2;
});*/

/*
function showAlert(){
var html = HtmlService.createHtmlOutput('Скрипт отработал успешно');
  html.setWidth(200);
  html.setHeight(70);
  SpreadsheetApp.getUi().showModalDialog(html, 'Всё путём');
}*/