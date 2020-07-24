require('dotenv').config(); // loads environment variables from a .env file
import config from 'config'; // gets data from the root config folder https://github.com/lorenwest/node-config/wiki
import * as Joi from '@hapi/joi';

const _buildAndVerifyConfigFromYml = (ymlSection, joiSchema) => {
    const configFromYml = config.get(ymlSection);
    const { error, value: envValues } = joiSchema.validate(configFromYml);
    if (error) {
        console.error(`[config] Environment variable error: ${error.message}`);
        process.exit(1);
    }
    return envValues;
};

// Config objects

export const databaseConfig = _buildAndVerifyConfigFromYml(
    'database',
    Joi.object({
        postgres: Joi.object({
            host: Joi.string().required(),
            port: Joi.number().required(),
            username: Joi.string().required(),
            password: Joi.string().required(),
            database: Joi.string().required(),
        }),
    }).required(),
);

export const apiConfig = _buildAndVerifyConfigFromYml(
    'api',
    Joi.object({
        env: Joi.string().required(),
        version: Joi.string().required(),
        http: Joi.object({
            port: Joi.number().required(),
        }).required(),
        auth: Joi.object({
            'jwt-signature': Joi.string().required(),
        }).required(),
    }).required(),
);

export const servicesConfig = _buildAndVerifyConfigFromYml(
    'services',
    Joi.object({
        elastic: Joi.object({
            'apm-url': Joi.string(),
            'apm-secret': Joi.string(),
        }).allow(null),
    }).required(),
);
