const fs = require('fs');
const path = require('path');

const targetPath = path.resolve('ohos_hap', 'web_engine', 'src', 'main', 'resources', 'resfile', 'resources', 'app');
if (!fs.existsSync(targetPath)) {
  fs.mkdirSync(targetPath, { recursive: true });
  console.log(`Created directory: ${targetPath}`);
}
if (fs.readdirSync(targetPath).length > 0) {
  fs.rmSync(targetPath, { recursive: true });
  console.log(`Removed directory: ${targetPath}`);
}

function deepCopy(source, target) {
  if (fs.statSync(source).isDirectory()) {
    fs.mkdirSync(target, { recursive: true });
    console.log(`Created directory: ${target}`);
    fs.readdirSync(source).forEach(file => {
      deepCopy(path.join(source, file), path.join(target, file));
    });
  } else {
    fs.copyFileSync(source, target);
    console.log(`Copied file: ${source} to ${target}`);
  }
}

deepCopy(path.resolve('dist_electron', 'mac-arm64', 'YesPlayMusic.app', 'Contents', 'Resources', 'app'), targetPath)
console.log('Done');