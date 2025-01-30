# Blog-Web: A Modern Blogging Platform

Welcome to **Blog-Web**, a fully-featured blogging platform built with **Node.js**, **Express**, **MongoDB**, and **EJS** for templating. This project is designed to be highly scalable, easy to deploy, and developer-friendly. Whether you're a blogger, developer, or DevOps enthusiast, Blog-Web provides a robust foundation for creating and managing blog content with ease.

---

## Key Features

### 1. **User Authentication**

- Secure login and registration system using **bcrypt** for password hashing.
- **JWT (JSON Web Tokens)** for session management.
- **Google OAuth 2.0** integration for seamless login with Google accounts.

### 2. **CRUD Operations**

- Create, Read, Update, and Delete blog posts.
- Admin dashboard for managing posts and comments.

### 3. **Markdown Support**

- Write blog posts using **Markdown** syntax with a live preview editor.
- Syntax highlighting for code snippets using **highlight.js**.

### 4. **Search Functionality**

- Search for blog posts by title or content.
- Dynamic search bar with real-time results.

### 5. **Responsive Design**

- Fully responsive and mobile-friendly design.
- Clean and modern UI with **CSS3** and **Google Fonts**.

### 6. **Docker Support**

- Easily deploy the application using **Docker** and **Docker Compose**.
- Pre-configured MongoDB container for local development.

### 7. **Kubernetes Deployment**

- **Helm chart** for deploying the application to a Kubernetes cluster.
- Includes MongoDB deployment and service configurations.

### 8. **CI/CD Pipeline**

- Automated testing, Docker image building, and deployment using **GitHub Actions**.
- Push Docker images to **Docker Hub** and **AWS ECR**.
- Update Helm charts automatically with the latest image tags.

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **MongoDB** (or use the Dockerized version provided)
- **Docker** (optional, for containerized deployment)
- **Kubernetes** (optional, for Kubernetes deployment)
- **Helm** (optional, for Kubernetes deployment)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/blog-web.git
cd blog-web
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
MONGODB_URI=mongodb://localhost:27017/blogDB
SECRET=your-secret-key
JWT_SECRET=your-jwt-secret
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-password
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
REDIS_URL=redis://localhost:6379
```

### 4. Run the Application

```bash
npm run dev
```

The application will be available at `http://localhost:5000`.

---

## Deployment Options

### 1. **Docker Deployment**

To run the application using Docker, use the provided `docker-compose.yml` file:

```bash
docker-compose up --build
```

- Note: To deploy the application locally use "docker-compose.yml.bak" file and rename it to "docker-compose.yml".

This will start the Node.js application and a MongoDB instance. The application will be available at `http://localhost:5000`.

### 2. **Kubernetes Deployment**

To deploy the application to a Kubernetes cluster, use the provided Helm chart:

```bash
helm install blog-web ./helm/blog-web-chart
```

This will deploy the application and MongoDB to your Kubernetes cluster.

---

## CI/CD Pipeline

The project includes a **GitHub Actions** workflow for continuous integration and deployment. The workflow performs the following steps:

1. **Build**: Installs dependencies and runs tests.
2. **Docker**: Builds and pushes a Docker image to **Docker Hub** and **AWS ECR**.
3. **Helm Chart Update**: Updates the Helm chart with the new Docker image tag and pushes the changes to the repository.

To use the CI/CD pipeline, ensure you have the following secrets configured in your GitHub repository:

- `DOCKER_USERNAME`: Your Docker Hub username.
- `DOCKER_PASSWORD`: Your Docker Hub password.
- `AWS_ACCESS_KEY_ID`: Your AWS access key ID.
- `AWS_SECRET_ACCESS_KEY`: Your AWS secret access key.
- `ECR_REPOSITORY`: Your AWS ECR repository URL.
- `TOKEN_GIT`: A GitHub token with write access to the repository.

---

## Project Structure

```
anurag-xo-blog-web/
├── README.md
├── Dockerfile
├── app.js
├── docker-compose.yml
├── package.json
├── run_docker.sh
├── stop_docker.sh
├── .dockerignore
├── helm/
│   └── blog-web-chart/
│       ├── Chart.yaml
│       ├── values.yaml
│       ├── .helmignore
│       └── templates/
│           ├── deployment.yaml
│           ├── ingress.yaml
│           ├── mong-deployment.yaml
│           ├── mongo-service.yaml
│           └── service.yaml
├── k8s/
│   └── manifests/
│       ├── deployment.yaml
│       ├── ingress.yaml
│       ├── mong-deployment.yaml
│       ├── mongo-service.yaml
│       ├── persistent-volume-claim.yml
│       ├── persistent-volume.yml
│       ├── secrets.yaml
│       └── service.yaml
├── public/
│   ├── css/
│   │   └── style.css
│   ├── img/
│   │   └── hero-image.webp
│   └── js/
│       └── script.js
├── server/
│   ├── config/
│   │   └── db.js
│   ├── helpers/
│   │   └── routeHelpers.js
│   ├── middleware/
│   │   └── cache.js
│   ├── models/
│   │   ├── Comment.js
│   │   ├── Post.js
│   │   └── User.js
│   ├── queue/
│   │   └── emailQueue.js
│   └── routes/
│       ├── admin.js
│       └── main.js
├── views/
│   ├── about.ejs
│   ├── contact.ejs
│   ├── index.ejs
│   ├── post.ejs
│   ├── search.ejs
│   ├── admin/
│   │   ├── add-post.ejs
│   │   ├── dashboard.ejs
│   │   ├── edit-post.ejs
│   │   └── index.ejs
│   ├── layouts/
│   │   ├── admin.ejs
│   │   └── main.ejs
│   └── partials/
│       ├── footer.ejs
│       ├── header.ejs
│       ├── header_admin.ejs
│       └── search.ejs
└── .github/
    └── workflows/
        └── ci.yaml
```

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeatureName`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeatureName`).
5. Open a pull request.

---

## Acknowledgments

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [EJS](https://ejs.co/)
- [Docker](https://www.docker.com/)
- [Kubernetes](https://kubernetes.io/)
- [Helm](https://helm.sh/)
- [GitHub Actions](https://github.com/features/actions)

---

Happy blogging! 🚀
