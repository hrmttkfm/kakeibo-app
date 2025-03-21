const sheetUrl = "https://script.google.com/macros/s/AKfycbz6qrpLAYHLrtVGqKiKV60Kfh3AV56EDrTlCuxJJJ0HRLDVBzUEaJ8zbcR3oSpfxi3JFw/exec"; // Google Apps ScriptのURL

document.addEventListener("DOMContentLoaded", async () => {
    const categories = ["食品", "遊興", "医療", "インターネット", "ガス", "電気", "水道", "生活", "学習"]; // 本来はAPIで取得
    const payments = ["現金", "楽天VISA", "楽天Pay", "楽天JCB", "PayPay", "Suica", "イオンVISA", "ゆうちょ", "楽天銀行", "JACCS"];

    const categorySelect = document.getElementById("category");
    const paymentSelect = document.getElementById("payment");

    categories.forEach(cat => {
        let option = document.createElement("option");
        option.value = cat;
        option.textContent = cat;
        categorySelect.appendChild(option);
    });

    payments.forEach(pay => {
        let option = document.createElement("option");
        option.value = pay;
        option.textContent = pay;
        paymentSelect.appendChild(option);
    });

    document.getElementById("expenseForm").addEventListener("submit", async (e) => {
        e.preventDefault();
    
        // 入力された日付を取得して、スラッシュ形式に変更
        const rawDate = document.getElementById("date").value; // YYYY-MM-DD形式
        const formattedDate = rawDate.replace(/-/g, "/"); // YYYY/MM/DD形式に変換
        console.log(formattedDate);
    
        const data = {
            date: formattedDate, // 変換後の日付
            category: document.getElementById("category").value,
            location: document.getElementById("location").value,
            amount: document.getElementById("amount").value,
            payment: document.getElementById("payment").value,
            note: document.getElementById("note").value
        };
    
        console.log("送信データ:", data); // 送信前にデータを確認
    
        const response = await fetch(sheetUrl, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "text/plain" }, // text/plainにしないとcorsのエラーが出る
            body: JSON.stringify(data)
        });
    
        const result = await response.text();
        console.log("サーバーの応答:", result); // サーバーからのレスポンスを確認
    
        alert("データを送信しました: " + result);
    });
});
