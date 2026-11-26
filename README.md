# Semestre

Aplicativo híbrido para organizar as matérias do semestre: provas, trabalhos e atividades com prazo, notas e quanto falta tirar para passar. Feito com Ionic + React e Capacitor.

## Telas

- **Matérias**: contagem para a próxima prova, entregas pendentes e média de cada matéria
- **Detalhe da matéria**: entregas, notas e a calculadora "Quanto preciso tirar?"
- **Nova matéria**: nome, professor, ícone e cor
- **Agenda**: todas as entregas agrupadas por prazo
- **Ajustes**: tema claro/escuro, média para aprovação e dados

Os dados ficam salvos no aparelho com `@capacitor/preferences`.

## Rodando local

```bash
npm install
npm run dev
```

## Deploy na VPS

Precisa só de Docker com o plugin compose.

```bash
git clone https://github.com/Gabrieldiog/HOMEWORK-HYBRID-APPLICATION.git
cd HOMEWORK-HYBRID-APPLICATION
PORT=80 docker compose up -d --build
```

Para atualizar depois de um merge:

```bash
git pull && docker compose up -d --build
```

O container serve o build com nginx, com fallback para as rotas do app, gzip e cache nos assets.

## Stack

- Ionic 8 + React 18
- React Router 5 (via `@ionic/react-router`)
- Capacitor 7 com `@capacitor/preferences`
- Vite 5 e TypeScript
