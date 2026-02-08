function addRow() {
    const tbody = document.querySelector("#table tbody");

    const tr = document.createElement("tr");
    tr.classList.add("new-row"); // 
    tr.innerHTML = `
        <td><input class="name" type="text"></td>
        <td><input type="number" min="0" max="20" oninput="calculate()"></td>
        <td><input type="number" min="0" max="20" oninput="calculate()"></td>
        <td><input type="number" min="0" max="20" oninput="calculate()"></td>
        <td><input type="number" min="1" value="1" oninput="calculate()"></td>
        <td class="final">0</td>
        <td class="weighted">0</td>
        <td>
            <button class="rmv" onclick="removeRow(this)">remove</button>
        </td>
    `;
    tbody.appendChild(tr);
}
function removeRow(btn) {
    const row = btn.closest("tr");

    row.classList.add("removing-row");

    row.addEventListener("animationend", () => {
        row.remove();
        calculate();
    }, { once: true });
}


function calculate() {
    const rows = document.querySelectorAll("#table tbody tr");

    let sumFinalParam = 0;
    let sumParam = 0;

    rows.forEach(row => {
        const td = parseFloat(row.cells[1].querySelector("input").value);
        const tp = parseFloat(row.cells[2].querySelector("input").value);
        const exam = parseFloat(row.cells[3].querySelector("input").value);
        const param = parseFloat(row.cells[4].querySelector("input").value) || 0;

        let final = 0;

        if (!isNaN(exam)) {
            if (!isNaN(td) && !isNaN(tp)) {
                // TD + TP + Exam
                final = (((td + tp) / 2) * 0.4) + (exam * 0.6);
            } 
            else if (!isNaN(td)) {
                // TD + Exam
                final = (td * 0.4) + (exam * 0.6);
            } 
            else if (!isNaN(tp)) {
                // TP + Exam
                final = (tp * 0.4) + (exam * 0.6);
            } 
            else {
                // Exam only
                final = exam;
            }
        }

        final = Math.round(final * 100) / 100;
        const weighted = Math.round(final * param * 100) / 100;

        row.querySelector(".final").textContent = final;
        row.querySelector(".weighted").textContent = weighted;

        sumFinalParam += weighted;
        sumParam += param;
    });

    const globalFinal = sumParam > 0
        ? Math.round((sumFinalParam / sumParam) * 100) / 100
        : 0;

    document.getElementById("sumWeighted").textContent =
        "sum (final × parameter): " + sumFinalParam;

    const numberEl = document.getElementById("finalNumber");

numberEl.textContent = globalFinal;

// reset color
numberEl.classList.remove("pass", "fail");

// apply color only to the number
if (globalFinal < 10) {
    numberEl.classList.add("fail");
} else {
    numberEl.classList.add("pass");
}
}

// start with one row
addRow();