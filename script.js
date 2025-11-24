let display = document.getElementById("display");
let historyList = document.getElementById("historyList");

function add(v) {
    display.value += v;
}

function clearDisplay() {
    display.value = "";
}

function calc() {
    try {
        let expr = display.value.replace("^", "**");
        let res = eval(expr);
        addHistory(expr, res);
        display.value = res;
    } catch {
        display.value = "Ошибка";
    }
}

function addHistory(expr, res) {
    let li = document.createElement("li");
    li.textContent = expr + " = " + res;
    historyList.prepend(li);
}

document.querySelectorAll(".modes button").forEach(btn => {
    btn.onclick = () => {
        document.querySelector(".modes .active").classList.remove("active");
        btn.classList.add("active");

        document.querySelectorAll(".panel").forEach(p => p.classList.remove("active"));
        document.getElementById("panel-" + btn.dataset.mode).classList.add("active");
    };
});

function convert(type) {
    let n = parseInt(display.value);
    if (isNaN(n)) return;

    switch (type) {
        case "bin": display.value = n.toString(2); break;
        case "oct": display.value = n.toString(8); break;
        case "hex": display.value = n.toString(16).toUpperCase(); break;
        case "dec": display.value = parseInt(display.value, 2); break;
    }
}

function plot() {
    let f = document.getElementById("funcInput").value;
    let ctx = document.getElementById("chart");

    let xs = [];
    let ys = [];

    for (let x = -10; x <= 10; x += 0.1) {
        xs.push(x);
        try {
            let y = eval(f.replace(/x/g, `(${x})`));
            ys.push(y);
        } catch {
            ys.push(NaN);
        }
    }

    new Chart(ctx, {
        type: "line",
        data: {
            labels: xs,
            datasets: [{
                label: f,
                data: ys,
                borderColor: "#00f",
                borderWidth: 2,
                fill: false
            }]
        },
        options: { responsive: true }
    });
}
