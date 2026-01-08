# Guia de Contribuição - GovChain

Obrigado pelo interesse em contribuir para o **GovChain**. Este documento define os padrões de desenvolvimento para garantir a estabilidade e segurança da plataforma.

## 🤝 Fluxo de Trabalho (Git Flow)

1. **Branches**:
   - `main`: Código de produção (estável).
   - `develop`: Ambiente de staging (testes).
   - `feature/nome-da-feature`: Para novas funcionalidades.
   - `fix/nome-do-bug`: Para correções de erros.

2. **Commits**:
   Utilizamos o padrão **Conventional Commits**:
   - `feat: adiciona upload de atas`
   - `fix: corrige erro de validação no login`
   - `docs: atualiza diagrama de arquitetura`
   - `style: formatação de código (sem alterações de lógica)`
   - `refactor: melhoria de código existente`

## 🛡️ Padrões de Código

### TypeScript
- **Tipagem Estrita**: Evite o uso de `any`. Defina interfaces para todas as props e dados.
- **Clean Code**: Funções devem ter responsabilidade única e nomes descritivos.

### Componentes (React/Next.js)
- Use **Server Components** por padrão. Adicione `"use client"` apenas quando necessário (interatividade/hooks).
- Utilize os componentes base do `shadcn/ui` em `/components/ui`.

### Segurança
- **NUNCA** commite chaves privadas, tokens ou segredos.
- Utilize variáveis de ambiente (`process.env.NEXT_PUBLIC_...`) para configurações.

## 🧪 Testes

Antes de submeter um Pull Request:
1. Verifique se o projeto compila sem erros: `npm run build`
2. Garanta que não há warnings críticos no console.
3. Teste a funcionalidade em navegadores diferentes (Chrome/Safari).

## 📝 Relatando Bugs

Ao abrir uma Issue, inclua:
- Passos para reproduzir o erro.
- Comportamento esperado vs. comportamento real.
- Screenshots ou logs do erro.

---
**Equipe de Desenvolvimento GovChain**
