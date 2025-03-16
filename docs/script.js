const sheetUrl = "https://script.google.com/macros/s/xxxxxxxxxxx/exec"; // Google Apps ScriptのURL

document.addEventListener("DOMContentLoaded", async () => {
    const categories = ["食費", "交通費", "光熱費"]; // 本来はAPIで取得
    const payments = ["現金", "クレジット", "電子マネー"];

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
