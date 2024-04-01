import { exec } from 'node:child_process'

// Название директорий
const fileManager = process.env.MANAGER_DIRECTORY

try {
  exec('npm run dev', { cwd: `./${fileManager}` })
  exec('npm run dev', { cwd: `./root` })
}
catch (e) {
  console.error('Ошибка при запуске dev режима')
  console.error(e)
  process.exit(1)
}
