document.getElementById('calcular').addEventListener('click', function() {
    const base = parseFloat(document.getElementById('base').value);
    const altura = parseFloat(document.getElementById('altura').value);
    const lado2 = parseFloat(document.getElementById('lado2').value);
    const lado3 = parseFloat(document.getElementById('lado3').value);
    
    if (isNaN(base) || isNaN(altura) || isNaN(lado2) || isNaN(lado3)) {
        alert('Por favor, preencha todos os campos com valores numéricos.');
        return;
    }
    
    if (base <= 0 || altura <= 0 || lado2 <= 0 || lado3 <= 0) {
        alert('Por favor, insira valores positivos maiores que zero.');
        return;
    }
    
    const area = (base * altura) / 2;
    const perimetro = base + lado2 + lado3;
    
    document.getElementById('area-result').textContent = `Área: ${area.toFixed(2)} unidades²`;
    document.getElementById('perimetro-result').textContent = `Perímetro: ${perimetro.toFixed(2)} unidades`;
    document.getElementById('resultado').style.display = 'block';
});

document.getElementById('verificar').addEventListener('click', function() {
    const ladoA = parseFloat(document.getElementById('ladoA').value);
    const ladoB = parseFloat(document.getElementById('ladoB').value);
    const ladoC = parseFloat(document.getElementById('ladoC').value);
    
    if (isNaN(ladoA) || isNaN(ladoB) || isNaN(ladoC)) {
        alert('Por favor, preencha todos os campos com valores numéricos.');
        return;
    }
    
    if (ladoA <= 0 || ladoB <= 0 || ladoC <= 0) {
        alert('Por favor, insira valores positivos maiores que zero.');
        return;
    }
    
    if (ladoA + ladoB <= ladoC || ladoA + ladoC <= ladoB || ladoB + ladoC <= ladoA) {
        document.getElementById('tipo-triangulo').textContent = 'Estes lados não formam um triângulo válido. A soma de quaisquer dois lados deve ser maior que o terceiro lado.';
        document.getElementById('tipo-triangulo').style.color = '#e94560';
        document.getElementById('tipo-result').style.display = 'block';
        return;
    }
    
    let tipoLados = '';
    let tipoAngulos = '';
    
    if (ladoA === ladoB && ladoB === ladoC) {
        tipoLados = 'Equilátero';
    } else if (ladoA === ladoB || ladoA === ladoC || ladoB === ladoC) {
        tipoLados = 'Isósceles';
    } else {
        tipoLados = 'Escaleno';
    }
    
    const lados = [ladoA, ladoB, ladoC].sort((a, b) => a - b);
    const a = lados[0];
    const b = lados[1];
    const c = lados[2];
    
    const cosC = (a*a + b*b - c*c) / (2*a*b);
    const anguloC = Math.acos(cosC) * (180 / Math.PI);
    
    if (Math.abs(anguloC - 90) < 0.1) {
        tipoAngulos = 'Retângulo';
    } else if (anguloC > 90) {
        tipoAngulos = 'Obtusângulo';
    } else {
        tipoAngulos = 'Acutângulo';
    }
    
    const resultado = `${tipoLados} e ${tipoAngulos}`;
    
    document.getElementById('tipo-triangulo').textContent = `Tipo: ${resultado}`;
    document.getElementById('tipo-triangulo').style.color = '#f1f1f1';
    document.getElementById('tipo-result').style.display = 'block';
});

document.getElementById('feedbackForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const textarea = this.querySelector('textarea');
    
    if (textarea.value.trim() === '') {
        alert('Por favor, digite seu feedback antes de enviar.');
        return;
    }
    
    alert('Obrigado pelo seu feedback! Sua opinião é muito importante para nós.');
    this.reset();
});

document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

window.addEventListener('load', function() {
    document.getElementById('base').value = '';
    document.getElementById('altura').value = '';
    document.getElementById('lado2').value = '';
    document.getElementById('lado3').value = '';
    document.getElementById('ladoA').value = '';
    document.getElementById('ladoB').value = '';
    document.getElementById('ladoC').value = '';
});