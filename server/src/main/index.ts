import { Option, Rester } from '@iinfinity/rester';
import { Statistic } from './entity';
import PATH from './router';
import { statistic } from './ware';

/** Option. */
const option: Option = {
  address: {
    portocol: 'HTTP',
    host: '0.0.0.0',
    port: 8080,
    proxy: true, // In proxy mode or not
    ssl: {
      cert: 'CERT CONTENT',
      key: 'KEY CONTENT'
    }
  },
  database: {
    type: 'postgres',
    host: 'app-postgres',
    port: 5432,
    username: 'app',
    password: 'app',
    database: 'app',
    synchronize: true,
    logging: true,
    entities: [
      Statistic
    ],
    migrations: [],
    subscribers: []
  },
  router: {
    static: { // Backend static html page
      path: 'client'
    },
    paths: PATH
  },
  session: {
    domain: '',
    name: 'session.id',
    expire: 24 * 3600,
    redis: {
      host: 'app-redis',
      port: 6379
    },
    secert: ['rester', 'server']
  }
};

const server = new Rester(option);
// Use example statistic middleware
server.use({ statistic });

server.listen();
