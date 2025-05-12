// 折りたたみ機能
document.querySelectorAll('.method-header').forEach(header => {
  header.addEventListener('click', () => {
    const content = header.nextElementSibling;
    content.style.display = content.style.display === 'block' ? 'none' : 'block';
  });
});

// ハッシュを更新（検索キーワードをURLに保持）
function updateHashFromInputs() {
  const classValue = encodeURIComponent(document.getElementById('classSearch').value.trim());
  const methodValue = encodeURIComponent(document.getElementById('methodSearch').value.trim());
  const labelValue = encodeURIComponent(document.getElementById('labelSearch').value.trim());

  const hash = `class=${classValue}&method=${methodValue}&label=${labelValue}`;
  history.replaceState(null, '', `#${hash}`);
}

// ハッシュを解析して検索欄に反映
function applyHashToInputs() {
  const params = new URLSearchParams(location.hash.replace(/^#/, ''));
  document.getElementById('classSearch').value = decodeURIComponent(params.get('class') || '');
  document.getElementById('methodSearch').value = decodeURIComponent(params.get('method') || '');
  document.getElementById('labelSearch').value = decodeURIComponent(params.get('label') || '');
}

// 検索処理本体
function filterReference() {
  const classQuery = document.getElementById('classSearch').value.toLowerCase().trim();
  const methodQuery = document.getElementById('methodSearch').value.toLowerCase().trim();
  const labelQuery = document.getElementById('labelSearch').value.toLowerCase().trim();

  updateHashFromInputs(); // URLに検索キーワード反映

  const matchedBlocks = [];

  document.querySelectorAll('.method-block').forEach(block => {
    const className = block.getAttribute('data-class').toLowerCase();
    const methodName = block.getAttribute('data-method').toLowerCase();
    const labels = block.getAttribute('data-labels').toLowerCase();

    const classMatch = classQuery === '' || className.includes(classQuery);
    const methodMatch = methodQuery === '' || methodName.includes(methodQuery);
    const labelMatch = labelQuery === '' || labels.includes(labelQuery);

    const matched = classMatch && methodMatch && labelMatch;
    block.style.display = matched ? 'block' : 'none';

    // 一致する要素を保存
    if (matched) matchedBlocks.push(block);
  });

  // 一致が1件だけなら自動展開
  if (matchedBlocks.length === 1) {
    const content = matchedBlocks[0].querySelector('.method-content');
    if (content) content.style.display = 'block';
    matchedBlocks[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

// 初期化
document.addEventListener('DOMContentLoaded', () => {
  applyHashToInputs();   // ← URLのハッシュを検索欄に反映
  filterReference();     // ← 初期フィルタリング

  document.getElementById('classSearch').addEventListener('input', filterReference);
  document.getElementById('methodSearch').addEventListener('input', filterReference);
  document.getElementById('labelSearch').addEventListener('input', filterReference);
});
