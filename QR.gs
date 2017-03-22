//  -------------------- EACH FOLDER ITEM - WITH DESCRIPTION -------------------- 
function allFileIds(fileId) {
  var htmlPop = HtmlService.createHtmlOutputFromFile('Alert.html')
      .setWidth(500)
      .setHeight(120);
       DocumentApp.getUi().showModalDialog(htmlPop, 'QR Code Generator');
      
  var doc = DocumentApp.getActiveDocument();
  var body = doc.getBody();
  body.setMarginBottom(11.5).setMarginLeft(11.5).setMarginRight(11.5).setMarginTop(11.5);
  
  var file = DriveApp.getFolderById(fileId).getFiles();
  var output = [];
  var cache = CacheService.getUserCache();
  cache.put('shareId', fileId);
  // add files to array and pass the array over
  while(file.hasNext()){
    var fileIds = file.next().getId();
    output.push(fileIds);
  }
  getFileFromURLDesc(output);
}

function getFileFromURLDesc(output) {

  var active = DocumentApp.getActiveDocument();
  var activeID = active.getId();
  var doc = DocumentApp.openById(activeID).getBody();
  doc.setMarginBottom(11.5).setMarginLeft(11.5).setMarginRight(11.5).setMarginTop(11.5);
  var text = doc.editAsText();
  var cache = CacheService.getUserCache();
  var cacheKey = 0
  text.setFontSize(8);
  output.forEach(function(fileIds) {  
    var rc = 404;       // 404 Not Found
    var fileName = "";
    var fileSize = 0;
    var fileName = DriveApp.getFileById(fileIds).getName();
    
    var shareable = "https://drive.google.com/open?id="+fileIds
    try {
      var response = UrlFetchApp.fetch("https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl="+shareable); 
      var rc = response.getResponseCode();
    } catch (e)
    {
      debugger;
    }
    
    if (rc == 200) {
      var styles = {};
      styles[DocumentApp.Attribute.HORIZONTAL_ALIGNMENT] = DocumentApp.HorizontalAlignment.CENTER;
      
      var fileBlob = response.getBlob()
      var table = doc.appendTable();
      var tr = table.appendTableRow();
      var insImg = tr.appendTableCell().insertImage(0, response);
      var nameTxt = tr.appendTableCell(fileName); 
      nameTxt.editAsText().setFontSize(11);
      insImg.getParent().setAttributes(styles);
      var folder = DriveApp.getFoldersByName("QR Codes").next();    
      if (folder != null) {
        var file = folder.createFile(fileBlob);
        file.setName(fileName);
        cache.put(cacheKey, file.getId());
        cache.put('Num', cacheKey);
        ++cacheKey
     } else{
        var myDrive = DriveApp.getRootFolder();
        myDrive.createFolder("QR Codes");
        var folder = DriveApp.getFoldersByName("QR Codes").next();
        var file = folder.createFile(fileBlob);
        file.setName(fileName);
        cache.put(cacheKey, file.getId());
        cache.put('Num', cacheKey);
        ++cacheKey
     }
    
    }
  })
    var Pop = HtmlService.createHtmlOutputFromFile('Description.html')
      .setWidth(500)
      .setHeight(400);
       DocumentApp.getUi().showModalDialog(Pop, 'Extra Settings');
}

