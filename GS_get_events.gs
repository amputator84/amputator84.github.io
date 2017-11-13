function doGet(e){
//  var token = VALID_MSG_TOKEN;
  var html = UrlFetchApp.fetch('https://api.vk.com/method/groups.search?q=%D1%80%D0%BE%D0%BA&v=5.65&access_token=eacff769774616c488d33cdebc0a9b6e554a441499fd21e260e4d31dc9ea7e29a69966b2bb1f54f736c23&type=event');
  //Logger.log(html.getContentText());
  //Logger.log(html);
  //return ContentService.createTextOutput(html);
  JSON.parse(html, function(k, v) {
    Logger.log(v);
  });
}

function doPost(e){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0];
  
  //var inp = '{"1":{"name":"18.10 - ПОТРАЧЕНО.FM/ОБРЫВКИ КИНОЛЕНТ - ОМСК111","screen_name":"belarusrapontour_omsk","city":"Омск","start_date":"18.10.2017","kolvo":3},"2":{"name":"18.10 - ПОТРАЧЕНО.FM/ОБРЫВКИ КИНОЛЕНТ - ОМСК","screen_name":"belarusrapontour_omsk2","city":"Омск","start_date":"18.10.2017","kolvo":3},"3":{"name":"33","screen_name":"Проверка","city":"Омск","start_date":"19.10.2017","kolvo":3}}';
  //var len = 10;
  var inp = e.parameter['html_ret'];
  var len = e.parameter['kolvo'];
  var arr = JSON.parse(inp);
  
  var name_rus = '';
  var short_name = '';
  var start_date = '';
  var city = '';
  var url = '';
  var numRows = 0;
  var arr_short = [];
  
  var data = sheet.getDataRange().getValues();
  
  if (data[0][1]){ /*Если список не пустой*/
    for (var j = 0; j < data.length; j++) {
      arr_short.push(data[j][1].replace('vk.com/',''));
    }
  }
  Logger.log(arr_short);

  
  for (var i = 1; i <= len; i++){

    if (arr[i] != undefined){
      if (arr_short.indexOf(arr[i].screen_name) == -1){
        
        name_rus = arr[i].name;
        short_name = arr[i].screen_name;
        start_date = arr[i].start_date;
        city = arr[i].city;
        url = 'vk.com/'+short_name;

        numRows = sheet.getLastRow()+1;
        sheet.insertRowsAfter(numRows, 1);
        sheet.getRange("A"+numRows).setValue(name_rus);
        sheet.getRange("B"+numRows).setValue('vk.com/'+short_name);
        sheet.getRange("C"+numRows).setValue(start_date);
        sheet.getRange("D"+numRows).setValue(city);
        sheet.getRange("E"+numRows).setValue('['+short_name+'|'+name_rus+']');
      }
    }
  }

  return ContentService.createTextOutput('Збсь');
  //return ContentService.createTextOutput(e.parameter['html_ret']);
  
  //var aURL = 'https://api.vk.com/api.php?oauth=1&method=groups.getById&group_ids=govorit_poet,mathmarriageabelandkrell&fields=city';
  //var resp = UrlFetchApp.fetch(e.parameter['html_ret']);
  //var dataAll = JSON.parse(resp.getContentText());
  //var len = dataAll.response.length;
  //var name_rus = '';
  
  //sheet.getRange("A1").setValue(JSON.parse(UrlFetchApp.fetch(e.parameter['html_ret'])));
  
  /*for (var i = 0; i < len; i++){
    
    name_rus = dataAll.response[i].name;
    short_name = dataAll.response[i].screen_name;
    
    var numRows = sheet.getLastRow()+1;
    sheet.insertRowsAfter(numRows, 1);
    sheet.getRange("A"+numRows).setValue(name_rus);
    sheet.getRange("B"+numRows).setValue(short_name);
    sheet.getRange("C"+numRows).setValue('['+short_name+'|'+name_rus+']');
    sheet.getRange("D"+numRows).setValue('vk.com/'+short_name+' - '+name_rus);
  }*/
}

