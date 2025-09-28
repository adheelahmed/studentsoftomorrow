const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3000;
const dotenv = require('dotenv')
dotenv.config()

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use('/projects', express.static(path.join(__dirname, 'views/projects')));

app.get('/', (req, res) => {
  const projectsDir = path.join(__dirname, 'views/projects');
  
  try {
    const studentFolders = fs.readdirSync(projectsDir).filter(f => 
      fs.lstatSync(path.join(projectsDir, f)).isDirectory()
    );
    
    const students = studentFolders.map(folder => {
      try {
        const readmeJsonPath = path.join(projectsDir, folder, 'readme.json');
        
        if (!fs.existsSync(readmeJsonPath)) {
          console.warn(`Missing readme.json for ${folder}`);
          return null;
        }
        
        const projectData = JSON.parse(fs.readFileSync(readmeJsonPath, 'utf8'));
        
        if (!projectData.studentName || !projectData.projectTitle) {
          console.warn(`Invalid project data for ${folder}: missing required fields`);
          return null;
        }
        
        let projectUrl, isExternal;
        if (projectData.isUrl === false) {
          projectUrl = `/projects/${folder}/index.html`;
          isExternal = false;
        } else {
          projectUrl = projectData.isUrl.startsWith('http') ? projectData.isUrl : `https://${projectData.isUrl}`;
          isExternal = true;
        }
        
        return {
          folder: folder,
          ...projectData,
          initials: projectData.studentName.split(' ').map(n => n[0]).join('').toUpperCase(),
          projectUrl: projectUrl,
          isExternal: isExternal,
          onclickHandler: isExternal ? `window.open('${projectUrl}', '_blank')` : `window.location.href='${projectUrl}'`
        };
      } catch (error) {
        console.error(`Error reading project data for ${folder}:`, error.message);
        return null;
      }
    }).filter(student => student !== null);
    
    const shuffledStudents = students.sort(() => Math.random() - 0.5);
    
    res.render('index', { students: shuffledStudents,inDev:process.env.inDev });
  } catch (error) {
    console.error('Error reading projects directory:', error);
    res.render('index', { students: [],inDev:process.env.inDev });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});