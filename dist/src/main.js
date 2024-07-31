"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = bootstrap;
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        const configService = app.get(config_1.ConfigService);
        const port = 9000;
        //app.useGlobalPipes(new ValidationPipe({}));
        const config = new swagger_1.DocumentBuilder()
            .addBearerAuth() // this decorator specifies the Bearer Authentication security mechanism for the API documentation
            .setTitle('Query Utility System')
            .setDescription('The Query Utility System OpenAPI description.')
            .setVersion('v1.0')
            .addTag('swagger-documentation')
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup('api', app, document);
        yield app.listen(5019).then(() => {
            console.log(`Application listening for HTTP request on port:5019 ...`);
        });
    });
}
bootstrap();
