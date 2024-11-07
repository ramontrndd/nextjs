## 🛠️ Funcionalidades da Aplicação
### 1. **Cadastro de Usuários (Create)**
🛑 --**IMPORTANTE** A criação de uma novo usuário tem um select para `Administrador` & `Usuário` caso selecione `Usuário` recebe o status `true`
 podendo ter acesso direto ao dashboard de usuário, caso selecione `Administrador` sera necessario o aceite por outro usuario, deixei essa função sem delimitar permissão só para ser testado mas poderia delimitar permissões para cada role dentro do sistema.

 - **Descrição**: Permite que novos usuários se cadastrem na aplicação preenchendo um formulário com informações essenciais, como nome, email, número de contato e perfil (usuário ou administrador).
- **Funcionalidade**:
  - Validação de dados no frontend e backend para garantir a integridade das informações.
  - Armazenamento seguro das informações no banco de dados MongoDB.
### 2. **Listagem de Usuários (Read)**
- **Descrição**: Exibe uma lista completa de todos os usuários cadastrados, com informações detalhadas e opções para visualizar ou gerenciar cada usuário individualmente.
- **Funcionalidade**:
  - Interface amigável para visualização dos dados.
  - Paginação e filtros para facilitar a busca por usuários específicos.
### 3. **Edição de Usuários (Update)**
- **Descrição**: Permite a edição das informações dos usuários existentes, possibilitando a atualização de nome, email, número de contato, perfil e status.
- **Funcionalidade**:
  - Formulário pré-preenchido com os dados atuais do usuário para facilitar as modificações.
  - Atualização segura dos dados no banco de dados após validação.
### 4. **Exclusão de Usuários (Delete)**
- **Descrição**: Oferece a funcionalidade de remover usuários do sistema, com confirmações para evitar exclusões acidentais.
- **Funcionalidade**:
  - Confirmação antes da exclusão para garantir que a ação é intencional.
  - Remoção segura dos dados do banco de dados.
### 5. **Autenticação de Usuários (Login)**
- **Descrição**: Implementa um sistema de login seguro onde os usuários podem acessar um dashboard personalizado após autenticação.
- **Funcionalidade**:
  - Autenticação baseada em **JWT** (JSON Web Tokens) para segurança robusta.
  - Armazenamento seguro dos tokens para gerenciamento de sessões.

## 🚀 Iniciando a Aplicação com Docker
Siga os passos abaixo para configurar e rodar a aplicação localmente utilizando Docker e Docker Compose.
### 🔧 Pré-requisitos
- **Docker** instalado na sua máquina. Você pode baixar e instalar a partir do [site oficial do Docker](https://www.docker.com/products/docker-desktop).
- **Docker Compose** incluído na instalação do Docker Desktop.
### 📥 Clonar o Repositório
```bash
git clone https://github.com/ramontrndd/nextjs.git
cd nextjs
```
### 📝 Configurar as Variáveis de Ambiente
Crie um arquivo 
.env
 na raiz do projeto com as seguintes variáveis:
```env
NODE_ENV=development
MONGO_URI=mongodb://mongodb:27017/nextapp
JWT_SECRET=91722FCF7C2F9777336D994BCEE3D
```
### 🛠️ Construir e Iniciar os Contêineres
Execute o seguinte comando para construir as imagens e iniciar os serviços:
```bash
docker-compose up --build
```
### 🌐 Acessar a Aplicação
Após os contêineres serem iniciados, abra o seu navegador e visite:
```
http://localhost:3000
```
### 🗄️ Serviços Iniciados
- **Aplicação Next.js**: Disponível na porta `3000`.
- **MongoDB**: Disponível na porta `27017`.
### 🛑 Parar os Contêineres
Para parar a aplicação, pressione `Ctrl + C` no terminal onde o Docker Compose está rodando ou execute:
```bash
docker-compose down
```
### 📧 Contato

Para dúvidas ou suporte, entre em contato através de [seu-email@exemplo.com](mailto:ramonbraintrindade@gmail.com).

