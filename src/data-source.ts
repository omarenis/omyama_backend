import "reflect-metadata";
import { DataSource } from "typeorm"
import * as path from "path";
import {PlatformTools} from "typeorm/platform/PlatformTools";

export const AppDataSource = new DataSource({
    type: "mysql",
    driver: PlatformTools.load('mysql2'),
    connectorPackage: 'mysql2',
    host: "db4free.net",
    port: 3306,
    username: "root_for_test_40",
    password: "Mysql1996@+=",
    database: "test_databse_400",
    synchronize: true,
    logging: false,
    entities: [path.join(__dirname, 'entity/*.ts')],
    migrations: [],
    subscribers: [],
})
export type ObjectType<T> = { new (): T } | Function;
