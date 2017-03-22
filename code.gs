function onInstall(e){
  var myDrive = DriveApp.getRootFolder();
  myDrive.createFolder("QR Codes");
  onOpen(e);
}

function onOpen() {
  DocumentApp.getUi().createMenu('QR code')
  .addItem('Each Folder Item - With Description','showPickerFolder')
  .addItem('Single Item - With Description', 'showPickerSingle')
  .addItem('Each Folder Item', 'showPickerFolder2')
  .addItem('Single Item', 'showPickerSingle2')
  .addToUi();
}

function showPickerFolder() {
  var html = HtmlService.createHtmlOutputFromFile('PickerFolder-desc.html')
  .setWidth(600)
  .setHeight(425)
  .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  DocumentApp.getUi().showModalDialog(html, 'Select a Folder');
}

function showPickerSingle() {
  var html = HtmlService.createHtmlOutputFromFile('PickerSingle-desc.html')
  .setWidth(600)
  .setHeight(425)
  .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  DocumentApp.getUi().showModalDialog(html, 'Select a File');
}

function showPickerFolder2() {
  var html = HtmlService.createHtmlOutputFromFile('PickerFolder.html')
  .setWidth(600)
  .setHeight(425)
  .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  DocumentApp.getUi().showModalDialog(html, 'Select a Folder');
}

function showPickerSingle2() {
  var html = HtmlService.createHtmlOutputFromFile('PickerSingle.html')
  .setWidth(600)
  .setHeight(425)
  .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  DocumentApp.getUi().showModalDialog(html, 'Select a File');
}

function openSettings(){
  var html = HtmlService.createHtmlOutputFromFile('Settings.html')
  .setWidth(450)
  .setHeight(160)
  .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  DocumentApp.getUi().showModalDialog(html, 'Choose to keep a copy of each generated QR code or not:');
}

function getOAuthToken() {
  DriveApp.getRootFolder();
  return ScriptApp.getOAuthToken();
}

function checksaveornot(){
  var cache = CacheService.getUserCache();
  var checksaveornot = cache.get('SaveorNot');  
  var active = DocumentApp.getActiveDocument().getId();
  var doc = DriveApp.getFolderById(active);
  var owner = doc.getOwner().getEmail();
  var user = Session.getActiveUser().getEmail();
  
  return checksaveornot;
}

function test(){
    var cache = CacheService.getUserCache();
}
