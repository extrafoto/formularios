// Dados das cidades por estado
const cidadesPorEstado = {
    'AC': ['Rio Branco', 'Cruzeiro do Sul', 'Sena Madureira', 'Tarauacá', 'Feijó'],
    'AL': ['Maceió', 'Arapiraca', 'Palmeira dos Índios', 'Rio Largo', 'Penedo'],
    'AP': ['Macapá', 'Santana', 'Laranjal do Jari', 'Oiapoque', 'Mazagão'],
    'AM': ['Manaus', 'Parintins', 'Itacoatiara', 'Manacapuru', 'Coari'],
    'BA': ['Salvador', 'Feira de Santana', 'Vitória da Conquista', 'Camaçari', 'Juazeiro', 'Ilhéus', 'Barreiras'],
    'CE': ['Fortaleza', 'Caucaia', 'Juazeiro do Norte', 'Maracanaú', 'Sobral'],
    'DF': ['Brasília', 'Gama', 'Taguatinga', 'Ceilândia', 'Sobradinho'],
    'ES': ['Vitória', 'Vila Velha', 'Serra', 'Cariacica', 'Cachoeiro de Itapemirim'],
    'GO': ['Goiânia', 'Aparecida de Goiânia', 'Anápolis', 'Rio Verde', 'Luziânia'],
    'MA': ['São Luís', 'Imperatriz', 'São José de Ribamar', 'Timon', 'Caxias'],
    'MT': ['Cuiabá', 'Várzea Grande', 'Rondonópolis', 'Sinop', 'Tangará da Serra'],
    'MS': ['Campo Grande', 'Dourados', 'Três Lagoas', 'Corumbá', 'Ponta Porã'],
    'MG': ['Belo Horizonte', 'Uberlândia', 'Contagem', 'Juiz de Fora', 'Betim', 'Montes Claros', 'Ribeirão das Neves'],
    'PA': ['Belém', 'Ananindeua', 'Santarém', 'Marabá', 'Parauapebas'],
    'PB': ['João Pessoa', 'Campina Grande', 'Santa Rita', 'Patos', 'Bayeux'],
    'PR': ['Curitiba', 'Londrina', 'Maringá', 'Ponta Grossa', 'Cascavel', 'São José dos Pinhais', 'Foz do Iguaçu'],
    'PE': ['Recife', 'Jaboatão dos Guararapes', 'Olinda', 'Caruaru', 'Petrolina'],
    'PI': ['Teresina', 'Parnaíba', 'Picos', 'Piripiri', 'Floriano'],
    'RJ': ['Rio de Janeiro', 'São Gonçalo', 'Duque de Caxias', 'Nova Iguaçu', 'Niterói', 'Campos dos Goytacazes', 'Belford Roxo'],
    'RN': ['Natal', 'Mossoró', 'Parnamirim', 'São Gonçalo do Amarante', 'Macaíba'],
    'RS': ['Porto Alegre', 'Caxias do Sul', 'Pelotas', 'Canoas', 'Santa Maria'],
    'RO': ['Porto Velho', 'Ji-Paraná', 'Ariquemes', 'Vilhena', 'Cacoal'],
    'RR': ['Boa Vista', 'Rorainópolis', 'Caracaraí', 'Alto Alegre', 'Mucajaí'],
    'SC': ['Florianópolis', 'Joinville', 'Blumenau', 'São José', 'Criciúma', 'Chapecó'],
    'SP': ['São Paulo', 'Guarulhos', 'Campinas', 'São Bernardo do Campo', 'Santo André', 'Osasco', 'Ribeirão Preto'],
    'SE': ['Aracaju', 'Nossa Senhora do Socorro', 'Lagarto', 'Itabaiana', 'Estância'],
    'TO': ['Palmas', 'Araguaína', 'Gurupi', 'Porto Nacional', 'Paraíso do Tocantins'],
    'SOL': ['Nova Aurora', 'Serra Verde', 'Porto Esperança', 'Vila da Liberdade', 'Santa Luzia do Vale']
};

// Variáveis globais para o captcha
let captchaAnswer = 0;

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    initializeCaptcha();
    setupEventListeners();
    setupFormValidation();
});

// Configurar captcha simples
function initializeCaptcha() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operations = ['+', '-', '×'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    let question, answer;
    
    switch(operation) {
        case '+':
            question = `${num1} + ${num2}`;
            answer = num1 + num2;
            break;
        case '-':
            // Garantir que o resultado seja positivo
            const maior = Math.max(num1, num2);
            const menor = Math.min(num1, num2);
            question = `${maior} - ${menor}`;
            answer = maior - menor;
            break;
        case '×':
            const smallNum1 = Math.floor(Math.random() * 5) + 1;
            const smallNum2 = Math.floor(Math.random() * 5) + 1;
            question = `${smallNum1} × ${smallNum2}`;
            answer = smallNum1 * smallNum2;
            break;
    }
    
    document.getElementById('captcha-question').textContent = question;
    captchaAnswer = answer;
}

// Configurar event listeners
function setupEventListeners() {
    const estadoSelect = document.getElementById('estado');
    const cidadeSelect = document.getElementById('cidade');
    const form = document.getElementById('contactForm');
    
    // Atualizar cidades quando estado mudar
    estadoSelect.addEventListener('change', function() {
        updateCidades(this.value);
    });
    
    // Submissão do formulário
    form.addEventListener('submit', handleFormSubmit);
    
    // Reset do formulário
    form.addEventListener('reset', function() {
        setTimeout(() => {
            initializeCaptcha();
            updateCidades('');
        }, 100);
    });
    
    // Formatação automática dos campos de telefone
    setupPhoneFormatting();
}

// Atualizar lista de cidades baseado no estado selecionado
function updateCidades(estado) {
    const cidadeSelect = document.getElementById('cidade');
    
    // Limpar opções existentes
    cidadeSelect.innerHTML = '<option value="">Selecione a Cidade</option>';
    
    if (estado && cidadesPorEstado[estado]) {
        cidadesPorEstado[estado].forEach(cidade => {
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
        case 'number':
            if (field.id === 'captcha' && value && parseInt(value) !== captchaAnswer) {
                isValid = false;
                errorMessage = 'Resposta incorreta';
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
    const captchaInput = document.getElementById('captcha');
    if (parseInt(captchaInput.value) !== captchaAnswer) {
        isFormValid = false;
        captchaInput.classList.add('error');
        showErrorMessage(captchaInput, 'Resposta do captcha incorreta');
    }
    
    if (!isFormValid) {
        showMessage('Corrija os erros no formulário antes de enviar', 'error');
        return;
    }
    
    // Preparar dados para envio
    const data = {
        nome: formData.get('nome'),
        telefone: formData.get('telefone'),
        celular: `(${formData.get('ddd')}) ${formData.get('celular')}`,
        estado: formData.get('estado'),
        cidade: formData.get('cidade'),
        mensagem: formData.get('mensagem'),
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
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
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            showMessage('Mensagem enviada com sucesso!', 'success');
            form.reset();
            initializeCaptcha();
            updateCidades('');
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
    console.log('Para usar este formulário em produção:');
    console.log('1. Crie um cenário no Make/Integromat');
    console.log('2. Configure um webhook como trigger');
    console.log('3. Substitua a URL do webhook na linha 234 do script.js');
    console.log('4. Configure as ações desejadas (email, planilha, etc.)');
}

