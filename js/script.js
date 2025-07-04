// Dados das cidades por estado
const cidadesPorEstado = {
    'PE': ['Recife', 'Jaboatão dos Guararapes', 'Olinda', 'Caruaru', 'Petrolina', 'Paulista', 'Cabo de Santo Agostinho', 'Camaragibe', 'Garanhuns', 'Vitória de Santo Antão', 'Igarassu', 'São Lourenço da Mata', 'Ipojuca', 'Santa Cruz do Capibaribe', 'Abreu e Lima', 'Serra Talhada', 'Gravatá', 'Araripina', 'Goiana', 'Belo Jardim', 'Carpina', 'Arcoverde', 'Ouricuri', 'Surubim', 'Salgueiro', 'Pesqueira', 'Bezerros', 'Escada', 'Paudalho', 'Limoeiro', 'Moreno', 'Palmares', 'Buíque', 'São Bento do Una', 'Brejo da Madre de Deus', 'Timbaúba', 'Bom Conselho', 'Aguas Belas', 'Toritama', 'Santa Maria da Boa Vista', 'Afogados da Ingazeira', 'Barreiros', 'Lajedo', 'Custódia', 'Bom Jardim', 'Sirinhaém', 'Bonito', 'São Caitano', 'Aliança', 'São José do Belmonte', 'Itambé', 'Bodocó', 'Petrolândia', 'Sertânia', 'Ribeirão', 'Itaíba', 'Exu', 'Catende', 'São José do Egito', 'Nazaré da Mata', 'Trindade', 'Cabrobó', 'Floresta', 'Ipubi', 'Caetés', 'Glória do Goitá', 'Passira', 'Itapissuma', 'Tabira', 'João Alfredo', 'Ibimirim', 'Inajá', 'Vicência', 'Agua Preta', 'Tupanatinga', 'Pombos', 'Manari', 'Ilha de Itamaracá', 'Taquaritinga do Norte', 'Condado', 'Canhotinho', 'Lagoa Grande', 'Tacaratu', 'São João', 'Macaparana', 'Agrestina', 'Tamandaré', 'Cupira', 'Pedra', 'Panelas', 'Vertentes', 'Orobó', 'Feira Nova', 'Riacho das Almas', 'Chã Grande', 'Altinho', 'Flores', 'Cachoeirinha', 'Rio Formoso', 'São Joaquim do Monte', 'Araçoiaba', 'Lagoa de Itaenga', 'Carnaíba', 'São José da Coroa Grande', 'Afrânio', 'Parnamirim', 'Sanharó', 'Capoeiras', 'Serrita', 'Belém do São Francisco', 'Lagoa do Carro', 'Amaraji', 'Camocim de São Félix', 'Quipapá', 'Gameleira', 'Dormentes', 'Correntes', 'Venturosa', 'Iati', 'São Vicente Ferrer', 'Itaquitinga', 'Jataúba', 'Cumaru', 'Jupi', 'Ferreiros', 'Triunfo', 'Mirandiba', 'Santa Maria do Cambucá', 'Jatobá', 'Tracunhaém', 'Lagoa dos Gatos', 'Alagoinha', 'Primavera', 'Santa Cruz', 'Tacaimbó', 'Itapetim', 'Saloá', 'Orocó', 'Frei Miguelinho', 'Jurema', 'Joaquim Nabuco', 'Casinhas', 'São Benedito do Sul', 'Chã de Alegria', 'Buenos Aires', 'Paranatama', 'Carnaubeira da Penha', 'Barra de Guabiraba', 'Santa Filomena', 'Lagoa do Ouro', 'Betânia', 'Jucati', 'Santa Cruz da Baixa Verde', 'Xexéu', 'Machados', 'Calçado', 'Iguaracy', 'Sairé', 'Moreilândia', 'Cedro', 'Belém de Maria', 'Poção', 'Angelim', 'Santa Terezinha', 'Cortês', 'Jaqueira', 'Verdejante', 'Maraial', 'Brejão', 'Terra Nova', 'Tuparetama', 'Brejinho', 'Camutanga', 'Vertente do Lério', 'Ibirajuba', 'Granito', 'Palmeirina', 'Terezinha', 'Quixaba', 'Salgadinho', 'Solidão', 'Calumbi', 'Ingazeira', 'Itacuruba', 'Fernando de Noronha']
};

