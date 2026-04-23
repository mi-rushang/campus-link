(function() {
    const canvas = document.createElement('canvas');
    canvas.id = 'sparkle-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d', { alpha: true }); // optimize canvas context

    let width, height;
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    window.addEventListener('resize', resize);
    resize();

    const particles = [];
    
    // Pre-calculate CSS color strings to avoid string interpolation in the render loop
    const colors = [
        { h: 220, s: 100, l: 65 }, // Blue
        { h: 270, s: 90, l: 65 },  // Purple
        { h: 160, s: 85, l: 60 }   // Emerald
    ];

    function addParticle(x, y) {
        const colorBase = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 2 + 0.5; // Slightly smaller base size for better performance
        
        particles.push({
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 1.5, 
            vy: (Math.random() - 0.5) * 1.5 + 0.5, 
            life: 1,
            decay: Math.random() * 0.02 + 0.015,
            size: size,
            color: colorBase
        });
    }

    // Use a variable to track mouse position instead of spawning in the event listener directly
    // This decouples the event rate from the particle spawning rate for consistent performance
    let pointerX = -100;
    let pointerY = -100;
    let isMoving = false;
    let idleTimeout = null;

    window.addEventListener('mousemove', e => {
        pointerX = e.clientX;
        pointerY = e.clientY;
        isMoving = true;
        
        // Spawn a particle immediately on move for responsiveness
        addParticle(pointerX + (Math.random()*10 - 5), pointerY + (Math.random()*10 - 5));

        clearTimeout(idleTimeout);
        idleTimeout = setTimeout(() => {
            isMoving = false;
        }, 100);
    });

    window.addEventListener('touchmove', e => {
        pointerX = e.touches[0].clientX;
        pointerY = e.touches[0].clientY;
        isMoving = true;
        
        addParticle(pointerX + (Math.random()*10 - 5), pointerY + (Math.random()*10 - 5));

        clearTimeout(idleTimeout);
        idleTimeout = setTimeout(() => {
            isMoving = false;
        }, 100);
    });

    const PI2 = Math.PI * 2;

    function update() {
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // If the mouse is moving, spawn particles at the current position
        if (isMoving) {
            // Spawn 1-2 particles per frame while moving
            addParticle(pointerX + (Math.random()*10 - 5), pointerY + (Math.random()*10 - 5));
        }
        
        // Use lighter composite operation for glowing sparkling effect
        ctx.globalCompositeOperation = 'lighter';

        // Iterate backwards to safely remove dead particles
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            
            p.x += p.vx;
            p.y += p.vy;
            p.life -= p.decay;
            
            if (p.life > 0) {
                // High performance drawing: no shadowBlur
                ctx.beginPath();
                const currentSize = p.size * p.life;
                ctx.arc(p.x, p.y, currentSize, 0, PI2);
                ctx.fillStyle = `hsla(${p.color.h}, ${p.color.s}%, ${p.color.l}%, ${p.life})`;
                ctx.fill();
                
                // Draw a slightly larger, very faint outer glow using a second arc 
                // This is MUCH faster than shadowBlur
                ctx.beginPath();
                ctx.arc(p.x, p.y, currentSize * 2.5, 0, PI2);
                ctx.fillStyle = `hsla(${p.color.h}, ${p.color.s}%, ${p.color.l}%, ${p.life * 0.2})`;
                ctx.fill();
                
            } else {
                particles.splice(i, 1);
            }
        }
        
        // Reset composite operation
        ctx.globalCompositeOperation = 'source-over';

        window.requestAnimationFrame(update);
    }

    window.requestAnimationFrame(update);
})();
