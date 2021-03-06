import {writeFileSync} from 'fs'
import redisConf from '../templates/redis'
import Service from './service'

class Redis extends Service {
    requireRoot = false
    service = 'redis'

    // TODO: These paths should be using the Client class. Otherwise they won't work cross platform.
    configPath = '/usr/local/etc/redis.conf'

    configure = async (): Promise<boolean> => {
        await writeFileSync(this.configPath, redisConf)
        return true
    }

}

export default Redis