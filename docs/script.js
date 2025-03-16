const sheetUrl = "https://script.google.com/macros/s/AKfycbz6qrpLAYHLrtVGqKiKV60Kfh3AV56EDrTlCuxJJJ0HRLDVBzUEaJ8zbcR3oSpfxi3JFw/exec"; // Google Apps ScriptのURL、デプロイを管理からURLを拾ってくる

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
        
        const data = {
            date: document.getElementById("date").value,
            category: categorySelect.value,
            location: document.getElementById("location").value,
            amount: document.getElementById("amount").value,
            payment: paymentSelect.value,
            note: document.getElementById("note").value
        };

        await fetch(sheetUrl, {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        });

        alert("データを送信しました");
    });
});
