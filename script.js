const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let w, h;
let particles = [];
const particleConfig = {
    count: 60, 
    speed: 0.5,
    size: 2,
    color: 'rgba(0, 173, 216, 0.5)',
    linkDistance: 150
};

function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * particleConfig.speed;
        this.vy = (Math.random() - 0.5) * particleConfig.speed;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;
    }

    draw() {
        ctx.fillStyle = particleConfig.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, particleConfig.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < particleConfig.count; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, w, h);
    
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < particleConfig.linkDistance) {
                ctx.strokeStyle = `rgba(0, 173, 216, ${1 - dist / particleConfig.linkDistance})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => { resize(); initParticles(); });
resize();
initParticles();
animate();

const translations = {
    ru: {
        role: "Go Разработчик | Автоматизация",
        about_text: "Специализируюсь на создании эффективных бэкенд-систем и CLI утилит. Упрощаю сложные процессы через код.",
        stack_title: "Технологический Стек",
        projects_title: "Проекты",
        status_queue: "Очередь",
        status_dev: "В работе",
        status_paused: "На паузе",
        desc_typogo: "Тренер слепой печати в терминале.",
        desc_schedule: "Telegram бот с расписанием колледжа.",
        desc_mst: "Алгоритм шифрования.",
        desc_here: "Браузерное расширение для обхода контроля посещаемости.",
        btn_text: "EN"
    },
    en: {
        role: "Go Developer | Automation",
        about_text: "Specializing in building efficient backend systems and CLI tools. Simplifying complex workflows through code.",
        stack_title: "Tech Stack",
        projects_title: "Projects",
        status_queue: "Queue",
        status_dev: "In Dev",
        status_paused: "Paused",
        desc_typogo: "Terminal touch typing trainer.",
        desc_schedule: "Telegram bot for college schedule.",
        desc_mst: "Encryption algorithm.",
        desc_here: "Browser extension to bypass attendance checks.",
        btn_text: "RU"
    }
};

let currentLang = 'ru';
const langBtn = document.getElementById('lang-btn');
const elements = document.querySelectorAll('[data-key]');

langBtn.addEventListener('click', () => {
    currentLang = currentLang === 'ru' ? 'en' : 'ru';
    elements.forEach(el => {
        const key = el.getAttribute('data-key');
        if (translations[currentLang][key]) {
            el.textContent = translations[currentLang][key];
        }
    });
    langBtn.textContent = translations[currentLang].btn_text;
});

function updateClock() {
    const clockElement = document.getElementById('clock');
    const now = new Date();
    const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
    const targetOffset = 7; 
    const targetTime = new Date(utcTime + (3600000 * targetOffset));

    const h = String(targetTime.getHours()).padStart(2, '0');
    const m = String(targetTime.getMinutes()).padStart(2, '0');
    const s = String(targetTime.getSeconds()).padStart(2, '0');

    clockElement.textContent = `${h}:${m}:${s}`;
}
setInterval(updateClock, 1000);
updateClock();