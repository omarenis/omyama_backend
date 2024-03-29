import "reflect-metadata";
import { DataSource } from "typeorm"
import * as path from "path";
import {PlatformTools} from "typeorm/platform/PlatformTools";

export const AppDataSource = new DataSource({
    type: "mysql",
    driver: PlatformTools.load('mysql2'),
    connectorPackage: 'mysql2',
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Mysql1996@+=Mysql1996@+=",
    database: "test",
    synchronize: true,
    logging: false,
    entities: [path.join(__dirname, 'entities/*.ts'), path.join(__dirname, 'entities/**/*.ts')],
    migrations: [],
    subscribers: [],
})