function retHTML(){
  return '{"response":{"count":5297,"items":[{"id":37868533,"name":"\"Байк-Рок Фестиваль 2017\" г.Осиповичи","screen_name":"1moto_by","is_closed":0,"type":"event","photo_50":"https:\/\/pp.userapi.com\/c639822\/v639822314\/321f3\/UZvVt-y08Pg.jpg","photo_100":"https:\/\/pp.userapi.com\/c639822\/v639822314\/321f2\/ign2oG0Wv8s.jpg","photo_200":"https:\/\/pp.userapi.com\/c639822\/v639822314\/321f1\/XiEkRIWcbS0.jpg"},{"id":41065672,"name":"Парк рока","screen_name":"park_fest","is_closed":0,"type":"event","photo_50":"https:\/\/pp.userapi.com\/c622130\/v622130813\/1deda\/t7BB-6L47aQ.jpg","photo_100":"https:\/\/pp.userapi.com\/c622130\/v622130813\/1ded9\/KsfKSt2izsE.jpg","photo_200":"https:\/\/pp.userapi.com\/c622130\/v622130813\/1ded7\/p1qSpEVzR0Y.jpg"},{"id":9638204,"name":"Рок над Волгой","screen_name":"rocknadvolgoiru","is_closed":0,"type":"event","photo_50":"https:\/\/pp.userapi.com\/c416230\/v416230869\/8c0c\/0Dqb5GZMBDE.jpg","photo_100":"https:\/\/pp.userapi.com\/c416230\/v416230869\/8c0b\/qJxOxUEl0Eo.jpg","photo_200":"https:\/\/pp.userapi.com\/c416230\/v416230869\/8c0a\/F_y-Gn0-nrc.jpg"},{"id":68233916,"name":"Рок-концерт Лестница в небо (18+)","screen_name":"lestnica_v_nebo_2017","is_closed":0,"type":"event","photo_50":"https:\/\/pp.userapi.com\/c637427\/v637427489\/2fb81\/kylABWB8QaY.jpg","photo_100":"https:\/\/pp.userapi.com\/c637427\/v637427489\/2fb80\/l9YKU1ReRVM.jpg","photo_200":"https:\/\/pp.userapi.com\/c637427\/v637427489\/2fb7f\/ZEwyI-MM4Z4.jpg"},{"id":137204489,"name":"Конкурсы репостов от рок группы РВАНЫЕ РАНЫ","screen_name":"rrany_ru_album","is_closed":0,"type":"event","photo_50":"https:\/\/pp.userapi.com\/c639530\/v639530874\/eef7\/CufrKOfjKG4.jpg","photo_100":"https:\/\/pp.userapi.com\/c639530\/v639530874\/eef6\/9LX5nbxEtGo.jpg","photo_200":"https:\/\/pp.userapi.com\/c639530\/v639530874\/eef4\/wqt4ODh-Wv8.jpg"},{"id":74706776,"name":"Байк-Рок фестиваль \"Взлётная Полоса\"","screen_name":"runwayhmc","is_closed":0,"type":"event","photo_50":"https:\/\/pp.userapi.com\/c836124\/v836124121\/3c68e\/I3arjUBu1no.jpg","photo_100":"https:\/\/pp.userapi.com\/c836124\/v836124121\/3c68d\/p2F-pKb3qI4.jpg","photo_200":"https:\/\/pp.userapi.com\/c836124\/v836124121\/3c68c\/_1Yp669eBMk.jpg"},{"id":93430960,"name":"➨ Рок Музыка Forever","screen_name":"infolemon13","is_closed":0,"type":"event","photo_50":"https:\/\/pp.userapi.com\/c638528\/v638528613\/3b69a\/YeM-stb1_f4.jpg","photo_100":"https:\/\/pp.userapi.com\/c638528\/v638528613\/3b699\/kEWvB1FthcQ.jpg","photo_200":"https:\/\/pp.userapi.com\/c638528\/v638528613\/3b698\/WJnJYPM20r0.jpg"},{"id":121997338,"name":"Рок-фестиваль ЧЕРНОЗЁМ-2016 | Тамбов","screen_name":"chernozem_tmb_2016","is_closed":0,"type":"event","photo_50":"https:\/\/pp.userapi.com\/c604719\/v604719000\/5095f\/YgGXI3Um4jg.jpg","photo_100":"https:\/\/pp.userapi.com\/c604719\/v604719000\/5095e\/-LoYQY2QGuE.jpg","photo_200":"https:\/\/pp.userapi.com\/c604719\/v604719000\/5095d\/zbwb2cfhPJg.jpg"},{"id":82803127,"name":"РОК ЗА БОБРОВ 2017","screen_name":"rokzabobrov2017","is_closed":0,"type":"event","photo_50":"https:\/\/pp.userapi.com\/c639517\/v639517859\/19880\/L8GAaoAyJ0c.jpg","photo_100":"https:\/\/pp.userapi.com\/c639517\/v639517859\/1987f\/KwFEoXif_-w.jpg","photo_200":"https:\/\/pp.userapi.com\/c639517\/v639517859\/1987e\/0wZR-la6CXs.jpg"},{"id":107509248,"name":"Магазин рок-атрибутики HEADBANGER","screen_name":"headbanger_com_ua_event","is_closed":0,"type":"event","photo_50":"https:\/\/pp.userapi.com\/c627321\/v627321469\/2b318\/JZmkhyrAkI0.jpg","photo_100":"https:\/\/pp.userapi.com\/c627321\/v627321469\/2b317\/XNa9byLNtuI.jpg","photo_200":"https:\/\/pp.userapi.com\/c627321\/v627321469\/2b316\/0KQUj_yZjIA.jpg"},{"id":48388767,"name":"résonance - РОК ХИТЫ. СИМФОНИЧЕСКИЙ ОРКЕСТР. dp","screen_name":"rock_orchestra_2","is_closed":0,"type":"event","photo_50":"https:\/\/pp.userapi.com\/c837332\/v837332827\/4876f\/p9gP54R2s-0.jpg","photo_100":"https:\/\/pp.userapi.com\/c837332\/v837332827\/4876e\/y5dCNGnkUEA.jpg","photo_200":"https:\/\/pp.userapi.com\/c837332\/v837332827\/4876d\/AleGEqWQAT4.jpg"},{"id":89744036,"name":"Открытие   Рок магазина","screen_name":"rock_shop_onlin","is_closed":0,"type":"event","photo_50":"https:\/\/pp.userapi.com\/c623630\/v623630519\/230d3\/PJvXIMJYzEI.jpg","photo_100":"https:\/\/pp.userapi.com\/c623630\/v623630519\/230d2\/K-2NthxS4vw.jpg","photo_200":"https:\/\/pp.userapi.com\/c623630\/v623630519\/230d1\/FvD_ZUbQeBo.jpg"},{"id":89537930,"name":"Рок под Курском 2017 | Официальная группа","screen_name":"rockpodkurskom","is_closed":0,"type":"event","photo_50":"https:\/\/pp.userapi.com\/c639625\/v639625985\/a15a\/W3NC7iZ94lk.jpg","photo_100":"https:\/\/pp.userapi.com\/c639625\/v639625985\/a159\/avvlo6mkGGs.jpg","photo_200":"https:\/\/pp.userapi.com\/c639625\/v639625985\/a158\/kdBqe35qv7E.jpg"},{"id":117874504,"name":"Фестиваль СХІД-РОК 2016","screen_name":"cxidpok2016","is_closed":0,"type":"event","photo_50":"https:\/\/pp.userapi.com\/c637527\/v637527455\/5ef4\/ouQ3Qf81bn0.jpg","photo_100":"https:\/\/pp.userapi.com\/c637527\/v637527455\/5ef3\/gVwAMvZt8-U.jpg","photo_200":"https:\/\/pp.userapi.com\/c637527\/v637527455\/5ef2\/VutWLTrVce4.jpg"},{"id":99070981,"name":"Рок магазин","screen_name":"batterypro","is_closed":0,"type":"event","photo_50":"https:\/\/pp.userapi.com\/c836738\/v836738886\/4a3a7\/zZr8b18x_Vs.jpg","photo_100":"https:\/\/pp.userapi.com\/c836738\/v836738886\/4a3a6\/W8USqWEmcfU.jpg","photo_200":"https:\/\/pp.userapi.com\/c836738\/v836738886\/4a3a5\/TBeGNd48mHY.jpg"},{"id":146710142,"name":"Рок-фестиваль КИНОпробы. Solstice. Окуловка 2018","screen_name":"kinoproby2017","is_closed":0,"type":"event","photo_50":"https:\/\/pp.userapi.com\/c836126\/v836126161\/6c61b\/bymkS3piOwg.jpg","photo_100":"https:\/\/pp.userapi.com\/c836126\/v836126161\/6c61a\/CJCOCKNsw4I.jpg","photo_200":"https:\/\/pp.userapi.com\/c836126\/v836126161\/6c619\/AZVGnEFasKw.jpg"},{"id":68401301,"name":"Добрый рок Псков","screen_name":"dobro_rock","is_closed":0,"type":"event","photo_50":"https:\/\/pp.userapi.com\/c627327\/v627327361\/3bb15\/9jGrrA855q4.jpg","photo_100":"https:\/\/pp.userapi.com\/c627327\/v627327361\/3bb14\/Fm3ugYeulDA.jpg","photo_200":"https:\/\/pp.userapi.com\/c627327\/v627327361\/3bb12\/7QIuM5P2CvQ.jpg"},{"id":104125077,"name":"ОСТАННЄ SCHOOL PARTY РОКУ","screen_name":"club104125077","is_closed":0,"type":"event","photo_50":"https:\/\/vk.com\/images\/community_50.png","photo_100":"https:\/\/vk.com\/images\/community_100.png","photo_200":"https:\/\/vk.com\/images\/community_200.png"},{"id":146318779,"name":"Рок-фестиваль ЧЕРНОЗЁМ-2017 | Тамбов","screen_name":"chernozem_2017","is_closed":0,"type":"event","photo_50":"https:\/\/pp.userapi.com\/c636924\/v636924000\/685e5\/t63M-2jYUyI.jpg","photo_100":"https:\/\/pp.userapi.com\/c636924\/v636924000\/685e4\/LfcwvZsoReA.jpg","photo_200":"https:\/\/pp.userapi.com\/c636924\/v636924000\/685e3\/fvK-MB82eH0.jpg"},{"id":56874588,"name":"12 марта Байк-Рок Масленица","screen_name":"bike_rock_festival","is_closed":0,"type":"event","photo_50":"https:\/\/pp.userapi.com\/c627523\/v627523325\/2f6a9\/I0afXJyqEIE.jpg","photo_100":"https:\/\/pp.userapi.com\/c627523\/v627523325\/2f6a8\/2CD3oJV_JQ4.jpg","photo_200":"https:\/\/pp.userapi.com\/c627523\/v627523325\/2f6a6\/N6DwsNHfJ_g.jpg"}]}}';
}

function vkGetGroups(id, msg) {
  var token = 'eacff769774616c488d33cdebc0a9b6e554a441499fd21e260e4d31dc9ea7e29a69966b2bb1f54f736c23';
  var user_id = 5978179;
  var message = msg;
  var apiMsg =  "https://api.vk.com/method/users.getSubscriptions"
  var response = UrlFetchApp.fetch(apiMsg+"?"+"user_id="+user_id+"&extended=1&count=300&fields=city&access_token="+token);
  Logger.log(response.getContentText());
} 

function include(filename) {
   //eval(UrlFetchApp.fetch('https://vk.com/js/api/openapi.js?149'));
  Logger.log(VK.api.call);
}
function VK() {
   eval(UrlFetchApp.fetch('https://vk.com/js/api/openapi.js?149'));
}
function VK() {
   eval(UrlFetchApp.fetch('https://vk.com/js/api/openapi.js?149'));
}