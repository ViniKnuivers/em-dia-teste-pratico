# Tarefas do teste prático

Siga as tarefas **na ordem**. Cada funcionalidade tem uma tarefa de backend (BE) e, em seguida, uma de frontend (FE). Termine uma tarefa por completo antes de começar a próxima: ao final de cada uma, algo novo deve estar funcionando.

Em caso de dúvida sobre o visual, consulte o [Figma](https://www.figma.com/design/50gzDTlyEIYKHKDEysbn7Y/Untitled?node-id=2-104&t=MTjROjmWvCHMzPFT-1) e a [referência da tela](referencia-ui.png).

---

## Tarefa 1 — Listagem (BE)

- Fazer o `TaskService` receber a `TaskModel` (veja como as dependências são montadas em `backend/src/app.ts`).
- Implementar `findAll()` na `TaskModel`: buscar as tarefas no banco, das mais antigas para as mais recentes.
- Fazer o `listTasks()` do service usar a model em vez da lista mockada.
- Ajustar o teste de `GET /tasks` em `backend/test/task.routes.test.ts`: hoje ele espera exatamente 5 tarefas mockadas.

**Pronto quando:** `GET http://localhost:3333/tasks` retorna as tarefas que estão no banco (cadastre algumas pelo `npm run prisma:studio` para testar) e o teste passa.

## Tarefa 2 — Listagem (FE)

- Montar a estrutura da tela seguindo o Figma: título "Uma tarefa de cada vez.", subtítulo, data de hoje em português no canto direito, card "Nova tarefa" (por enquanto só o visual) e card "Suas tarefas".
- Buscar as tarefas ao abrir a tela com o helper `request()` de `frontend/src/api/client.ts` (`GET /tasks`) e guardar a lista em um estado do React.
- Renderizar cada tarefa como uma linha: caixa de seleção, título, botão de editar (lápis) e botão de excluir (lixeira). Os botões ainda não fazem nada.
- Tarefas concluídas aparecem com a caixa marcada e o título riscado.

**Pronto quando:** a tela abre igual ao Figma, mostrando as tarefas reais do banco.

---

## Tarefa 3 — Cadastro (BE)

- Implementar `create(input)` na `TaskModel`. A tarefa nasce pendente (`completed: false`).
- Fazer o `createTask()` do service receber o título e usar a model.
- Fazer o controller repassar o `body` da requisição para o service.
- Ajustar o teste de `POST /tasks`.

**Pronto quando:** `POST /tasks` com `{ "title": "Estudar TypeScript" }` grava a tarefa no banco, responde `201` com ela, e o teste passa.

## Tarefa 4 — Cadastro (FE)

- Fazer o campo "O que você precisa fazer?" e o botão **Adicionar tarefa** funcionarem.
- Ao clicar no botão (ou apertar Enter), chamar `POST /tasks` com o título digitado.
- Adicionar a tarefa criada na lista sem recarregar a página e limpar o campo.

**Pronto quando:** você digita uma tarefa, clica em Adicionar e ela aparece na lista. Ao recarregar a página, ela continua lá.

---

## Tarefa 5 — Concluir tarefa (BE)

- Implementar `findById(id)` e `toggle(id)` na `TaskModel`. O `toggle` inverte o `completed` (dica: primeiro você precisa saber o valor atual).
- Fazer o `toggleTask()` do service receber o id e usar a model.
- Fazer o controller repassar o `id` da URL. Atenção: ele chega como **texto**, mas o banco espera **número**.
- Ajustar o teste de `PATCH /tasks/:id/toggle`.

**Pronto quando:** chamar `PATCH /tasks/1/toggle` duas vezes marca e desmarca a tarefa no banco, e o teste passa.

## Tarefa 6 — Concluir tarefa (FE)

- Ao clicar na caixa de seleção, chamar `PATCH /tasks/:id/toggle`.
- Atualizar a tarefa na lista com o que a API retornou.

**Pronto quando:** clicar na caixa marca a tarefa como concluída (título riscado) e clicar de novo desmarca. Ao recarregar, o estado se mantém.

---

## Tarefa 7 — Abas, contadores e progresso (FE)

Esta tarefa é só de frontend: tudo é calculado a partir da lista que já veio do `GET /tasks`.

- Criar as abas **Todas**, **Pendentes** e **Concluídas**, cada uma com seu contador, destacando a aba selecionada.
- Filtrar a lista conforme a aba escolhida.
- Mostrar "X de Y concluídas" e a barra de progresso preenchida proporcionalmente (ex.: 2 de 5 = 40%).
- Mostrar a mensagem "Você já concluiu X tarefas. Continue no seu ritmo." no rodapé do card.

**Pronto quando:** ao criar ou concluir uma tarefa, abas, contadores, barra e mensagem se atualizam sozinhos.

---

## Tarefa 8 — Edição (BE)

- Implementar `update(id, input)` na `TaskModel`, alterando só o título.
- Fazer o `updateTask()` do service receber o id e o título e usar a model.
- Fazer o controller repassar o `id` da URL e o `body`.
- Ajustar o teste de `PATCH /tasks/:id`.

**Pronto quando:** `PATCH /tasks/1` com `{ "title": "Novo título" }` altera a tarefa no banco e o teste passa.

## Tarefa 9 — Edição (FE)

- Ao clicar no lápis, a linha entra em modo de edição: rótulo "EDITAR TAREFA", campo com o título atual e os botões **Salvar** e **Cancelar**.
- **Salvar** chama `PATCH /tasks/:id` com o novo título e atualiza a lista.
- **Cancelar** volta ao título original sem chamar a API.

**Pronto quando:** você edita o título de uma tarefa, salva, e o novo título aparece na lista e continua lá depois de recarregar.

---

## Tarefa 10 — Exclusão (BE)

- Implementar `delete(id)` na `TaskModel`.
- Fazer o `deleteTask()` do service receber o id e usar a model.
- Fazer o controller repassar o `id` da URL.
- Ajustar o teste de `DELETE /tasks/:id`.
- Como agora nenhum método usa mais os mocks, apagar a lista `mockTasks` do service e o comentário `eslint-disable` do topo da model.

**Pronto quando:** `DELETE /tasks/1` remove a tarefa do banco, responde `204`, e todos os testes passam.

## Tarefa 11 — Exclusão (FE)

- Ao clicar na lixeira, chamar `DELETE /tasks/:id`.
- Remover a tarefa da lista sem recarregar a página.

**Pronto quando:** a tarefa some da tela ao clicar na lixeira, não volta ao recarregar, e os contadores se atualizam.

---

## Tarefa 12 — Entrega

- [ ] `npm run lint` passando no `backend/` e no `frontend/`
- [ ] `npm run format:check` passando nos dois
- [ ] `npm run typecheck` passando nos dois
- [ ] `npm test` passando no `backend/`
- [ ] Fluxo completo testado na tela: criar, listar, filtrar, concluir, editar e excluir
- [ ] Tela conferida lado a lado com o Figma