// -------------------- SINGLE ITEM - WITH DESCRIPTION -------------------- 
function getFileFromURLSingle(fileIds) {

  var htmlPop = HtmlService.createHtmlOutputFromFile('Alert.html')
      .setWidth(500)
      .setHeight(120);
       DocumentApp.getUi().showModalDialog(htmlPop, 'QR Code Generator');
       
  var active = DocumentApp.getActiveDocument();
  var activeID = active.getId();
  var doc = DocumentApp.openById(activeID).getBody();
  doc.setMarginBottom(11.5).setMarginLeft(11.5).setMarginRight(11.5).setMarginTop(11.5);
  var text = doc.editAsText();
  text.setFontSize(8);
  var cache = CacheService.getUserCache();
  var cacheKey = 0
  cache.put('shareId', fileIds);
  var rc = 404;       // 404 Not Found
  var fileName = "";
  var fileSize = 0;
  var fileName = DriveApp.getFileById(fileIds).getName();
  
  
  var shareable = "https://drive.google.com/open?id="+fileIds
  try {
    var response = UrlFetchApp.fetch("https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl="+shareable); 
    var rc = response.getResponseCode();
  } catch (e)
  {
    debugger;
  }
  
  if (rc == 200) {
    var styles = {};
    styles[DocumentApp.Attribute.HORIZONTAL_ALIGNMENT] = DocumentApp.HorizontalAlignment.CENTER;  
    var fileBlob = response.getBlob()
    
    for(var i=0; i<5; i++){
      var table = doc.appendTable();
      var tr = table.appendTableRow();
      var insImg = tr.appendTableCell().insertImage(0, response);
      var nameTxt = tr.appendTableCell(fileName); 
      nameTxt.editAsText().setFontSize(11);
      insImg.getParent().setAttributes(styles);
    }
    
    var folder = DriveApp.getFoldersByName("QR Codes").next();    
    if (folder != null){
      var file = folder.createFile(fileBlob);
      file.setName(fileName);
      cache.put(cacheKey, file.getId());
      cache.put('Num', cacheKey);
      ++cacheKey
    } else{
        var myDrive = DriveApp.getRootFolder();
        myDrive.createFolder("QR Codes");
        var folder = DriveApp.getFoldersByName("QR Codes").next();
        var file = folder.createFile(fileBlob);
        file.setName(fileName);
        cache.put(cacheKey, file.getId());
        cache.put('Num', cacheKey);
        ++cacheKey
     }
  }
  var Pop = HtmlService.createHtmlOutputFromFile('Description.html')
      .setWidth(500)
      .setHeight(400);
       DocumentApp.getUi().showModalDialog(Pop, 'Extra Settings');
}

//-------------------- EACH FOLDER ITEM -------------------- 
function allFile(fileId) {

  var htmlPop = HtmlService.createHtmlOutputFromFile('Alert.html')
      .setWidth(500)
      .setHeight(120);
       DocumentApp.getUi().showModalDialog(htmlPop, 'QR Code Generator');
       
  var active = DocumentApp.getActiveDocument().getId();
  var doc = DocumentApp.openById(active);
  var body = doc.getBody();
  body.setMarginBottom(11.5).setMarginLeft(11.5).setMarginRight(11.5).setMarginTop(11.5);
  var file = DriveApp.getFolderById(fileId).getFiles();
  var output = [];
  var count = 0
  var cache = CacheService.getUserCache();
  cache.put('shareId', fileId);
  
  // add file ids to array
  while(file.hasNext()){
    count++;
    var fileIds = file.next().getId();
    output.push(fileIds);
  }
  
  var countRows = count / 4 
  
  //Add a table in document
  
  var newTable = body.appendTable();
   
  //Create rows
  for(var i=0; i<countRows; i++){ 
    var tr = newTable.appendTableRow();
    
    //add 4 cells in each row
    for(var j=0; j<4; j++){
      tr.appendTableCell();
    }
  }
  getFileFromURL(output);
}

