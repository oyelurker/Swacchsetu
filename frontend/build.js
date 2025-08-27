const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m'
};

console.log(`${colors.blue}Starting SwacchSetu build process...${colors.reset}`);

try {
  // Clean previous build
  console.log(`${colors.yellow}Cleaning previous build...${colors.reset}`);
  if (fs.existsSync(path.join(__dirname, 'dist'))) {
    fs.rmSync(path.join(__dirname, 'dist'), { recursive: true, force: true });
  }

  // Install dependencies
  console.log(`${colors.yellow}Installing dependencies...${colors.reset}`);
  execSync('npm install', { stdio: 'inherit' });

  // Build the project
  console.log(`${colors.yellow}Building project...${colors.reset}`);
  execSync('npm run build', { stdio: 'inherit' });

  console.log(`${colors.green}Build completed successfully!${colors.reset}`);
  console.log(`${colors.blue}The build is ready in the dist folder.${colors.reset}`);
  console.log(`${colors.blue}You can deploy this folder to any static hosting service.${colors.reset}`);
} catch (error) {
  console.error(`${colors.red}Build failed:${colors.reset}`, error);
  process.exit(1);
}