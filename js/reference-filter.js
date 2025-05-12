// 折りたたみ機能
document.querySelectorAll('.method-header').forEach(header => {
  header.addEventListener('click', () => {
    const content = header.nextElementSibling;
    content.style.display = content.style.display === 'block' ? 'none' : 'block';
  });
});

// 検索機能（クラス・メソッド・ラベル）
function filterReference() {
  const classQuery = document.getElementById('classSearch').value.toLowerCase().trim();
  const methodQuery = document.getElementById('methodSearch').value.toLowerCase().trim();
  const labelQuery = document.getElementById('labelSearch').value.toLowerCase().trim();

  document.querySelectorAll('.method-block').forEach(block => {
    const className = block.getAttribute('data-class').toLowerCase();
    const methodName = block.getAttribute('data-method').toLowerCase();
    const labels = block.getAttribute('data-labels').toLowerCase();

    const classMatch = classQuery === '' || className.includes(classQuery);
    const methodMatch = methodQuery === '' || methodName.includes(methodQuery);
    const labelMatch = labelQuery === '' || labels.includes(labelQuery);

    block.style.display = (classMatch && methodMatch && labelMatch) ? 'block' : 'none';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('classSearch').addEventListener('input', filterReference);
  document.getElementById('methodSearch').addEventListener('input', filterReference);
  document.getElementById('labelSearch').addEventListener('input', filterReference);
});
