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

- **GET /examples**: Retorna uma lista de todos os exemplos.
- **GET /examples/:id**: Retorna os detalhes de um exemplo específico com base no ID.
- **POST /examples**: Adiciona um novo exemplo.
- **PUT /examples/:id**: Atualiza os detalhes de um exemplo existente substituindo todos os campos.
- **PATCH /examples/:id**: Atualiza parcialmente os detalhes de um exemplo existente.
- **DELETE /examples/:id**: Exclui um exemplo.

Para mais detalhes sobre cada rota e seus parâmetros, consulte o código-fonte do servidor.

## Upload de Arquivos

O servidor também oferece suporte ao upload de arquivos. Você pode fazer upload de uma imagem primaria ou secundaria para um exemplo específico. Para isso, utilize a rota:

- **POST /examples/upload/:id**: Faz upload de um arquivo para um exemplo específico. Certifique-se de incluir o parâmetro de ID do exemplo na URL da requisição e enviar a imagem como um arquivo com o campo 'file' no corpo da requisição.

Certifique-se de que as permissões de escrita estejam configuradas corretamente na pasta de uploads para que o servidor possa salvar os arquivos.

Divirta-se usando o servidor!