const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CONVAS_SIZE = 700;

canvas.width = CONVAS_SIZE;
canvas.height = CONVAS_SIZE;

// ctx.fillStyle = "white";
// ctx.fillRect = (0, 0, CONVAS_SIZE, CONVAS_SIZE)

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;


let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function changeColor(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function changeRange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function modeClick() {
    if (filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function clickCanvas() {
    if (filling === true) {
        ctx.fillRect(0, 0, 700, 700);
    }
}

function handelCM(event) {
    event.preventDefault();
}

function saveClick() {
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS";
    link.click();
}


if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", clickCanvas);
}

if (colors) {
    Array.from(colors).forEach((color) =>
        color.addEventListener("click", changeColor)
    );
}

if (range) {
    range.addEventListener("input", changeRange);

}

if (mode) {
    mode.addEventListener("click", modeClick)
}

if (saveBtn) {
    saveBtn.addEventListener("click", saveClick)
}