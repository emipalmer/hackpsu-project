export function getDocumentContent() {
  const doc = DocumentApp.getActiveDocument();
  const body = doc.getBody();
  const text = body.getText();
  console.log('[Context] Body text in the file: ', text);
  return text;
}