// Variáveis globais para o captcha
let captchaAnswer = 0;

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    initializeCaptcha();
    setupEventListeners();
    setupFormValidation();
    fetchUserIP(); // Nova função para obter e exibir o IP
});

// Variável global para armazenar o IP do usuário
let userIP = "";

// Função para obter o IP do usuário
async function fetchUserIP() {
    try {
        const response = await fetch("https://api.ipify.org?format=json" );
        const data = await response.json();
        userIP = data.ip;
        document.getElementById("user-ip").textContent = userIP;
    } catch (error) {
        console.error("Erro ao obter o IP do usuário:", error);
        document.getElementById("user-ip").textContent = "Não foi possível obter";
    }
}

// Configurar captcha simples
function initializeCaptcha() {
    const words = ["rosa", "azul", "verde", "sol", "lua"];
    const selectedWord = words[Math.floor(Math.random() * words.length)];
    document.getElementById("captcha-question").textContent = `Digite a palavra '${selectedWord}'`;
    captchaAnswer = selectedWord;
}

// Configurar event listeners
function setupEventListeners() {
    const cidadeSelect = document.getElementById("cidade");
    const form = document.getElementById("contactForm");
    
    // Submissão do formulário
    form.addEventListener("submit", handleFormSubmit);
    
    // Reset do formulário
    form.addEventListener("reset", function() {
        setTimeout(() => {
            initializeCaptcha();
            updateCidades("PE"); // Chamar com PE para carregar cidades de Pernambuco
        }, 100);
    });
    
    // Formatação automática dos campos de telefone
    setupPhoneFormatting();
    updateCidades("PE"); // Carregar cidades de Pernambuco na inicialização
}

// Atualizar lista de cidades baseado no estado selecionado
function updateCidades(estado) {
    const cidadeSelect = document.getElementById('cidade');
    
    // Limpar opções existentes
    cidadeSelect.innerHTML = '<option value="">Selecione a Cidade</option>';
    
    if (estado && cidadesPorEstado[estado]) {
        const sortedCidades = cidadesPorEstado[estado].sort();
        sortedCidades.forEach(cidade => {
            const option = document.createElement('option');
            option.value = cidade;
            option.textContent = cidade;
            cidadeSelect.appendChild(option);
        });
        cidadeSelect.disabled = false;
    } else {
        cidadeSelect.disabled = true;
    }
}

// Configurar formatação automática dos telefones
function setupPhoneFormatting() {
    const telefoneInput = document.getElementById('telefone');
    const celularInput = document.getElementById('celular');
    
    telefoneInput.addEventListener('input', function(e) {
        formatPhone(e.target, false);
    });
    
    celularInput.addEventListener('input', function(e) {
        formatPhone(e.target, true);
    });
}

// Formatar telefone automaticamente
function formatPhone(input, isCelular) {
    let value = input.value.replace(/\D/g, '');
    
    if (isCelular) {
        // Formato: 9 1234-5678
        if (value.length <= 5) {
            value = value.replace(/(\d{1})(\d{0,4})/, '$1 $2');
        } else {
            value = value.replace(/(\d{1})(\d{4})(\d{0,4})/, '$1 $2-$3');
        }
    } else {
        // Formato: 1234-5678
        if (value.length <= 4) {
            value = value;
        } else {
            value = value.replace(/(\d{4})(\d{0,4})/, '$1-$2');
        }
    }
    
    input.value = value;
}

// Configurar validação do formulário
function setupFormValidation() {
    const inputs = document.querySelectorAll('input[required], select[required], textarea[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
}

// Validar campo individual
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Remover classes de erro anteriores
    field.classList.remove('error');
    removeErrorMessage(field);
    
    // Validação básica de campo obrigatório
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'Este campo é obrigatório';
    }
    
    // Validações específicas
    switch(field.type) {
        case 'email':
            if (value && !isValidEmail(value)) {
                isValid = false;
                errorMessage = 'Digite um email válido';
            }
            break;
        case 'tel':
            if (field.id === 'celular' && value && !isValidCelular(value)) {
                isValid = false;
                errorMessage = 'Digite um celular válido (ex: 9 1234-5678)';
            }
            break;
        case 'text':
            if (field.id === 'captcha' && value.toLowerCase() !== captchaAnswer.toLowerCase()) {
                isValid = false;
                errorMessage = 'Palavra incorreta';
            }
            break;
    }
    
    if (!isValid) {
        field.classList.add('error');
        showErrorMessage(field, errorMessage);
    }
    
    return isValid;
}

