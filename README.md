# Testes Automatizados com GitHub Actions

Este repositório contém testes automatizados escritos em Cypress, que podem ser executados manualmente no GitHub Actions. Siga as instruções abaixo para configurar e executar os testes.

## Pré-requisitos

1. **Conta no GitHub**: Tenha uma conta no GitHub para acessar o repositório e gerenciar workflows.
2. **Acesso ao Repositório**: Certifique-se de que você tem permissão para visualizar e executar workflows no repositório.

## Estrutura do Projeto

- **Cypress**: Os testes são desenvolvidos utilizando o framework Cypress.
- **GitHub Actions**: O workflow de integração contínua (`CI`) é configurado para o nível 1 - execução manual.

## Como Executar os Testes no GitHub Actions

1. **Acesse o Repositório**:
   - Vá para a página principal do repositório no GitHub.

2. **Abra a Aba "Actions"**:
   - Clique na aba **Actions** localizada na parte superior.

3. **Selecione o Workflow Manual**:
   - Na lista de workflows à esquerda, clique em **Nível 1 - Execução manual**.

4. **Iniciar Execução Manualmente**:
   - Clique no botão **Run workflow**.
   - Selecione o branch onde deseja executar os testes (normalmente `main`).
   - Clique em **Run workflow** para iniciar a execução.

5. **Acompanhe a Execução**:
   - A execução será listada na seção de execuções. Clique nela para ver o progresso e os logs dos testes.

## Estrutura do Workflow

O workflow está configurado para:

1. Fazer o checkout do código no repositório.
2. Instalar dependências do projeto.
3. Instalar e configurar o Cypress.
4. Executar os testes E2E (end-to-end).
5. Salvar o relatório de testes como artefato no GitHub Actions.

### Exemplo de Configuração do Workflow

O arquivo do workflow (`.github/workflows/manual-test.yml`) tem a seguinte estrutura:

```yaml
name: 'Nível 1 - Execução manual'

on:
  workflow_dispatch:

jobs:
  e2e-tests:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Instalando Yarn
        run: npm install -g yarn

      - name: Instalando dependências
        run: yarn

      - name: Instalando Cypress
        run: npx cypress install

      - name: Executando testes e2e
        run: npx cypress run

      - uses: actions/upload-artifact@v4
        if: ${{ !cancelled() }}
        with:
          name: relatorio-de-testes
          path: ./cypress/reports
```

## Visualizando Relatórios de Teste

Após a execução do workflow, o relatório de teste estará disponível como um artefato:

1. No GitHub Actions, acesse a execução do workflow.
2. Na seção de artefatos, baixe o **relatorio-de-testes** para visualizar o relatório detalhado.
