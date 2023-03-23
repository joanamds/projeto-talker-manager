# :speaking_head: Projeto Talker Manager

Este projeto foi o primeiro projeto utilizando Node.js em que foi preciso construir uma API com CRUD(Create Read Update Delete) de palestrantes. Foi preciso desenvolver endpoints para ler e escrever em um arquivo utilizando o módulo `fs`

**Exemplo do método `GET`:**

![image](https://user-images.githubusercontent.com/106452876/218261237-989d4f99-cc59-443d-8e76-5b52e6044c21.png)

## Tecnologias usadas
Back-end:
> Desenvolvido usando: Docker, docker-compose, Node.js, Express

## Instalando Dependências
### Com Docker
> Backend

* Primeiro instale os containers: 
```bash
docker-compose up -d
``` 

* Em seguida abra o terminal interativo do container: 
```bash
docker exec -it talker_manager bash
``` 

* Instale as dependências dentro do container: 
```bash
npm install
``` 
> Testes

* Dentro do terminal do container:
```bash
npm test
``` 

### Sem Docker

* Instale as dependências [Caso existam]
```bash
npm install
``` 

* Execute a aplicação com 
```bash
npm start
```

Ou: 

```bash
npm run dev
```

> Testes

* Rode o comando:
```bash
npm test
``` 

## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://joanamds.github.io/#/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/dev-joanamds/)

