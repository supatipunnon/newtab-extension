const htmlCodeArea = document.getElementById('html-code');
const cssCodeArea = document.getElementById('css-code');
const jsCodeArea = document.getElementById('js-code');
const renderBtn = document.getElementById('render-btn');
const outputFrame = document.getElementById('output');

const iframe = document.getElementById('sandbox');
window.addEventListener('message', (event) => {
   console.log('EVAL output', event.data);
});
iframe.contentWindow.postMessage('10 + 20', '*');

function renderCode() {
  const htmlCode = htmlCodeArea.value;
  const cssCode = `<style>${cssCodeArea.value}</style>`;
  const jsCode = `<script>${jsCodeArea.value}</script>`;

  const outputDoc = outputFrame.contentDocument;
  outputDoc.open();
  outputDoc.write(htmlCode + cssCode + jsCode);
  outputDoc.close();
}

renderBtn.addEventListener('click', renderCode);