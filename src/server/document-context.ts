export function getDocumentContent() {
  console.log('[Context] here!');
  const doc = DocumentApp.getActiveDocument();
  const body = doc.getBody();
  const text = body.getText();
  console.log('[Context] this is the content: ', text);
  return text;
}
