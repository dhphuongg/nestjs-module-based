# NestJS Module-based Architecture Boilerplate

A NestJS boilerplate with module-based architecture, designed to help you quickly start with NestJS projects. This boilerplate provides a standard structure, common technologies, and best practices for building backend applications.

## Features

- 🏗️ **Module-based Architecture**: Clear structure, easy to extend and maintain
- 🔐 **Authentication**: JWT-based authentication with refresh token
- 📝 **API Documentation**: Swagger/OpenAPI documentation
- 🗄️ **Database**: Prisma ORM with TypeScript
- 🔄 **Real-time**: Socket.IO integration
- 📧 **Email Service**: Nodemailer with template engine
- 🚀 **Performance**: Redis caching
- 🧪 **Testing**: Jest configuration for unit and e2e tests
- 🔍 **Logging**: Winston logger
- ⚡ **Validation**: Class-validator and class-transformer
- 🔒 **Security**: Helmet, CORS, Rate limiting

## Technologies

- **Core**: NestJS, TypeScript
- **Database**: Prisma ORM
- **Authentication**: JWT
- **Real-time**: Socket.IO
- **API Documentation**: Swagger
- **Caching**: Redis
- **Email**: Nodemailer
- **Template Engine**: EJS
- **Testing**: Jest
- **Package Manager**: pnpm

## System Requirements

- Node.js (>= 18.x)
- pnpm (>= 8.x)
- Redis
- Database (PostgreSQL/MySQL)

## Installation

1. Clone repository:

```bash
git clone [repository-url]
cd nestjs-module-boilerplate
```

2. Install dependencies:

```bash
pnpm install
```

3. Configure environment:

```bash
cp .env.example .env
# Update environment variables in .env file
```

4. Run database migrations:

```bash
pnpm prisma migrate dev
```

## Development

After starting the development server with `pnpm run start:dev`, you can access:

- Main application: [http://localhost:3000](http://localhost:3000)
- API Documentation: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

The API documentation provides detailed information about all available endpoints, request/response schemas, and authentication requirements.

## Project Structure

```
src/
├── modules/                 # Feature modules
│   ├── auth/               # Authentication module
│   ├── users/              # Users module
│   └── [feature]/          # Other feature modules
├── shared/                 # Shared resources
│   ├── config/            # Configuration
│   ├── decorators/        # Custom decorators
│   ├── filters/           # Exception filters
│   ├── guards/            # Guards
│   ├── interceptors/      # Interceptors
│   ├── interfaces/        # Interfaces
│   ├── middleware/        # Middleware
│   ├── pipes/             # Custom pipes
│   └── utils/             # Utility functions
├── app.module.ts          # Root module
└── main.ts               # Application entry point
```

## Scripts

```bash
# Development
pnpm run start:dev

# Production
pnpm run start:prod

# Testing
pnpm run test
pnpm run test:e2e
pnpm run test:cov

# Linting
pnpm run lint

# Format code
pnpm run format
```

## Best Practices

1. **Module Organization**

   - Each feature should have its own module
   - Use shared module for common code
   - Follow Single Responsibility Principle

2. **Code Style**

   - Use TypeScript strict mode
   - Follow ESLint and Prettier rules
   - Write unit tests for business logic

3. **Security**

   - Validate all inputs
   - Use environment variables
   - Implement rate limiting
   - Enable CORS and Helmet

4. **Performance**
   - Use caching when necessary
   - Implement pagination for API endpoints
   - Optimize database queries

## Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add some amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Create Pull Request
