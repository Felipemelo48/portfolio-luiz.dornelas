// ============================================
// CONFIGURAÇÕES INICIAIS E ELEMENTOS DO DOM
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Portfólio de Luiz Felipe carregado!');

    // --- Elementos Principais ---
    const body = document.body;
    const botaoMenuMobile = document.querySelector('.cabecalho__botao-menu');
    const menuNavegacao = document.querySelector('.cabecalho__menu');
    const botaoTema = document.querySelector('.botao-tema');
    const botaoTopo = document.querySelector('.botao-topo');
    const formularioContato = document.getElementById('formContato');
    const filtrosProjetos = document.querySelectorAll('.filtro');
    const cardsProjeto = document.querySelectorAll('.projeto-card');
    const spanAnoAtual = document.getElementById('ano-atual');
    const elementosDigitar = document.querySelectorAll('.digitar');

    // ============================================
    // 1. MENU MOBILE (Hambúrguer)
    // ============================================
    if (botaoMenuMobile && menuNavegacao) {
        botaoMenuMobile.addEventListener('click', function() {
            const estaAberto = menuNavegacao.classList.toggle('ativo');
            botaoMenuMobile.classList.toggle('ativo');
            botaoMenuMobile.setAttribute('aria-expanded', estaAberto);
            
            // Fecha menu ao clicar em um link
            const linksMenu = menuNavegacao.querySelectorAll('a');
            linksMenu.forEach(link => {
                link.addEventListener('click', () => {
                    menuNavegacao.classList.remove('ativo');
                    botaoMenuMobile.classList.remove('ativo');
                    botaoMenuMobile.setAttribute('aria-expanded', 'false');
                });
            });
        });
    }

    // ============================================
    // 2. CONTROLE DE TEMA (Claro/Escuro)
    // ============================================
    if (botaoTema) {
        // Verifica preferência salva ou do sistema
        const temaSalvo = localStorage.getItem('temaPortfolio');
        const prefereEscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // Aplica tema inicial
        if (temaSalvo === 'escuro' || (!temaSalvo && prefereEscuro)) {
            body.classList.add('modo-escuro');
        }

        // Evento de clique para alternar
        botaoTema.addEventListener('click', function() {
            const estaEscuro = body.classList.toggle('modo-escuro');
            localStorage.setItem('temaPortfolio', estaEscuro ? 'escuro' : 'claro');
            console.log(`🌓 Tema alterado para: ${estaEscuro ? 'Escuro' : 'Claro'}`);
        });
    }

    // ============================================
    // 3. FILTRO DE PROJETOS
    // ============================================
    if (filtrosProjetos.length > 0 && cardsProjeto.length > 0) {
        filtrosProjetos.forEach(filtro => {
            filtro.addEventListener('click', function() {
                // Atualiza filtro ativo
                filtrosProjetos.forEach(f => f.classList.remove('filtro--ativo'));
                this.classList.add('filtro--ativo');
                
                const categoriaSelecionada = this.getAttribute('data-filtro');
                console.log(`🔍 Filtrando projetos por: ${categoriaSelecionada}`);
                
                // Filtra os projetos
                cardsProjeto.forEach(card => {
                    const categoriasCard = card.getAttribute('data-categorias').split(' ');
                    
                    if (categoriaSelecionada === 'todos' || categoriasCard.includes(categoriaSelecionada)) {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // ============================================
    // 4. FORMULÁRIO DE CONTATO
    // ============================================
    if (formularioContato) {
        formularioContato.addEventListener('submit', function(evento) {
            evento.preventDefault();
            
            const dadosFormulario = new FormData(formularioContato);
            const nome = dadosFormulario.get('nome');
            const email = dadosFormulario.get('email');
            const mensagem = dadosFormulario.get('mensagem');
            
            // Validação básica
            if (!nome || !email || !mensagem) {
                alert('⚠️ Por favor, preencha todos os campos.');
                return;
            }
            
            // Feedback visual
            const botaoEnviar = formularioContato.querySelector('button[type="submit"]');
            const textoOriginal = botaoEnviar.textContent;
            
            botaoEnviar.textContent = 'Enviando...';
            botaoEnviar.disabled = true;
            
            // Simula envio (substitua por API real)
            setTimeout(() => {
                console.log('📨 Mensagem enviada:', { nome, email, mensagem });
                alert(`✅ Obrigado, ${nome}! Sua mensagem foi enviada.\nResponderei em breve para: ${email}`);
                formularioContato.reset();
                botaoEnviar.textContent = textoOriginal;
                botaoEnviar.disabled = false;
            }, 1500);
        });
    }

    // ============================================
    // 5. BOTÃO "VOLTAR AO TOPO"
    // ============================================
    if (botaoTopo) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                botaoTopo.classList.add('visivel');
            } else {
                botaoTopo.classList.remove('visivel');
            }
        });
        
        botaoTopo.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ============================================
    // 6. ATUALIZAÇÃO DO ANO NO RODAPÉ
    // ============================================
    if (spanAnoAtual) {
        spanAnoAtual.textContent = new Date().getFullYear();
    }

    // ============================================
    // 7. ANIMAÇÃO DE DIGITAÇÃO (TEXTO DINÂMICO)
    // ============================================
    if (elementosDigitar.length > 0) {
        elementosDigitar.forEach(elemento => {
            const textos = elemento.getAttribute('data-textos') 
                ? JSON.parse(elemento.getAttribute('data-textos'))
                : ['soluções digitais', 'experiências web', 'sistemas integrados', 'produtos escaláveis'];
            
            let indiceTexto = 0;
            let indiceCaractere = 0;
            let estaApagando = false;
            let velocidade = 100;
            
            function digitar() {
                const textoAtual = textos[indiceTexto];
                
                if (!estaApagando) {
                    elemento.textContent = textoAtual.substring(0, indiceCaractere + 1);
                    indiceCaractere++;
                    
                    if (indiceCaractere === textoAtual.length) {
                        estaApagando = true;
                        velocidade = 1000;
                    }
                } else {
                    elemento.textContent = textoAtual.substring(0, indiceCaractere - 1);
                    indiceCaractere--;
                    
                    if (indiceCaractere === 0) {
                        estaApagando = false;
                        indiceTexto = (indiceTexto + 1) % textos.length;
                        velocidade = 100;
                    }
                }
                
                setTimeout(digitar, velocidade);
            }
            
            // Inicia após 1 segundo
            setTimeout(digitar, 1000);
        });
    }

    // ============================================
    // 8. ANIMAÇÃO DE APARECIMENTO SUAVE (Scroll)
    // ============================================
    const observerOpcoes = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entradas) {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('visivel');
            }
        });
    }, observerOpcoes);
    
    // Observa seções principais
    document.querySelectorAll('section').forEach(secao => {
        secao.classList.add('oculto-transicao');
        observer.observe(secao);
    });

    // ============================================
    // 9. VALIDAÇÃO DE FORMULÁRIO EM TEMPO REAL
    // ============================================
    const inputsForm = formularioContato ? formularioContato.querySelectorAll('input, textarea') : [];
    inputsForm.forEach(input => {
        input.addEventListener('blur', function() {
            if (!this.value.trim()) {
                this.style.borderColor = 'var(--cor-erro)';
            } else {
                this.style.borderColor = 'var(--cor-sucesso)';
            }
        });
        
        input.addEventListener('input', function() {
            this.style.borderColor = 'var(--cor-borda)';
        });
    });

    // ============================================
    // 10. CLIQUE EM CARDS DE PROJETO (Simulação)
    // ============================================
    cardsProjeto.forEach(card => {
        card.addEventListener('click', function(e) {
            // Não ativa se clicar em links dentro do card
            if (!e.target.closest('a')) {
                const titulo = this.querySelector('.projeto-card__titulo').textContent;
                console.log(`🖱️ Card clicado: ${titulo}`);
                // Aqui você pode abrir um modal ou redirecionar
                // alert(`Detalhes do projeto: ${titulo}`);
            }
        });
    });

    // Adiciona classe inicial para animações
    body.classList.add('carregado');
    console.log('✅ Todas as funcionalidades foram inicializadas!');
});

// ============================================
// ESTILOS DINÂMICOS PARA ANIMAÇÕES
// ============================================
const estiloDinamico = document.createElement('style');
estiloDinamico.textContent = `
    .oculto-transicao {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .visivel {
        opacity: 1;
        transform: translateY(0);
    }
    
    .carregado * {
        transition: background-color 0.5s ease, 
                    border-color 0.5s ease, 
                    color 0.5s ease,
                    transform 0.3s ease;
    }
    
    .projeto-card {
        transition: opacity 0.3s ease, transform 0.3s ease, display 0.3s ease;
    }
`;
document.head.appendChild(estiloDinamico);

// ============================================
// DETECÇÃO DE REDIMENSIONAMENTO (Opcional)
// ============================================
let timeoutResize;
window.addEventListener('resize', function() {
    clearTimeout(timeoutResize);
    timeoutResize = setTimeout(function() {
        console.log(`📱 Janela redimensionada: ${window.innerWidth} x ${window.innerHeight}`);
    }, 250);
});
