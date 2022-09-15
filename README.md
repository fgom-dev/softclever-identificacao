# softclever-identificacao

### Projeto de Login e autenticação utilizando as ferramentas:

- NodeJS;
- Typescript;
- Express;
- Prisma;
- JWT;
- MySql;

# Objetivo

### Usuário

O sistema é capaz de criar, editar, inativar, reativar usuários.

### Autenticação

O sistema faz a autenticação do usuário com um JWT (JSON Web Token), além dessa autenticação, o sistema verifica se o usuário pertence a alguma empresa.

### Empresa

Depois que o usuário estiver autenticado o sistema é capaz de criar, editar, inativar, reativar empresa, além disso é possível adicionar e remover usuários da empresa.

### Banco de dados

Estamos utilizando MySQL como banco de dados, utilizamos o Prisma (ORM) para fazer a comunicação com o banco.
Após criar a empresa o sistema irá criar um banco de dados com as tabelas necessárias para gerenciar a empresa.