// Validar email
function isValidEmail(email) {
    const emailRegex = /^[\S+@\S+\.\S+]$/;
    return emailRegex.test(email);
}

// Validar celular
function isValidCelular(celular) {
    const celularRegex = /^9\s\d{4}-\d{4}$/;
    return celularRegex.test(celular);
}

// Mostrar mensagem de erro
function showErrorMessage(field, message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.color = 'var(--error)';
    errorElement.style.fontSize = '0.875rem';
    errorElement.style.marginTop = '4px';
    
    field.parentNode.appendChild(errorElement);
}

// Remover mensagem de erro
function removeErrorMessage(field) {
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

// Manipular submissão do formulário
async function handleFormSubmit(e) {
    e.preventDefault();
    
    // Validar todos os campos
    const form = e.target;
    const formData = new FormData(form);
    let isFormValid = true;
    
    // Validar campos obrigatórios
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isFormValid = false;
        }
    });
    
    // Validar captcha
    const captchaInput = document.getElementById("captcha");
    if (captchaInput.value.toLowerCase() !== captchaAnswer.toLowerCase()) {
        isFormValid = false;
        captchaInput.classList.add("error");
        showErrorMessage(captchaInput, "Palavra incorreta");
    }
    
    if (!isFormValid) {
        showMessage('Corrija os erros no formulário antes de enviar', 'error');
        return;
    }
    
      // Preparar dados para envio
    const data = {
        nome: formData.get("nome"),
        telefone: formData.get("telefone"),
        celular: `(${formData.get("ddd")}) ${formData.get("celular")}`,
        estado: "Pernambuco", // Estado fixo
        cidade: formData.get("cidade"),
        mensagem: formData.get("mensagem"),
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        userIP: userIP // <--- AQUI! O IP é adicionado aos dados
    };
    
    // Mostrar loading
    showLoading(true);
    
    try {
        // URL do webhook do Make/Integromat
        const webhookUrl = 'https://hook.us2.make.com/27iee88nm2g72g7h54w6nj73e25a20sm';
        
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data )
        });
        
        if (response.ok) {
            showMessage('Mensagem enviada com sucesso!', 'success');
            form.reset();
            initializeCaptcha();
            updateCidades('PE'); // Chamar com PE para carregar cidades de Pernambuco
        } else {
            throw new Error('Erro na resposta do servidor');
        }
        
    } catch (error) {
        console.error('Erro ao enviar formulário:', error);
        showMessage('Erro ao enviar mensagem. Tente novamente.', 'error');
    } finally {
        showLoading(false);
    }
}

// Mostrar/ocultar loading
function showLoading(show) {
    const loading = document.getElementById('loading');
    const form = document.getElementById('contactForm');
    
    if (show) {
        loading.classList.remove('hidden');
        form.style.display = 'none';
    } else {
        loading.classList.add('hidden');
        form.style.display = 'block';
    }
}

// Mostrar mensagem de sucesso/erro
function showMessage(message, type) {
    // Ocultar todas as mensagens
    document.getElementById('success').classList.add('hidden');
    document.getElementById('error').classList.add('hidden');
    
    // Mostrar mensagem apropriada
    const messageElement = document.getElementById(type);
    if (messageElement) {
        const messageText = messageElement.querySelector('p');
        if (messageText) {
            messageText.textContent = message;
        }
        messageElement.classList.remove('hidden');
        
        // Scroll para a mensagem
        messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Auto-ocultar após 5 segundos
        setTimeout(() => {
            messageElement.classList.add('hidden');
        }, 5000);
    }
}

// Adicionar estilos para campos com erro
const style = document.createElement('style');
style.textContent = `
    .error {
        border-color: var(--error) !important;
        box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1) !important;
    }
    
    .field-error {
        animation: shake 0.5s ease-in-out;
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);

    // Função para demonstração (remover em produção)
function demonstrateWebhook() {
    console.log("Para usar este formulário em produção:");
    console.log("1. Crie um cenário no Make/Integromat");
    console.log("2. Configure um webhook como trigger");
    console.log("3. Substitua a URL do webhook na linha 234 do script.js");
    console.log("4. Configure as ações desejadas (email, planilha, etc.)");
}

// Fim do script
