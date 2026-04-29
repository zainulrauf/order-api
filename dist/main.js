"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        exceptionFactory: (errors) => {
            const result = [];
            const extract = (error) => {
                if (error.constraints) {
                    result.push(...Object.values(error.constraints));
                }
                if (error.children && error.children.length) {
                    error.children.forEach(extract);
                }
            };
            errors.forEach(extract);
            return new common_1.BadRequestException({
                message: result.length ? result : 'Validation failed',
                error: 'Bad Request',
                statusCode: 400,
            });
        },
    }));
    app.enableCors({
        origin: 'http://localhost:3001',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        allowedHeaders: 'Content-Type, Authorization',
        credentials: true,
    });
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map