function getFileFromURL(output){
  var active = DocumentApp.getActiveDocument().getId();
  var doc = DocumentApp.openById(active);
  var body = doc.getBody();
  var row = 0
  var cell = 0 
  var numRow = 0
  var count = 0
  var pArr = []
    var cache = CacheService.getUserCache();
  var cacheKey = 0
  output.forEach(function(file){ 
    var rc = 404;       // 404 Not Found
    var fileName = "";
    var fileSize = 0;
    var fileName = DriveApp.getFileById(file).getName();
    
    var shareable = "https://drive.google.com/open?id="+file
    try {
      var response = UrlFetchApp.fetch("https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl="+shareable); 
      var rc = response.getResponseCode();
    } catch (e)
    {
      debugger;
    }
    
    if (rc == 200) { 
      var styles = {};
    styles[DocumentApp.Attribute.HORIZONTAL_ALIGNMENT] = DocumentApp.HorizontalAlignment.CENTER; 
    var blob = response.getBlob()
    var folder = DriveApp.getFoldersByName("QR Codes").next();    
    if (folder != null){
      var file = folder.createFile(blob);
      file.setName(fileName);
              cache.put(cacheKey, file.getId());
        cache.put('Num', cacheKey);
        ++cacheKey
    } else{
        var myDrive = DriveApp.getRootFolder();
        myDrive.createFolder("QR Codes");
        var folder = DriveApp.getFoldersByName("QR Codes").next();
        var file = folder.createFile(fileBlob);
        file.setName(fileName);
        cache.put(cacheKey, file.getId());
        cache.put('Num', cacheKey);
        ++cacheKey
     }
    
    var findTables = body.getTables()
    var table = findTables[0]
    
    var rowI = table.getRow(row);
    var cellI = rowI.getCell(cell);
    
    cellI.editAsText().insertText(0,fileName);
    var insImg = cellI.insertImage(0, blob)
    insImg.getParent().setAttributes(styles);
    cellI.getChild(0).asParagraph().setAttributes(styles)
    
    
    // ++row every 4th time  --> when reach 3 row=0
    if (numRow == 3){
      ++row 
    }
    
    // numRow alternaties between 0 & 1 & 2 & 3
    if (numRow == 0) { 
      numRow = 1 
    } else if (numRow == 1) {
      numRow = 2
    } else if (numRow == 2) {
      numRow = 3
    } else if (numRow == 3) {
      numRow = 0
    } 
    
    
    // alternate cell between 0 & 1 & 2 & 3     
    if (cell == 0) { 
      cell = 1 
    } else if (cell == 1) {
      cell = 2
    } else if (cell == 2) {
      cell = 3
    } else if (cell == 3) {
      cell = 0
    }
    ++count
    }
  }) 
    var Pop = HtmlService.createHtmlOutputFromFile('KeeporNotFolder.html')
      .setWidth(500)
      .setHeight(300);
       DocumentApp.getUi().showModalDialog(Pop, 'Extra Settings');
}

