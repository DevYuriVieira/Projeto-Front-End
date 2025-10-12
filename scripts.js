document.addEventListener('DOMContentLoaded', () => {

    // --- 1. SCROLL SUAVE PARA SEÇÕES ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('nav').offsetHeight;
                window.scrollTo({
                    top: target.offsetTop - navHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 2. ANIMAÇÃO DE ENTRADA AO ROLAR ---
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });
    document.querySelectorAll('.card, section').forEach(el => observer.observe(el));

    // --- 3. NAVBAR ATIVA E PARALLAX AO ROLAR ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav ul li a');
    const parallaxImages = document.querySelectorAll('.parallax');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (scrollY >= sectionTop) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });

        parallaxImages.forEach(img => {
            const speed = 0.2;
            const offset = (scrollY - img.closest('section').offsetTop) * speed;
            img.style.transform = `translateY(${offset}px)`;
        });
    });

    // --- 4. FUNCIONALIDADE DO CARRINHO DE COMPRAS ---
    const botoesComprar = document.querySelectorAll('.card button');
    const carrinhoElement = document.getElementById('carrinho');
    const itensCarrinhoElement = document.getElementById('carrinho-itens');
    const totalCarrinhoElement = document.getElementById('carrinho-total');
    const abrirCarrinhoBtn = document.getElementById('abrir-carrinho');
    const fecharCarrinhoBtn = document.getElementById('fechar-carrinho');
    const finalizarPedidoBtn = document.getElementById('finalizar-pedido');
    let carrinho = [];

    function atualizarCarrinho() {
        if (!itensCarrinhoElement) return;
        itensCarrinhoElement.innerHTML = '';
        let total = 0;
        if (carrinho.length === 0) {
            itensCarrinhoElement.innerHTML = '<p>Seu carrinho está vazio.</p>';
        } else {
            carrinho.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('carrinho-item');
                itemDiv.innerHTML = `<span>${item.nome}</span><span>R$ ${item.preco.toFixed(2).replace('.', ',')}</span>`;
                itensCarrinhoElement.appendChild(itemDiv);
                total += item.preco;
            });
        }
        totalCarrinhoElement.innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
    }

    botoesComprar.forEach(botao => {
        botao.addEventListener('click', (e) => {
            e.target.classList.add('shine');
            setTimeout(() => e.target.classList.remove('shine'), 600);
            
            const card = botao.closest('.card');
            const nome = card.querySelector('h4').innerText;
            const precoTexto = card.querySelector('.price').innerText.replace('R$ ', '').replace(',', '.');
            const preco = parseFloat(precoTexto);
            carrinho.push({ nome, preco });
            atualizarCarrinho();
            if (carrinhoElement) carrinhoElement.classList.add('is-open');
        });
    });

    if (abrirCarrinhoBtn) abrirCarrinhoBtn.addEventListener('click', () => carrinhoElement.classList.add('is-open'));
    if (fecharCarrinhoBtn) fecharCarrinhoBtn.addEventListener('click', () => carrinhoElement.classList.remove('is-open'));
    if (finalizarPedidoBtn) {
        finalizarPedidoBtn.addEventListener('click', () => {
            if (carrinho.length === 0) {
                alert('Seu carrinho está vazio!');
                return;
            }
            const numeroTelefone = '5522999999999'; // SEU NÚMERO DE WHATSAPP AQUI
            let mensagem = 'Olá, gostaria de fazer o seguinte pedido:\n\n';
            let total = 0;
            carrinho.forEach(item => {
                mensagem += `- ${item.nome} (R$ ${item.preco.toFixed(2).replace('.', ',')})\n`;
                total += item.preco;
            });
            mensagem += `\n*Total: R$ ${total.toFixed(2).replace('.', ',')}*`;
            const linkWhatsApp = `https://wa.me/${numeroTelefone}?text=${encodeURIComponent(mensagem)}`;
            window.open(linkWhatsApp, '_blank');
        });
    }
    if(itensCarrinhoElement) atualizarCarrinho();

    // --- 5. LÓGICA DO BOTÃO VOLTAR AO TOPO ---
    const voltarAoTopoBtn = document.getElementById('voltar-ao-topo');
    if (voltarAoTopoBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                voltarAoTopoBtn.classList.add('is-visible');
            } else {
                voltarAoTopoBtn.classList.remove('is-visible');
            }
        });
        voltarAoTopoBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});



