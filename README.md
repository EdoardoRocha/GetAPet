# 🐾 Get A Pet - Sistema de Adoção de Animais

O **Get A Pet** é uma aplicação Full Stack desenvolvida para facilitar o processo de adoção de animais de estimação. Os usuários podem se cadastrar, gerenciar o perfil, anunciar pets para adoção e gerenciar as solicitações de interessados.

## 🚀 Tecnologias Utilizadas

### Frontend
* **React**: Biblioteca principal para construção da interface.
* **React Router Dom**: Gerenciamento de rotas e navegação.
* **CSS Modules**: Estilização componente a componente para evitar conflitos de escopo.
* **Context API**: Gerenciamento de estado global para autenticação de usuários.

### Backend
* **Node.js & Express**: Ambiente de execução e framework para a API.
* **MongoDB & Mongoose**: Banco de dados NoSQL e modelagem de dados.
* **JWT (JSON Web Token)**: Sistema de autenticação segura.
* **Bcrypt**: Criptografia de senhas para segurança do usuário.
* **Multer**: Middleware para upload e armazenamento de imagens de usuários e pets.

## 📋 Funcionalidades

* **Autenticação**: Cadastro e login de usuários com validação de campos.
* **Perfil do Usuário**: Edição de dados pessoais, incluindo foto de perfil.
* **Gerenciamento de Pets**: Criar, visualizar, editar e deletar anúncios de pets.
* **Sistema de Adoção**:
    * Visualizar pets disponíveis na Home.
    * Solicitar visita/adoção de um pet.
    * Visualizar lista de pets que você solicitou adoção.
    * Concluir a adoção de um pet anunciado por você.

## 🛠️ Como Executar o Projeto

### Pré-requisitos
* Node.js instalado.
* MongoDB rodando localmente (porta 27017) ou via Atlas.

### 1. Configuração do Backend
```bash
cd backend
npm install
# O servidor rodará na porta 5000 por padrão
npm start