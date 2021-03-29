let inputs = document.querySelectorAll("input");

let i = 1;
let fofx;
let x1;
let x2;
let tolerance;

let spans = document.querySelectorAll(".outputs span");

inputs[4].addEventListener("click", () => {
    spans.forEach(span => {
        span.style.display = "block";
    })

    fofx = inputs[0].value;
    x1 = inputs[1].value;
    x2 = inputs[2].value;
    tolerance = inputs[3].value;

    let initial_table = [["i", "$$x_1$$", "$$x_2$$", "$$f(x_1)$$", "$$f(x_2)$$", "$$x$$", "$$f(x)$$", "error"]];

    let final_answer = BisectionMethod(i, x1, x2, tolerance, fofx, initial_table);
    showAnswers(final_answer);
});

let maximum_interations = 50;

function BisectionMethod(i, x1, x2, tolerance, fofx, table) {

    let f1 = math.evaluate(fofx, { x: x1 });
    let f2 = math.evaluate(fofx, { x: x2 });

    if ((f1 * f2) > 0) return ["ERROR!Try another function or interval! ", table];
    let x = (x1 + x2) / 2;
    if (math.abs((x1 - x2) / x) < tolerance) return ["Solved", table];
    let f = math.evaluate(fofx, { x: x });
    let error = math.abs(x2 - x1) / math.pow(2, i);
    table.push([i, decimal(x1), decimal(x2), decimal(f1), decimal(f2), decimal(x), decimal(f), decimal(error)]);
    i++;
    if (i == maximum_interations) return ["Max interation count reached!", table]
    if ((f * f1) > 0) {
        x1 = x;
        f1 = f;
    }
    else {
        x2 = x;
        f2 = f;
    }
    return BisectionMethod(i, x1, x2, tolerance, fofx, table);
}

function decimal(value) {
    return Number.parseFloat(value).toFixed(4);
}

let outputs = document.querySelectorAll(".output");

function showAnswers(final_answer) {
    // remarks
    outputs[0].innerText = final_answer[0];

    let table = final_answer[1];

    // interations
    outputs[1].innerText = table[table.length - 1][0];

    // appoximated root
    outputs[2].innerText = table[table.length - 1][table[0].length - 3];

    // fofcn
    outputs[3].innerText = `: ${table[table.length - 1][table[0].length - 2]}`;

    // table
    showTable(table);

    MathJax.typeset();
}

function showTable(table) {
    outputs[4].innerHTML = "";

    let _table = document.createElement("table");
    for (let i = 0; i < table.length; i++) {
        let r = document.createElement("tr");
        for (let j = 0; j < table[i].length; j++) {
            let item = document.createElement("td");
            if (i == 0) {
                item.classList.toggle("column-name");
            };
            item.innerText = table[i][j];
            r.appendChild(item);
        }
        _table.appendChild(r);
    }
    outputs[4].appendChild(_table);
}