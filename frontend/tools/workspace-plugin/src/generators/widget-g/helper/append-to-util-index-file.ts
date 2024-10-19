import { Tree, joinPathFragments } from '@nx/devkit'; // Import strings for string manipulation
import { IWidgetSchema } from '../schema';
import * as fs from 'fs'; // Use Node.js fs module to read file from file system
import * as path from 'path';

/**
 * Appends import and export statements to the index.ts file at specified comment locations,
 * using the content from a template file (sample.txt).
 *
 * @param tree - The virtual file system tree.
 * @param directoryPath - The path to the directory containing index.ts.
 * @param schema - The schema object containing pageName and other relevant data.
 */
export function appendToUtilIndexFile(tree: Tree, directoryPath: string, schema: IWidgetSchema) {
  const indexPath = joinPathFragments(directoryPath, 'index.ts');
  const templatePath = path.join(__dirname, 'sample.txt'); // Path to the template file

  // Check if index.ts exists
  if (!tree.exists(indexPath)) {
    throw new Error(`index.ts does not exist at path: ${indexPath}`);
  }

  // Read the existing content of index.ts
  const indexContentBuffer = tree.read(indexPath);
  if (!indexContentBuffer) {
    throw new Error(`Failed to read index.ts at path: ${indexPath}`);
  }
  const indexContent = indexContentBuffer.toString('utf-8');

  // Read the template content using fs instead of tree.read
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template file does not exist at path: ${templatePath}`);
  }

  const templateContent = fs.readFileSync(templatePath, 'utf-8');

  // Replace the template placeholders manually
  const renderedTemplate = replacePlaceholders(templateContent, schema.pageName);

  // Extract the content between /*--import--*/ and /*--end import--*/ from the rendered template
  const importSection = extractSection(renderedTemplate, 'import');
  const exportSection = extractSection(renderedTemplate, 'export');

  // Split the index content into lines for easier manipulation
  const lines = indexContent.split('\n');

  // Insert the import section
  const importInserted = insertSection(lines, 'import', importSection);

  // Insert the export section
  const exportInserted = insertSection(lines, 'export', exportSection);

  // If both insertions were successful, write the updated content back to index.ts
  if (importInserted || exportInserted) {
    const updatedContent = lines.join('\n');
    tree.write(indexPath, updatedContent);
  } else {
    throw new Error('Failed to find the import/export markers in index.ts');
  }
}

/**
 * Replaces placeholders in the template content using schema values.
 *
 * @param template - The template content.
 * @param pageName - The pageName value to use for replacements.
 * @returns The rendered template content.
 */
function replacePlaceholders(template: string, pageName: string): string {
  return template
    .replace(/<%= pageName %>/g, pageName)
    .replace(/<%= pageName.toUpperCase\(\) %>/g, pageName.toUpperCase());
}

/**
 * Extracts the content between the start and end markers in a template.
 *
 * @param content - The content to extract from.
 * @param section - The section type ('import' or 'export').
 * @returns The extracted content.
 */
function extractSection(content: string, section: 'import' | 'export'): string[] {
  const startMarker = `/*--${section}--*/`;
  const endMarker = `/*--end ${section}--*/`;

  const startIndex = content.indexOf(startMarker);
  const endIndex = content.indexOf(endMarker);

  if (startIndex !== -1 && endIndex !== -1) {
    return content
      .slice(startIndex + startMarker.length, endIndex)
      .trim()
      .split('\n');
  }

  throw new Error(`Failed to extract ${section} section from template`);
}

/**
 * Inserts the section content below the respective comment in the index file, preserving indentation.
 *
 * @param lines - The lines of the destination file.
 * @param section - The section type ('import' or 'export').
 * @param sectionContent - The content to insert.
 * @returns True if the insertion was successful, false otherwise.
 */
function insertSection(lines: string[], section: 'import' | 'export', sectionContent: string[]): boolean {
  const marker = `/*--${section}--*/`;
  const index = lines.findIndex((line) => line.includes(marker));

  if (index !== -1) {
    // Determine the indentation of the marker
    const markerLine = lines[index];
    const indentation = markerLine.match(/^\s*/)?.[0] || '';

    // Apply the same indentation to each line of the section content
    const indentedSectionContent = sectionContent.map((line) => `${indentation}${line}`);

    // Insert the indented content after the marker
    lines.splice(index + 1, 0, ...indentedSectionContent);
    return true;
  }

  return false;
}
