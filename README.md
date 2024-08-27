# API de Rota de Entregas

## Descrição
Esta API permite a criação de pedidos e rotas de entrega, e verifica a melhor rota de entrega para os pedidos cadastrados.

## Endpoints
- `GET /api/pedidos`: Retorna a lista de pedidos.
- `POST /api/pedidos`: Cria um novo pedido.
- `GET /api/rotas`: Retorna a lista de rotas.
- `POST /api/rotas`: Cria uma nova rota.
- `GET /api/melhor-rota/:id`: Verifica a melhor rota de entrega para os pedidos baseando-se na rota cadastrada especificada pelo id.

## Instruções para Execução

1. Clone o repositório.
2. Instale as dependências:
    ```bash
    npm install
    ```
3. Inicie o servidor:
    ```bash
    npm start
    ```
4. Execute os testes:
    ```bash
    npm test
    ```

## Dependências
- Node.js
- Express
- Jest
- Supertest
