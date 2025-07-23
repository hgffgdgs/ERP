#!/usr/bin/env node

import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
}

function log(color, message) {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

function checkFile(path, name) {
  if (existsSync(path)) {
    log('green', `✓ ${name} exists`)
    return true
  } else {
    log('red', `✗ ${name} missing`)
    return false
  }
}

function checkPackageJson() {
  try {
    const pkg = JSON.parse(readFileSync('package.json', 'utf8'))
    log('blue', '\n📦 Package Information:')
    log('green', `  Name: ${pkg.name}`)
    log('green', `  Version: ${pkg.version}`)
    log('green', `  Type: ${pkg.type || 'commonjs'}`)
    
    const requiredDeps = [
      'react',
      'react-dom',
      'react-router-dom',
      '@supabase/supabase-js',
      'tailwindcss',
      'typescript'
    ]
    
    log('blue', '\n📋 Dependencies Check:')
    requiredDeps.forEach(dep => {
      if (pkg.dependencies?.[dep] || pkg.devDependencies?.[dep]) {
        log('green', `  ✓ ${dep}`)
      } else {
        log('red', `  ✗ ${dep} missing`)
      }
    })
    
    return true
  } catch (error) {
    log('red', '✗ Error reading package.json')
    return false
  }
}

function checkEnvFile() {
  log('blue', '\n🔧 Environment Configuration:')
  
  if (existsSync('.env.local')) {
    log('green', '  ✓ .env.local exists')
    try {
      const env = readFileSync('.env.local', 'utf8')
      const hasSupabaseUrl = env.includes('VITE_SUPABASE_URL=')
      const hasSupabaseKey = env.includes('VITE_SUPABASE_ANON_KEY=')
      
      if (hasSupabaseUrl) log('green', '  ✓ Supabase URL configured')
      else log('yellow', '  ⚠ Supabase URL needs configuration')
      
      if (hasSupabaseKey) log('green', '  ✓ Supabase key configured')
      else log('yellow', '  ⚠ Supabase key needs configuration')
      
    } catch (error) {
      log('red', '  ✗ Error reading .env.local')
    }
  } else {
    log('yellow', '  ⚠ .env.local missing (copy from .env.example)')
  }
}

function main() {
  log('blue', '🔍 African ERP Setup Check\n')
  
  log('blue', '📁 File Structure:')
  const files = [
    ['package.json', 'Package configuration'],
    ['vite.config.ts', 'Vite configuration'],
    ['tailwind.config.js', 'Tailwind configuration'],
    ['tsconfig.json', 'TypeScript configuration'],
    ['src/main.tsx', 'Main entry point'],
    ['src/App.tsx', 'App component'],
    ['index.html', 'HTML template']
  ]
  
  let allFilesExist = true
  files.forEach(([path, name]) => {
    if (!checkFile(path, name)) {
      allFilesExist = false
    }
  })
  
  checkPackageJson()
  checkEnvFile()
  
  log('blue', '\n🚀 Next Steps:')
  if (!existsSync('.env.local')) {
    log('yellow', '  1. Copy .env.example to .env.local')
    log('yellow', '  2. Configure your Supabase credentials')
  }
  log('green', '  3. Run: npm install')
  log('green', '  4. Run: npm run dev')
  
  if (allFilesExist) {
    log('green', '\n🎉 Setup looks good! You\'re ready to start developing.')
  } else {
    log('red', '\n❌ Some files are missing. Please check your setup.')
  }
}

main()