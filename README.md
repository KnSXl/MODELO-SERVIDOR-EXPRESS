# Guia de Configuração do Servidor

Para configurar e iniciar o servidor, siga estes passos simples:

## 1. Instalar Dependências

Certifique-se de ter o Node.js e o npm instalados em sua máquina. Em seguida, execute o comando abaixo no terminal para baixar as dependências do servidor:

```bash
npm install
```

## 2. Iniciar o Servidor

Depois de instalar as dependências, navegue até a pasta do servidor no terminal e execute o seguinte comando:

```bash
npm start
```

Isso iniciará o servidor Express. Verifique se não há erros exibidos no terminal durante a inicialização do servidor. Se tudo correr bem, você verá uma mensagem indicando que o servidor está rodando.

O servidor estará disponível em http://localhost:3000/ por padrão.

## Uso do Servidor

O servidor oferece os seguintes endpoints:

- **GET /users**: Retorna uma lista de todos os usuários.
- **GET /users/:id**: Retorna os detalhes de um usuário específico com base no ID.
- **POST /users**: Adiciona um novo usuário.
- **PUT /users/:id**: Atualiza os detalhes de um usuário existente substituindo todos os campos.
- **PATCH /users/:id**: Atualiza parcialmente os detalhes de um usuário existente.
- **DELETE /users/:id**: Exclui um usuário.

Para mais detalhes sobre cada rota e seus parâmetros, consulte o código-fonte do servidor.

## Upload de Arquivos

O servidor também oferece suporte ao upload de arquivos de avatar. Você pode fazer upload de uma imagem de perfil ou de capa para um usuário específico. Para isso, utilize a rota:

- **POST /users/upload/:id**: Faz upload de um arquivo de avatar para um usuário específico. Certifique-se de incluir o parâmetro de ID do usuário na URL da requisição e enviar a imagem de avatar como um arquivo com o campo 'file' no corpo da requisição.

Certifique-se de que as permissões de escrita estejam configuradas corretamente na pasta de uploads para que o servidor possa salvar os arquivos de avatar.

### Link para os Métodos HTTP no Postman: [Clique aqui](https://www.postman.com/cespro/workspace/testes-http/collection/34144524-08a82527-6498-4a9a-b931-3ef907e27337?action=share&creator=34144524)

Divirta-se usando o servidor!