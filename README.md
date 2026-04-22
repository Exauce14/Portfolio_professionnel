# Portfolio - Exauce Ngolo

Portfolio personnel développé avec **Next.js 16**, **Redux Toolkit**, **Axios**, **Sequelize** et **SQLite**.

## Technologies utilisées

| Technologie | Rôle |
|---|---|
| Next.js 16 (App Router) | Framework fullstack |
| Redux Toolkit | Gestion d'état global |
| Axios | Requêtes HTTP frontend → backend |
| Sequelize + SQLite | ORM + base de données |
| Tailwind CSS | Styles CSS utilitaires |
| bcryptjs | Hashage des mots de passe |
| jsonwebtoken | Authentification JWT |

## Fonctionnalités

- **Page d'accueil** — présentation, barres de compétences
- **Inscription / Connexion** — formulaires avec validation en rouge
- **Projets** — liste + page détail par ID (données depuis Next API)
- **Témoignages** — liste, ajout, modification, suppression
- **Protection des routes** — middleware Next.js + Redux (JWT en cookie)
- **Navigation responsive** — header mobile avec menu burger
- **Footer** — liens GitHub, LinkedIn, Email

## Installation et démarrage

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

L'application sera disponible sur [http://localhost:3000](http://localhost:3000)

> La base de données SQLite est créée automatiquement au premier démarrage avec 3 projets prédéfinis.

## Structure du projet

```
src/
├── app/
│   ├── api/
│   │   ├── auth/login/          → POST - Connexion JWT
│   │   ├── auth/register/       → POST - Inscription
│   │   ├── projects/            → GET tous les projets
│   │   ├── projects/[id]/       → GET un projet par ID
│   │   ├── testimonials/        → GET liste + POST nouveau
│   │   └── testimonials/[id]/   → GET + PUT + DELETE
│   ├── login/                   → Page connexion
│   ├── register/                → Page inscription
│   ├── projects/                → Liste des projets
│   ├── projects/[id]/           → Détail d'un projet
│   ├── testimonials/            → Liste des témoignages
│   ├── testimonials/add/        → Formulaire ajout
│   └── testimonials/edit/[id]/  → Formulaire modification
├── components/
│   ├── Header.js                → Navigation + déconnexion
│   ├── Footer.js                → Liens réseaux sociaux
│   ├── ProtectedRoute.js        → Garde de route côté client
│   └── ReduxProvider.js         → Provider Redux + hydratation localStorage
├── store/
│   ├── authSlice.js             → État authentification (login/logout/register)
│   ├── projectsSlice.js         → État projets
│   └── testimonialsSlice.js     → État témoignages (CRUD)
├── lib/
│   ├── db.js                    → Configuration Sequelize + SQLite
│   ├── initDb.js                → Initialisation BDD + données seed
│   └── models/                  → User, Project, Testimonial
└── middleware.js                → Protection des routes par cookie JWT
```

## Modèles de base de données

- **User** — id, name, email, password (hashé bcrypt)
- **Project** — id, title, description, technologies, github, image
- **Testimonial** — id, name, message, rating (1-5), userId

## Protection des routes

Toutes les pages sauf `/login` et `/register` nécessitent une connexion. La protection est double :
1. **Middleware Next.js** (`src/middleware.js`) — vérifie le cookie JWT côté serveur avant le rendu
2. **Composant `ProtectedRoute`** — redirection côté client si Redux ne détecte pas de session active

## Auteur

**Exauce Ngolo**  
Email : exaucengolo519@gmail.com  
GitHub : [github.com/exaucengolo519](https://github.com/exaucengolo519)
