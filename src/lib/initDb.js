import sequelize from './db';
// Les imports suivants sont requis pour que Sequelize synchronise les tables au démarrage
import './models/User';
import './models/Project';
import './models/Testimonial';
import Project from './models/Project';

let initialized = false;

const projects = [
  {
    id: 1,
    title: 'Fortivia Bank',
    description: "Application bancaire complète développée en équipe dans le cadre du projet intégrateur au Collège La Cité. Elle simule le fonctionnement réel d'une banque en ligne : ouverture de compte, dépôts et retraits, historique des transactions, demandes de prêt avec évaluation automatisée, et tableau de bord personnalisé par utilisateur.\n\nParmi les fonctionnalités avancées intégrées : l'envoi de courriels réels via Nodemailer (Gmail SMTP) pour les confirmations de transactions, ainsi qu'une authentification à double facteur (2FA) par code unique envoyé par courriel. Les notifications en temps réel sont gérées via Socket.IO, permettant d'alerter l'utilisateur instantanément lors de mouvements sur son compte.\n\nL'architecture full-stack repose sur Node.js et Express.js côté backend (API REST), PostgreSQL hébergé sur Neon comme base de données cloud, et JWT pour la sécurisation des sessions. Le projet intègre également une suite de tests complète avec Jest (tests unitaires) et Supertest (tests d'intégration API). Le tout est déployé en ligne sur Render.\n\nCe projet est reconnu comme l'un des plus complexes et aboutis de la promotion. Le professeur a été particulièrement impressionné par la rigueur de l'implémentation, au point d'accepter de servir de référence professionnelle.",
    technologies: 'Node.js,Express.js,PostgreSQL,Socket.IO,JWT,Nodemailer,Jest,Supertest',
    github: 'https://github.com/Exauce14',
    demo: 'https://groupe-9.onrender.com/',
  },
  {
    id: 2,
    title: 'Sécurité Cloud AWS — Configuration HTTPS',
    description: "Projet de cybersécurité réalisé sur la plateforme AWS (environnement étudiant) dans le cadre du cours de sécurité informatique. L'objectif était de configurer et sécuriser un serveur web en HTTPS avec un certificat SSL/TLS valide — une notion intentionnellement non abordée en cours, proposée comme défi bonus.\n\nL'environnement AWS étudiant imposait des contraintes spécifiques : absence d'accès root complet, restrictions sur les ports entrants, et impossibilité d'utiliser des outils automatisés comme Certbot dans leur forme standard. Face à ces obstacles, j'ai mené des recherches approfondies de façon totalement autonome — documentation officielle AWS, forums techniques, tutoriels YouTube — pendant plusieurs heures pour comprendre la chaîne de configuration complète.\n\nSteps réalisés : déploiement d'une instance EC2 sous Linux, configuration d'Apache comme serveur web, création et installation manuelle du certificat SSL via AWS Certificate Manager (ACM), mise en place des règles de sécurité (Security Groups) pour les ports 80 et 443, et redirection HTTP vers HTTPS.\n\nLe résultat a tellement impressionné le professeur qu'il m'a demandé de présenter ma démarche complète à toute la classe lors de la présentation UA3. Ce projet illustre ma capacité à apprendre seul dans des environnements contraints et à résoudre des problèmes techniques non documentés.",
    technologies: 'AWS EC2,Linux,Apache,SSL/TLS,HTTPS,Cloud',
    github: 'https://github.com/Exauce14',
    demo: null,
  },
  {
    id: 3,
    title: 'Clone Facebook — Application mobile Android',
    description: "Reproduction complète de l'application Facebook développée en Kotlin dans le cadre du cours de développement mobile Android au Collège La Cité. L'objectif était de recréer l'expérience utilisateur de Facebook de façon fidèle, en couvrant l'ensemble de ses fonctionnalités principales.\n\nFonctionnalités implémentées : fil d'actualité dynamique, profils utilisateurs avec photo et biographie, système de publications avec images, réactions (J'aime), commentaires, messagerie instantanée entre utilisateurs, et système de notifications. Chaque écran a été conçu pour reproduire fidèlement l'interface de Facebook tout en restant adapté aux contraintes Android.\n\nL'architecture suit le patron MVVM (Model-View-ViewModel) recommandé par Google pour Android, avec navigation entre fragments via le Navigation Component, gestion de l'état avec ViewModel et LiveData, et communication réseau via Retrofit pour consommer une API REST. Firebase est utilisé pour l'authentification et le stockage des médias en temps réel.\n\nCe projet démontre ma maîtrise du développement mobile natif Android et ma capacité à concevoir des applications complexes à grande échelle, intégrant des flux de données en temps réel, une architecture robuste et une expérience utilisateur soignée.",
    technologies: 'Kotlin,Android,MVVM,Firebase,Retrofit,REST API,XML',
    github: 'https://github.com/Exauce14',
    demo: null,
  },
];

export async function initDb() {
  if (initialized) return;
  await sequelize.sync({ alter: true });

  await Project.destroy({ where: {} });
  await sequelize.query("UPDATE sqlite_sequence SET seq = 0 WHERE name = 'Projects'").catch(() => {});
  await Project.bulkCreate(projects);

  initialized = true;
}
