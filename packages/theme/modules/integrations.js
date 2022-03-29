import { resolve, join } from 'path';
import { readdirSync, statSync } from 'fs';

export default function () {
  this.nuxt.hook('build:before', () => {
    const folder = resolve(__dirname, '../integrations');
    const files = readdirSync(folder);

    files.forEach((file) => {
      const filename = resolve(folder, file);
      const stat = statSync(filename);

      if (stat.isFile()) {
        const { dst } = this.addTemplate(filename);
        this.options.plugins.push(join(this.options.buildDir, dst));
      }
    });
  });
}

