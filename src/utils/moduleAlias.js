import moduleAlias from 'module-alias';
import path from 'path';

const root = path.resolve(__dirname, '../..');

moduleAlias.addAliases({
  '@src': path.join(root, 'src'),
  '@test': path.join(root, 'src'),
});
