# Formulário de Contato - Guimarães Rosa

Este é um formulário de contato responsivo e moderno para Guimarães Rosa do Estado do Sol Nascente.

## Características

### Design
- Layout responsivo que funciona em desktop, tablet e mobile
- Design limpo e profissional com gradientes modernos
- Animações suaves e micro-interações
- Cores institucionais (azul e verde)

### Funcionalidades
- **Campos obrigatórios**: Nome, Celular, Estado, Cidade, Mensagem
- **Campo opcional**: Telefone
- **Dropdown de DDD**: Todos os DDDs do Brasil organizados por região
- **Seleção Estado/Cidade**: Cidades são carregadas dinamicamente baseadas no estado selecionado
- **Captcha simples**: Operações matemáticas básicas (soma, subtração, multiplicação)
- **Validação em tempo real**: Campos são validados conforme o usuário digita
- **Formatação automática**: Telefones são formatados automaticamente
- **Integração com Make/Integromat**: Dados são enviados via webhook

### Estados e Cidades Especiais
O formulário inclui o "Estado do Sol Nascente" com as cidades mencionadas no documento:
- Nova Aurora (capital)
- Serra Verde (região serrana)
- Porto Esperança (cidade litorânea)
- Vila da Liberdade (interior)
- Santa Luzia do Vale (área rural)

## Arquivos

- `formulario.html` - Estrutura HTML do formulário
- `style.css` - Estilos CSS responsivos
- `script.js` - Funcionalidades JavaScript

## Configuração do Webhook

O formulário está configurado para enviar dados para o webhook do Make/Integromat:
```
https://hook.us2.make.com/27iee88nm2g72g7h54w6nj73e25a20sm
```

### Dados Enviados
O formulário envia os seguintes dados em formato JSON:
```json
{
  "nome": "Nome completo do usuário",
  "telefone": "Telefone (opcional)",
  "celular": "(DDD) Número do celular",
  "estado": "Sigla do estado",
  "cidade": "Nome da cidade",
  "mensagem": "Mensagem do usuário",
  "timestamp": "Data/hora do envio",
  "userAgent": "Informações do navegador"
}
```

## Como Usar

1. Abra o arquivo `formulario.html` em um navegador
2. Preencha os campos obrigatórios
3. Resolva o captcha matemático
4. Clique em "Enviar Mensagem"

## Recursos de Acessibilidade

- Navegação por teclado
- Indicadores de foco visíveis
- Labels associados aos campos
- Mensagens de erro claras
- Suporte a leitores de tela
- Respeita preferências de movimento reduzido

## Compatibilidade

- Navegadores modernos (Chrome, Firefox, Safari, Edge)
- Dispositivos móveis (iOS, Android)
- Tablets e desktops
- Funciona offline (exceto envio de dados)

## Personalização

Para personalizar o formulário:

1. **Cores**: Edite as variáveis CSS em `:root` no arquivo `style.css`
2. **Cidades**: Modifique o objeto `cidadesPorEstado` no arquivo `script.js`
3. **Webhook**: Altere a variável `webhookUrl` no arquivo `script.js`
4. **Captcha**: Ajuste a função `initializeCaptcha()` para diferentes operações

## Segurança

- Validação client-side e server-side recomendada
- Captcha simples para prevenir spam básico
- Dados enviados via HTTPS
- Não armazena informações localmente

## Suporte

Para dúvidas ou problemas, consulte:
- Documentação do Make/Integromat
- Console do navegador para debugging
- Logs do webhook no Make/Integromat

