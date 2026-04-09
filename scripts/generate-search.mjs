import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'content');
const outputFile = path.join(process.cwd(), 'public', 'search-index.json');

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    if (fs.statSync(path.join(dirPath, file)).isDirectory()) {
      arrayOfFiles = getAllFiles(path.join(dirPath, file), arrayOfFiles);
    } else if (file.endsWith('.md')) {
      arrayOfFiles.push(path.join(dirPath, file));
    }
  });

  return arrayOfFiles;
}

const generateIndex = () => {
  const files = getAllFiles(contentDir);
  const searchIndex = files.map((filePath) => {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(fileContent);
    
    // كيهز اللغة والتصنيف والـ slug من مسار الملف
    // مثلا: content/ar/tools/my-article.md
    const relativePath = path.relative(contentDir, filePath).replace(/\\/g, '/');
    const [lang, category, fileName] = relativePath.split('/');
    const slug = fileName.replace('.md', '');

    return {
      title: data.title,
      description: data.description || '',
      url: `/${lang}/${category}/${slug}`,
      lang: lang,
      category: category
    };
  });

  fs.writeFileSync(outputFile, JSON.stringify(searchIndex, null, 2));
  console.log('✅ Search index generated successfully!');
};

generateIndex();