document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Кастомный курсор ---
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');

    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            follower.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        });

        // Расширение курсора при наведении на кнопки и карточки
        document.querySelectorAll('a, button, .card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                follower.style.width = '50px';
                follower.style.height = '50px';
                follower.style.marginLeft = '-21px';
                follower.style.marginTop = '-21px';
                follower.style.background = 'rgba(255, 255, 255, 0.2)';
            });
            el.addEventListener('mouseleave', () => {
                follower.style.width = '30px';
                follower.style.height = '30px';
                follower.style.marginLeft = '-11px';
                follower.style.marginTop = '-11px';
                follower.style.background = 'transparent';
            });
        });
    }

    // --- 2. Музыкальный плеер ---
    const musicBtn = document.getElementById('music-btn');
    const bgMusic = document.getElementById('bg-music');
    let isPlaying = false;

    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicBtn.innerText = '🎵';
        } else {
            bgMusic.play().catch(e => console.log("Блокировка автоплея"));
            musicBtn.innerText = '⏸️';
        }
        isPlaying = !isPlaying;
    });

    // --- 3. Плавное появление элементов при скролле ---
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                
                // Если появился блок с текстом, запускаем печатную машинку
                if (entry.target.querySelector('#typewriter-text') && !isTyped) {
                    setTimeout(typeWriter, 500); // Небольшая задержка перед началом печати
                    isTyped = true;
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.hidden').forEach((el) => observer.observe(el));

    // --- 4. Эффект печатной машинки ---
    // ТУТ ТЫ МОЖЕШЬ НАПИСАТЬ СВОЙ ТЕКСТ!
    const textToType = "Каждый день с тобой — это самая красивая история, которую мне доводилось проживать. Ты делаешь меня самым счастливым человеком, и в этот весенний день я хочу напомнить тебе, что ты мое главное сокровище. Спасибо за твою любовь, поддержку и тепло. С 8 Марта, моя любимая девочка! 🌸✨";
    const typeWriterElement = document.getElementById('typewriter-text');
    let i = 0;
    let isTyped = false;

    function typeWriter() {
        if (i < textToType.length) {
            typeWriterElement.innerHTML += textToType.charAt(i);
            i++;
            // Скорость печати: случайная от 30 до 70 мс для реалистичности
            setTimeout(typeWriter, Math.random() * 40 + 30);
        }
    }

    // --- 5. Фоновые плавающие элементы (сердечки и лепестки) ---
    function createBackgroundParticle() {
        const particle = document.createElement('div');
        particle.classList.add('floating-particle');
        const symbols = ['🌸', '❤️', '✨', '💖', '🤍'];
        particle.innerText = symbols[Math.floor(Math.random() * symbols.length)];
        
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.animationDuration = Math.random() * 6 + 6 + 's'; // 6-12 секунд полет
        particle.style.fontSize = Math.random() * 15 + 10 + 'px'; 
        
        document.body.appendChild(particle);
        
        // Удаляем элемент после завершения анимации
        setTimeout(() => {
            particle.remove();
        }, 12000);
    }
    // Создаем новую частицу каждые 400мс
    setInterval(createBackgroundParticle, 400);

    // --- 6. Кнопка "Нажми сюда" (Взрыв сердечек) ---
    const loveBtn = document.getElementById('love-btn');
    const loveMessage = document.getElementById('love-message');

    loveBtn.addEventListener('click', (e) => {
        // Скрываем кнопку и показываем текст
        loveBtn.style.display = 'none';
        loveMessage.classList.add('show-msg');
        
        // Масштабный взрыв сердечек (70 штук)
        for (let j = 0; j < 70; j++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.classList.add('floating-particle');
                heart.innerText = ['❤️', '💖', '💘'][Math.floor(Math.random() * 3)];
                
                // Разлет во все стороны от курсора
                const x = e.clientX || window.innerWidth / 2;
                const y = e.clientY || window.innerHeight / 2;
                
                heart.style.left = x + (Math.random() * 400 - 200) + 'px';
                heart.style.top = y + (Math.random() * 400 - 200) + 'px';
                
                heart.style.animation = 'floatUp 2.5s ease-out forwards';
                heart.style.fontSize = Math.random() * 25 + 15 + 'px';
                
                document.body.appendChild(heart);
                
                setTimeout(() => heart.remove(), 2500);
            }, j * 15); // Задержка для эффекта "фонтана"
        }
    });
});