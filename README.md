# Gerador de Currículo Interativo

Um aplicativo web intuitivo para criar e exportar currículos de forma fácil e profissional.

## 🎯 Características

- ✅ Interface intuitiva e responsiva
- ✅ Pré-visualização em tempo real
- ✅ Múltiplas seções de currículo
- ✅ Exportação para PDF
- ✅ Persistência de dados (localStorage)
- ✅ Design moderno com paleta de cores profissional
- ✅ Suporte para variáveis experiências profissionais
- ✅ Suporte para múltiplas formações acadêmicas
- ✅ Habilidades e idiomas customizáveis

## 📋 Seções do Currículo

1. **Dados Pessoais**
   - Nome completo
   - Email
   - Telefone
   - Localização
   - LinkedIn
   - Resumo profissional

2. **Experiência Profissional**
   - Cargo
   - Empresa
   - Período (Data início/fim)
   - Localização
   - Descrição das atividades

3. **Formação Acadêmica**
   - Curso
   - Instituição
   - Ano de conclusão
   - Status (Concluído/Em Andamento/Trancado)

4. **Habilidades**
   - Adicione múltiplas habilidades

5. **Idiomas**
   - Idioma
   - Nível (Básico/Intermediário/Avançado/Fluente)

   ### Históricos

6. Preencha um currículo
7. Clique em "📋 Históricos"
8. Verá os últimos 3 currículos salvos
9. Clique em qualquer um para carregar

## 🚀 Como Usar

1. Abra o arquivo `index.html` em seu navegador
2. Preencha o formulário com suas informações
3. Veja a pré-visualização do currículo em tempo real
4. Adicione múltiplas experiências, formações, habilidades e idiomas clicando nos botões "Adicionar"
5. Clique em "Gerar PDF" para exportar seu currículo

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Design responsivo com variáveis CSS
- **JavaScript**: Lógica da aplicação
- **HTML2PDF.js**: Exportação para PDF

## 📁 Estrutura de Pastas

```
criador_curriculo/
├── index.html
├── README.md
└── assets/
    ├── css/
    │   └── styles.css
    └── js/
        └── app.js
```

## 💾 Persistência de Dados

Os dados preenchidos são automaticamente salvos no `localStorage` do navegador, permitindo que você feche e reabra a página sem perder suas informações.

## 🎨 Personalização

O projeto utiliza variáveis CSS que podem ser facilmente customizadas em `assets/css/styles.css`:

```css
:root {
  --primary-color: #2563eb;
  --secondary-color: #64748b;
  --success-color: #10b981;
  --danger-color: #ef4444;
  /* ... outras cores ... */
}
```

## 📱 Responsividade

O aplicativo é totalmente responsivo e funciona em:

- Desktop
- Tablets
- Smartphones

## 🔧 Requisitos

Nenhum! O aplicativo é totalmente client-side, você só precisa de um navegador moderno.

## 📝 Notas

- Campos marcados com `*` são obrigatórios
- A pré-visualização é atualizada em tempo real enquanto você digita
- Os dados são salvos automaticamente
- O PDF é gerado com formatação profissional

## 🎯 Possíveis Melhorias Futuras

- [ ] Múltiplos temas de currículo
- [ ] Sincronização em nuvem
- [ ] Validação de email em tempo real
- [ ] Suporte a mais idiomas na interface
- [ ] Compartilhamento de currículo via link
