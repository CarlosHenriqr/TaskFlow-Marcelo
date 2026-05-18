# Minhas tarefas

## Objetivo

Aplicativo mobile para **controle de tarefas / agenda de estudos**: o usuário autentica-se, cadastra tarefas com título, descrição, data, status e prioridade opcional, e gerencia os registros com listagem, detalhes, edição e exclusão. Os dados são persistidos no **Back4App** (Parse), vinculados ao usuário logado.

## Tecnologias utilizadas

- React Native
- Expo
- Back4App (Parse Server)
- JavaScript
- React Navigation

## Funcionalidades

- Login
- Cadastro de usuário (identificação inicial com e-mail e senha)
- Listagem das tarefas do usuário (ordenadas por data)
- Cadastro e edição de tarefas (validação de campos obrigatórios, máscara de data **dd/mm/aaaa**)
- Exclusão com confirmação antes de apagar
- Tela de detalhes de cada registro
- Mensagens de sucesso e erro (`Alert`)

## Estrutura do projeto

| Caminho | Função |
|--------|--------|
| [`App.js`](App.js) | Raiz: carrega o navegador principal |
| [`src/navigation/AppNavigator.js`](src/navigation/AppNavigator.js) | `NavigationContainer`, stacks de auth e app, contexto de sessão |
| [`src/screens/`](src/screens/) | Telas obrigatórias da avaliação |
| [`src/services/back4appConfig.js`](src/services/back4appConfig.js) | Inicialização do SDK Parse (AsyncStorage + credenciais) |
| [`src/services/registroService.js`](src/services/registroService.js) | Login, cadastro e CRUD da classe `Tarefa` |
| [`src/components/`](src/components/) | `BotaoPrincipal`, `CardRegistro` |
| [`src/utils/dateMask.js`](src/utils/dateMask.js) | Máscara e conversão de data (BR ↔ ISO) |

## Como executar

1. Clonar o repositório e entrar na pasta `meu-app`:
   ```bash
   cd meu-app
   ```
2. Instalar dependências:
   ```bash
   npm install
   ```
3. Criar o arquivo `.env` a partir de [`.env.example`](.env.example) e preencher com as chaves do Back4App.
4. Subir o projeto:
   ```bash
   npx expo start
   ```
5. Escanear o QR Code com o **Expo Go** (Android/iOS) ou usar emulador (`a` / `i` no terminal interativo do Expo).

## Configuração do Back4App

1. Crie um app em [Back4App](https://www.back4app.com/).
2. Anote **Application ID**, **JavaScript key** e a URL do servidor (geralmente `https://parseapi.back4app.com`).
3. No painel, crie a classe **`Tarefa`** com os campos abaixo (tipos sugeridos):

| Campo | Tipo | Obrigatório no app |
|-------|------|--------------------|
| `titulo` | String | Sim |
| `descricao` | String | Sim |
| `data` | String (formato `YYYY-MM-DD` salvo pelo app) | Sim |
| `status` | String | Sim |
| `prioridade` | String | Não |
| `usuario` | Pointer → `_User` | Sim (preenchido pelo app) |

4. Ajuste **Class Level Permissions** conforme a política da disciplina (para testes, muitos cursos permitem read/write autenticados na classe `Tarefa`). Em produção, restrinja com ACL ou **Pointer** + regras adequadas.

5. Copie as chaves para o `.env` (veja `.env.example`).

## Funcionalidades extras (avaliação)

- Ordenação da listagem por **data** (e desempate por `createdAt`).
- **Confirmação** antes de excluir um registro.
- **Máscara de data** no formulário (dd/mm/aaaa).

## Integrantes

- Calos
- Kauã Victor
- Pedro Gabriel
- Guilhere P
