## Description

A DataQuery Application developed with NestJS, Postgres Relational Database, TypeORM Object Relational Mapper, TypeScript

## Installation

```bash
$ npm install
```

After successful installation and setting the necessary environment variables in your .env file the Application listens for HTTP requests on the port you have specified in the .env (make sure to rename the sample.env file).

A POST endpoint has been created in the controllers to help persist the data in the sample-data.ts file in your database.

The OpenAPI documentation will be available at the address `localhost:your-port/api`. There you can test the functionality of the application and make your search/ queries.

This query application accepts a number of query parameters, while some are compulsory others are not:

- limit (compulsory), sample: limit=3
- page (compulsory), sample: page=0
- sort (not compulsory), sample sort= id:asc
- filters (not compulsory), sample filters= name:like:Conference
- example query url:`localhost:5000/api/rooms?page=0&sort=capacity:asc&filters=name:like:Conference&limit=5`

The maximum number of returned items have been pegged to 5

## Running the app

```bash
# development
$ npm run start:dev

# watch mode
$ npm run start:dev

```

## Support

This Author is open to job offers.

## Stay in touch

- Author - [Abdulrafiu Kehinde Lawal](https://github.com/kennie-larkson)
- LinkedIn - [Abdulrafiu Kehinde Lawal](https://linkedin.com/in/kennie-larkson)
- Hashnode - [Abdulrafiu Kehinde Lawal](https://kehindelawal-articles.hashnode.dev/)
- Twitter - [@kennie_larkson](https://twitter.com/kennie_larkson)