// -------------------- SINGLE ITEM -------------------- 
function FileFromURLSingle(fileIds){

  var htmlPop = HtmlService.createHtmlOutputFromFile('Alert.html')
      .setWidth(500)
      .setHeight(120);
       DocumentApp.getUi().showModalDialog(htmlPop, 'QR Code Generator');
       
  var active = DocumentApp.getActiveDocument().getId();
  var doc = DocumentApp.openById(active);
  var body = doc.getBody();
  var row = 0
  var cell = 0 
  var numRow = 0
  var count = 0
  var pArr = []
  var cache = CacheService.getUserCache();
  var cacheKey = 0
  cache.put('shareId', fileIds);
  //Add a table in document 
  var newTable = body.appendTable();
   
  //Create rows
  for(var i=0; i<5; i++){ 
    var tr = newTable.appendTableRow();
    
    //add 4 cells in each row
    for(var j=0; j<4; j++){
      tr.appendTableCell();
    }
  }
 
    var rc = 404;       // 404 Not Found
    var fileName = "";
    var fileSize = 0;
    var fileName = DriveApp.getFileById(fileIds).getName();
    
    var shareable = "https://drive.google.com/open?id="+fileIds
    try {
      var response = UrlFetchApp.fetch("https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl="+shareable); 
      var rc = response.getResponseCode();
    } catch (e)
    {
      debugger;
    }
    
    if (rc == 200) { 
      var styles = {};
    styles[DocumentApp.Attribute.HORIZONTAL_ALIGNMENT] = DocumentApp.HorizontalAlignment.CENTER; 
          var blob = response.getBlob()
         
     var folder = DriveApp.getFoldersByName("QR Codes").next();    
    if (folder != null){
      var file = folder.createFile(blob);
        file.setName(fileName);
        cache.put(cacheKey, file.getId());
        cache.put('Num', cacheKey);
        ++cacheKey
    } else{
        var myDrive = DriveApp.getRootFolder();
        myDrive.createFolder("QR Codes");
        var folder = DriveApp.getFoldersByName("QR Codes").next();
        var file = folder.createFile(fileBlob);
        file.setName(fileName);
        cache.put(cacheKey, file.getId());
        cache.put('Num', cacheKey);
        ++cacheKey
     }
    
  for(var i=0; i<20; i++){    
    var findTables = body.getTables()
    var table = findTables[0]
    
    var rowI = table.getRow(row);
    var cellI = rowI.getCell(cell);
    
    cellI.editAsText().insertText(0,fileName);
    var insImg = cellI.insertImage(0, blob)
    insImg.getParent().setAttributes(styles);
    cellI.getChild(0).asParagraph().setAttributes(styles)
    
    
    // ++row every 4th time  --> when reach 3 row=0
    if (numRow == 3){
      ++row 
    }
    
    // numRow alternaties between 0 & 1 & 2 & 3
    if (numRow == 0) { 
      numRow = 1 
    } else if (numRow == 1) {
      numRow = 2
    } else if (numRow == 2) {
      numRow = 3
    } else if (numRow == 3) {
      numRow = 0
    } 
    
    
    // alternate cell between 0 & 1 & 2 & 3     
    if (cell == 0) { 
      cell = 1 
    } else if (cell == 1) {
      cell = 2
    } else if (cell == 2) {
      cell = 3
    } else if (cell == 3) {
      cell = 0
    }
    ++count
    }
  } 
  var Pop = HtmlService.createHtmlOutputFromFile('KeeporNotSingle.html')
      .setWidth(500)
      .setHeight(300);
       DocumentApp.getUi().showModalDialog(Pop, 'Extra Settings');
}

// ------------------------------
function replaceDesc(form){
  var doc = DocumentApp.getActiveDocument();
  var body = doc.getBody();
  var findTables = body.getTables();
  var numTables = findTables.length;
  var t = 0
  var cache = CacheService.getUserCache();
  while(t < numTables){
  var table = findTables[t];
  table.getCell(0, 1).insertParagraph(1, form.Desc)
  ++t
  } 
  if(form.radio == "Not"){
  cache.put('SaveorNot', 'Not')
  var Num = cache.get('Num');
  Num++
  for(var i=0; i<Num; ++i){
    var id = cache.get(i);
    DriveApp.getFileById(id).setTrashed(true);
    cache.remove(i);
  }
  } else {
      cache.put('SaveorNot', 'Save')
  }
  
  var shareId = cache.get('shareId'); 
  var file = DriveApp.getFileById(shareId);
 
  if(form.radioSharing == "AnyoneLink"){
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      cache.remove('shareId');
      cache.remove('fileOrFolder');
   } else if(form.radioSharing == "Anyone"){
    //change sharing for shareId
     file.setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.VIEW);
     cache.remove('shareId');
     cache.remove('fileOrFolder');
   }
}

function KeeporNot(form){
var cache = CacheService.getUserCache();
  if(form.radio == "Not"){
    cache.put('SaveorNot', 'Not')
    var Num = cache.get('Num');
    Num++
    for(var i=0; i<Num; ++i){
      var id = cache.get(i);
      DriveApp.getFileById(id).setTrashed(true);
      cache.remove(i);
    }
  } else {
     cache.put('SaveorNot', 'Save')
  }
  
  var shareId = cache.get('shareId'); 
  var file = DriveApp.getFileById(shareId);
 
  if(form.radioSharing == "AnyoneLink"){
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      cache.remove('shareId');
      cache.remove('fileOrFolder');
   } else if(form.radioSharing == "Anyone"){
     file.setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.VIEW);
     cache.remove('shareId');
     cache.remove('fileOrFolder');
   }
}
