import execa from 'execa'
import PackageManager from '../packageManager'

class Homebrew extends PackageManager {
    alias: string = 'brew'
    name: string = 'Homebrew'
    path: string = '/usr/local/bin/brew'

    /**
     * Uninstall a package. In case of brew, the cask variable should be true of it ain't a formula but a cask.
     *
     * @param pkg
     * @param cask
     */
    async install(pkg: string, cask: boolean = false): Promise<boolean> {
        let args: string[] = ['install', pkg]

        if (cask) {
            args = ['cask', 'install', pkg]
        }

        const {stdout} = await execa('brew', args)

        return stdout.includes(pkg)
    }

    /**
     * Uninstall a package. In case of brew, the cask variable should be true of it ain't a formula but a cask.
     *
     * @param pkg
     * @param cask
     */
    async uninstall(pkg: string, cask: boolean = false): Promise<boolean> {
        let args: string[] = ['remove', pkg]

        if (cask) {
            args = ['cask', 'remove', pkg]
        }

        const {stdout} = await execa('brew', args)

        return stdout.includes(pkg)
    }

    /**
     * Check if the pkg is installed.
     *
     * @param pkg
     */
    async packageIsInstalled(pkg: string): Promise<boolean> {
        const {stdout} = await execa('brew', ['list', '--formula'])

        return stdout.includes(pkg)
    }

    remove(pkg: string): Promise<boolean> {
        return Promise.resolve(false)
    }

    update(): Promise<boolean> {
        return Promise.resolve(false)
    }

    upgrade(pkg: string | undefined): Promise<boolean> {
        return Promise.resolve(false)
    }
}

export default Homebrew