# Upload File

<div style="display: grid;
grid-template-columns: 1fr 1fr; gap: 10px; padding: 10px;">
    <img src="./public/change-password.png" style="width: 350px; height: 400px; background-size: cover; object-fit: cover; border-radius: 10px;">
    <img src="./public/forgot-password.png" style="width: 350px; height: 400px; background-size: cover; object-fit: cover; border-radius: 10px;">
    <img src="./public/signin.png" style="width: 350px; height: 400px; background-size: cover; object-fit: cover; border-radius: 10px;">
    <img src="./public/signup.png" style="width: 350px; height: 400px; background-size: cover; object-fit: cover; border-radius: 10px;">
</div>

Este é um projeto para facilitar o upload de arquivos de forma simples e eficiente. Até o momento, construí parcialmente o frontend utilizando Next.js, Tailwind CSS e React Icons, seguindo o padrão de componentes para uma experiência de usuário mais intuitiva.

## Visão Geral

<div style="display: flex; gap: 10px; padding: 10px;">
    <img src="./public/app.png" style="width: 350px; height: 400px; background-size: cover; object-fit: cover; border-radius: 10px;">
    <img src="./public/app2.png" style="width: 350px; height: 400px; background-size: cover; object-fit: cover; border-radius: 10px;"/>
</div>

O objetivo principal deste projeto é permitir que os usuários carreguem arquivos de maneira rápida e fácil. Ele foi desenvolvido com a ideia de ser uma solução versátil para diferentes tipos de aplicativos que necessitam dessa funcionalidade.

### Tecnologias Utilizadas Frontend:

- Next.js
- Tailwind CSS
- React Icons

**Backend (ainda em desenvolvimento):**

- NestJs
- Typescript
- PostgreSQL

#### Como Contribuir

Sinta-se à vontade para contribuir com este projeto! Seja por meio de correções de bugs, melhorias no código, ou até mesmo sugestões para novos recursos, todas as formas de contribuição são bem-vindas.

**Como testar localmente?**

### Itens necessários em sua máquina:

- node
- pgadmin
- postgreSQL

#### Instruções para Desenvolvedores:

Clone o repositório:
```bash
git clone https://github.com/marcodmc/dropzone.git
```

#### Instale as dependências do frontend:

```bash
cd dropzone
npm install
```


#### Crie um arquivo .env na raiz do projeto e insira as seguintes variáveis:

```plaintext
NEXT_PUBLIC_API="http://localhost:8000/v1"
NEXTAUTH_SECRET=1a347b8dcd5761cbb07f7a6838d8c4ec8072e0b8ec4a8cbec13818420e5c4f7b
```

#### Execute o servidor de desenvolvimento:

```bash
npm run dev
```


#### Clone o backend da aplicação:

```bash
git clone https://github.com/encodedbrain/dropzone.git
```

#### Após acessar a pasta do backend, instale as dependências:

```bash
cd dropzone
npm install
```


#### Crie um arquivo .env na raiz do projeto e insira as seguintes variáveis:

```plaintext
DATABASE_URL="postgresql://usuariocadastrado:senhacadastradanopgadmin@localhost:5432/postgres"
PORT="8000"
SECRET="48f2a4533067e09346eef77ce517f6b5c877a921ecd71ae5771ba992eb41a07a"
MAIL_HOST="smtp.office365.com"
SMTP_USERNAME="um email seu de sua preferencia"
SMTP_PASSWORD="senha do email"
```

#### Rode o projeto:

```bash
npm run start:dev
```


## Deploy

Este projeto está atualmente implantado na Vercel. Você pode acessá-lo aqui:

[dropzone](https://upload-file-rho.vercel.app/)

#### Contato

Para qualquer dúvida, sugestão ou problema relacionado a este projeto, sinta-se à vontade para entrar em contato:

meu email: [email](mailto:marcodamasceno0101@outlook.com)
GitHub Issues: [GitHub Issues](https://github.com/marcodmc/dropzone/issues)
Agradeço o seu interesse em contribuir para tornar este projeto ainda melhor!


Este texto foi revisado para corrigir erros de pontuação e organizado para melhor clareza e legibilidade no contexto de um documento Markdown.

>>>>>>> develop
