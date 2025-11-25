const fs = require('fs');
const path = require('path');

// 프로젝트 루트 경로 (한글 경로 문제 해결)
const projectRoot = path.resolve(__dirname);
const iconPath = path.join(projectRoot, 'src', 'assets', 'Icon');

// 피그마 아이콘 이름 매핑
const mappings = {
  // Home 아이콘
  'Property 1=Default.png': 'Home-Default.png',
  'Property 1=Click.png': 'Home-Click.png',
  
  // Gym 아이콘
  'Property 1=Default-1.png': 'Gym-Default.png',
  'Property 1=Click-1.png': 'Gym-Click.png',
  
  // Link 아이콘
  'Property 1=Default-2.png': 'Link-Default.png',
  'Property 1=Click-2.png': 'Link-Click.png',
  
  // My 아이콘
  'Property 1=Default-3.png': 'My-Default.png',
  'Property 1=Click-3.png': 'My-Click.png',
  
  // Back 아이콘
  'Property 1=Default-4.png': 'Back-Default.png',
  'Property 1=Hover.png': 'Back-Hover.png',
  
  // Check 아이콘
  'Property 1=Default-5.png': 'Check-Default.png',
  'Property 1=Click-4.png': 'Check-Click.png',
  
  // Map 아이콘
  'Property 1=Default-6.png': 'Map-Default.png',
  'Property 1=Click-5.png': 'Map-Click.png',
  
  // Report 아이콘
  'Property 1=Default-7.png': 'Report-Default.png',
  'Property 1=Click-6.png': 'Report-Click.png',
  
  // Location 아이콘
  'Property 1=Default-8.png': 'Location-Default.png',
  'Property 1=Hover-1.png': 'Location-Hover.png',
  
  // Delete 아이콘
  'Property 1=Default-9.png': 'Delete-Default.png',
  'Property 1=Hover-2.png': 'Delete-Hover.png',
  
  // Search 아이콘
  'Property 1=Gray.png': 'Search-Gray.png',
  'Property 1=Black.png': 'Search-Black.png',
  
  // Copy 아이콘
  'Property 1=Default-10.png': 'Copy-Default.png',
  'Property 1=Hover-3.png': 'Copy-Hover.png',
  
  // Route 아이콘
  'Property 1=Default-11.png': 'Route-Default.png',
  'Property 1=Click-7.png': 'Route-Click.png',
};

// 파일명 변경 실행
let successCount = 0;
let failCount = 0;

Object.entries(mappings).forEach(([oldName, newName]) => {
  const oldPath = path.join(iconPath, oldName);
  const newPath = path.join(iconPath, newName);
  
  if (fs.existsSync(oldPath)) {
    try {
      // 새 파일명이 이미 존재하는지 확인
      if (fs.existsSync(newPath)) {
        console.log(`⚠ Skipped: ${newName} already exists`);
        failCount++;
        return;
      }
      
      fs.renameSync(oldPath, newPath);
      console.log(`✓ ${oldName} -> ${newName}`);
      successCount++;
    } catch (error) {
      console.error(`✗ Error renaming ${oldName}:`, error.message);
      failCount++;
    }
  } else {
    console.log(`⚠ File not found: ${oldName}`);
    failCount++;
  }
});

console.log(`\nRenaming complete!`);
console.log(`✓ Success: ${successCount}`);
console.log(`✗ Failed/Skipped: ${failCount}`);

