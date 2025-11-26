const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let animationId;

const menuBtn = document.getElementById("menuBtn");
const menuPopup = document.getElementById("menuPopup");

menuBtn.onclick = () => {
    menuPopup.classList.add("show");
};

function selectDemo(num) {
    menuPopup.classList.remove("show");
    showDemo(num);
}

/* click ra ngoài để đóng menu */
window.addEventListener("click", function(e) {
    if (e.target === menuPopup) {
        menuPopup.classList.remove("show");
    }
});

function demoBasicShapes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "red";
    ctx.fillRect(50, 50, 150, 100);

    ctx.beginPath();
    ctx.arc(350, 120, 60, 0, Math.PI * 2);
    ctx.fillStyle = "blue";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(550, 50);
    ctx.lineTo(700, 150);
    ctx.stroke();
}

function demoColorGradient() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "rgba(255, 100, 100, 0.8)";
    ctx.fillRect(50, 50, 200, 120);

    ctx.strokeStyle = "black";
    ctx.lineWidth = 4;
    ctx.strokeRect(50, 50, 200, 120);

    ctx.beginPath();
    ctx.arc(400, 110, 60, 0, Math.PI * 2);
    ctx.fillStyle = "#4fc3f7"; 
    ctx.fill();

    ctx.strokeStyle = "#0277bd";
    ctx.lineWidth = 5;
    ctx.stroke();

    const g1 = ctx.createLinearGradient(550, 50, 750, 170);
    g1.addColorStop(0, "purple");
    g1.addColorStop(1, "pink");

    ctx.fillStyle = g1;
    ctx.fillRect(550, 50, 200, 120);

    ctx.strokeStyle = "black";
    ctx.strokeRect(550, 50, 200, 120);

    const g2 = ctx.createRadialGradient(400, 330, 20, 400, 330, 80);
    g2.addColorStop(0, "yellow");
    g2.addColorStop(1, "red");

    ctx.beginPath();
    ctx.arc(400, 330, 80, 0, Math.PI * 2);
    ctx.fillStyle = g2;
    ctx.fill();
}

function demoSnow() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let snowflakes = [];

    for (let i = 0; i < 150; i++) {
        snowflakes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 3 + 1,
            speed: Math.random() * 1 + 0.5
        });
    }

    function drawSnow() {
        let gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, "#0a1a2b");
        gradient.addColorStop(1, "#06111f");
        ctx.fillStyle = gradient;
ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let flake of snowflakes) {
            ctx.beginPath();

            ctx.shadowColor = "rgba(255, 255, 255, 0.8)";
            ctx.shadowBlur = 10;

            ctx.fillStyle = "white";
            ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = "rgba(255,255,255,0.3)";
            ctx.lineWidth = 1;
            ctx.stroke();

            flake.y += flake.speed;
            if (flake.y > canvas.height) {
                flake.y = -5;
                flake.x = Math.random() * canvas.width;
            }
        }

        animationId = requestAnimationFrame(drawSnow);
    }

    drawSnow();
}

function demoClock() {
    function drawClock() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const now = new Date();
        let sec = now.getSeconds();
        let min = now.getMinutes();
        let hr  = now.getHours();

        let centerX = canvas.width / 2;
        let centerY = canvas.height / 2;

        ctx.beginPath();
        ctx.arc(centerX, centerY, 150, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + Math.sin(sec * Math.PI/30) * 120,
                   centerY - Math.cos(sec * Math.PI/30) * 120);
        ctx.strokeStyle = "red";
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + Math.sin(min * Math.PI/30) * 100,
                   centerY - Math.cos(min * Math.PI/30) * 100);
        ctx.strokeStyle = "black";
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + Math.sin((hr%12) * Math.PI/6) * 80,
                   centerY - Math.cos((hr%12) * Math.PI/6) * 80);
        ctx.lineWidth = 4;
        ctx.stroke();
        ctx.lineWidth = 1;

        animationId = requestAnimationFrame(drawClock);
    }

    drawClock();
}

function demoDragDrop() {
    let ball = { x: 200, y: 200, r: 40, dragging: false };

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
        ctx.fillStyle = "blue";
        ctx.fill();
    }

    canvas.onmousedown = e => {
        let dx = e.offsetX - ball.x;
        let dy = e.offsetY - ball.y;
        if (dx*dx + dy*dy <= ball.r * ball.r) {
            ball.dragging = true;
        }
    };

    canvas.onmousemove = e => {
        if (ball.dragging) {
            ball.x = e.offsetX;
            ball.y = e.offsetY;
            draw();
        }
    };

    canvas.onmouseup = () => ball.dragging = false;

    draw();
}

function demoCatchBall() {
    let ball = { x: 400, y: 0, r: 15 };
    let basket = { x: 350, w: 100, h: 20 };

    document.onmousemove = e => {
        basket.x = e.clientX - canvas.getBoundingClientRect().left - basket.w / 2;
    };

    function drawCatch() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
        ctx.fillStyle = "red";
        ctx.fill();

        ctx.fillStyle = "black";
        ctx.fillRect(basket.x, 450, basket.w, basket.h);

        ball.y += 3;

        if (ball.y > 450 && ball.x > basket.x && ball.x < basket.x + basket.w) {
            ball.y = 0;
            ball.x = Math.random() * canvas.width;
        }

        if (ball.y > canvas.height) {
            ball.y = 0;
            ball.x = Math.random() * canvas.width;
        }

        animationId = requestAnimationFrame(drawCatch);
    }

    drawCatch();
}

function showDemo(num) {
    cancelAnimationFrame(animationId);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (num === 1) demoBasicShapes();
    if (num === 2) demoColorGradient();
    if (num === 3) demoSnow();
    if (num === 4) demoClock();
    if (num === 5) demoDragDrop();
    if (num === 6) demoCatchBall();
}