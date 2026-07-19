let data = [];

// data.json を読み込む
fetch("data.json")
  .then(response => response.json())
  .then(json => {
    data = json;

    // ▼ 用語一覧を自動生成
    const wordList = document.getElementById("wordList");
    data.forEach(item => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="${item.link}">${item.term}</a>`;
      wordList.appendChild(li);
    });
  });

// ▼ ひらがな → カタカナ変換
function hiraToKana(str) {
  return str.replace(/[\u3041-\u3096]/g, ch =>
    String.fromCharCode(ch.charCodeAt(0) + 0x60)
  );
}

// ▼ 検索イベント
document.getElementById("searchBox").addEventListener("input", function() {
  const raw = this.value.trim();                 // 入力はそのまま（ひらがな表示）
  const keyword = hiraToKana(raw.toLowerCase()); // 内部だけカタカナに変換
  const resultDiv = document.getElementById("result");

  if (keyword === "") {
    resultDiv.innerHTML = "";
    return;
  }

  // ▼ 部分一致検索（includes）
  const hits = data.filter(entry =>
    hiraToKana(entry.term.toLowerCase()).includes(keyword)
  );

  if (hits.length === 0) {
    resultDiv.textContent = "該当する用語がありません。";
    return;
  }

  // ▼ 一覧をリンク付きで表示
  resultDiv.innerHTML = hits
    .map(item => `<a href="${item.link}">${item.term}</a>`)
    .join("<br>");
});
