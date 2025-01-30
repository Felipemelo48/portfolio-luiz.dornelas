// Função para manipular o formulário de login
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = loginForm.email.value;
            const password = loginForm.password.value;

            try {
                const response = await fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                if (response.ok) {
                    window.location.href = '/'; // Redireciona para a página principal após login bem-sucedido
                } else {
                    throw new Error('Credenciais inválidas');
                }
            } catch (error) {
                console.error('Erro durante o login:', error.message);
                alert('Erro durante o login. Verifique suas credenciais e tente novamente.');
            }
        });
    }
});

// Exemplo de interação na página principal (pode ser adaptado conforme necessário)
document.addEventListener('DOMContentLoaded', () => {
    const logoutLink = document.querySelector('header a');

    if (logoutLink) {
        logoutLink.addEventListener('click', async (e) => {
            e.preventDefault();

            try {
                const response = await fetch('/logout');

                if (response.ok) {
                    window.location.href = '/auth/login'; // Redireciona para a página de login após logout
                } else {
                    throw new Error('Erro ao encerrar sessão');
                }
            } catch (error) {
                console.error('Erro durante o logout:', error.message);
                alert('Erro durante o logout. Tente novamente mais tarde.');
            }
        });
    }
});