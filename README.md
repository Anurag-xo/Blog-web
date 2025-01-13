# Blog-Web

A simple yet robust blog website with CRUD functionality created with Node.js, Express, MongoDB, and EJS for templating. This project is designed to be easily deployable using Docker and Kubernetes, and it includes a CI/CD pipeline for automated testing and deployment.

## Features

- **User Authentication**: Secure login and registration system with bcrypt for password hashing and JWT for session management.
- **CRUD Operations**: Create, Read, Update, and Delete blog posts.
- **Markdown Support**: Write blog posts using Markdown syntax with live preview.
- **Search Functionality**: Search for blog posts by title or content.
- **Responsive Design**: Fully responsive design for a seamless experience on all devices.
- **Docker Support**: Easily deploy the application using Docker and Docker Compose.
- **Kubernetes Deployment**: Helm chart for deploying the application to a Kubernetes cluster.
- **CI/CD Pipeline**: GitHub Actions workflow for automated testing, Docker image building, and Helm chart updates.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) (or use the Dockerized version provided)
- [Docker](https://www.docker.com/) (optional, for containerized deployment)
- [Kubernetes](https://kubernetes.io/) (optional, for Kubernetes deployment)
- [Helm](https://helm.sh/) (optional, for Kubernetes deployment)

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
```

### 4. Run the Application

```bash
npm run dev
```

The application will be available at `http://localhost:5000`.

### 5. Using Docker

To run the application using Docker, use the provided `docker-compose.yml` file:

```bash
docker-compose up --build
```

This will start the Node.js application and a MongoDB instance. The application will be available at `http://localhost:5000`.

### 6. Kubernetes Deployment

To deploy the application to a Kubernetes cluster, use the provided Helm chart:

```bash
helm install blog-web ./helm/blog-web-chart
```

This will deploy the application and MongoDB to your Kubernetes cluster.

## CI/CD Pipeline

The project includes a GitHub Actions workflow for continuous integration and deployment. The workflow performs the following steps:

1. **Build**: Installs dependencies and runs tests.
2. **Docker**: Builds and pushes a Docker image to Docker Hub.
3. **Helm Chart Update**: Updates the Helm chart with the new Docker image tag and pushes the changes to the repository.

To use the CI/CD pipeline, ensure you have the following secrets configured in your GitHub repository:

- `DOCKER_USERNAME`: Your Docker Hub username.
- `DOCKER_PASSWORD`: Your Docker Hub password.
- `TOKEN_GIT`: A GitHub token with write access to the repository.

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
│   ├── models/
│   │   ├── Post.js
│   │   └── User.js
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

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## Acknowledgments

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [EJS](https://ejs.co/)
- [Docker](https://www.docker.com/)
- [Kubernetes](https://kubernetes.io/)
- [Helm](https://helm.sh/)
- [GitHub Actions](https://github.com/features/actions)
