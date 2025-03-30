export const onOpen = () => {
  const menu = DocumentApp.getUi()
    .createMenu('Rewryte')
    .addItem('Sidebar', 'openChatSidebar');

  menu.addToUi();
};

export const openChatSidebar = () => {
  const html =
    HtmlService.createHtmlOutputFromFile('rewryte-core').setTitle('Rewryte');
  DocumentApp.getUi().showSidebar(html);
};
