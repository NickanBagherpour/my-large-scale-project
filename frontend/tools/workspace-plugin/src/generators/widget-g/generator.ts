import {
  formatFiles,
  generateFiles,
  joinPathFragments,
  names,
  readNxJson,
  readProjectConfiguration,
  Tree,
} from '@nx/devkit';

import { Linter } from '@nx/linter';
import { libraryGenerator } from '@nx/react';

import { IWidgetSchema } from './schema';
import { appendToUtilIndexFile } from './helper/append-to-util-index-file';

export async function widgetGenerator(tree: Tree, schema: IWidgetSchema) {
  const NxJsonConf = readNxJson(tree);

  const projectName = schema.project || schema.portalName || NxJsonConf?.defaultProject || '';

  const projConf = readProjectConfiguration(tree, projectName);

  if (projConf.projectType !== 'application') {
    throw new Error('Project is not an application!');
  }
  if (!schema.name.endsWith('widget')) {
    schema.name = schema.name + '-widget';
  }

  schema.pageName = schema.name.replace('-widget', '');
  schema.shortPortalName = schema.portalName.replace(/-portal$/, '');

  
  const a = await libraryGenerator(tree, {
    // projectNameAndRootFormat: 'derived',
    name: schema.name,
    // pascalCaseFiles: false,
    directory: `libs/${schema.shortPortalName}/widgets/${schema.name}`,
    linter: Linter.EsLint,
    style: 'styled-components',
    unitTestRunner: 'jest',
    skipPackageJson: true,
    importPath: `@oxygen/${schema.shortPortalName}/widgets/${schema.name}`,
  });

  // const libName = `widgets-${schema.name}`;
  const libName = `${schema.name}`;

  const libraryRoot = readProjectConfiguration(tree, libName).root;

  deleteDefaultLibFolder(tree);

  generateFiles(
    tree, // the virtual file system
    joinPathFragments(__dirname, './files'), // path to the file templates
    // joinPathFragments('libs/'), // destination path of the files
    libraryRoot, // destination path of the files
    {
      ...schema,
      ...names(schema.name),
      constantName: names(schema.name).constantName.replace(/_widget$/i, ''),
      pageName: schema.pageName.replace(/_widget$/i, ''),
      tmpl: '',
    } // config object to replace variable in file templates
  );
  await formatFiles(tree);

  const defaultProjectPagePath = `${projConf.root}/src/app/(dashboard)`;

  generateFiles(
    tree, // the virtual file system
    joinPathFragments(__dirname, './page-files'), // path to the file templates
    // joinPathFragments('libs/'), // destination path of the files
    defaultProjectPagePath, // destination path of the files
    {
      ...schema,
      ...names(schema.name),
      tmpl: '',
    } // config object to replace variable in file templates
  );

  const utilsLibRQKPath = `libs/utils/src/lib/react-query-keys`;

  generateFiles(
    tree, // the virtual file system
    joinPathFragments(__dirname, './utils-rqk-files/widgets'), // path to the file templates
    // joinPathFragments('libs/'), // destination path of the files
    `${utilsLibRQKPath}/widgets`, // destination path of the files
    {
      ...schema,
      ...names(schema.name),
      constantName: names(schema.name).constantName.replace(/_widget$/i, ''),
      pageName: schema.pageName.replace(/_widget$/i, ''),
      tmpl: '',
    } // config object to replace variable in file templates
  );

  appendToUtilIndexFile(tree, utilsLibRQKPath, schema);
  
  return () => {
    // installPackagesTask(tree);
  };
}

function deleteDefaultLibFolder(tree: Tree) {
  const findDefaultCreatedFilePaths = tree
    .listChanges()
    .filter(({ path }) => path.includes('/lib/'))
    .map(({ path }) => path);

  findDefaultCreatedFilePaths.forEach((path) => tree.delete(path));
}

export default widgetGenerator;
