import { exec as nodeExec } from 'node:child_process'
import fs from 'node:fs'
import util from 'node:util'

const exec = util.promisify(nodeExec)

// Название директорий
const fileManager = process.env.MANAGER_DIRECTORY

// Запускаем билды в репозиториях
try {
  await exec('npm run build', { cwd: `./${fileManager}` })
  console.log('Успешный билд file-manager')
}
catch (e) {
  console.error('Ошибка при сборке билда')
  console.error(e)
  process.exit(1)
}

// Переносим билд в root
try {
  // Очищаем директорию билда
  fs.rmSync('./root/dist', { recursive: true, force: true })

  // Создаем необходимые директории
  if (!fs.existsSync('./root/dist')) fs.mkdirSync('./root/dist')

  // Переносим main файл
  fs.cpSync(`./${fileManager}/dist/manager.js`, './root/dist/manager.js')

  // Переносим assets
  fs.cpSync(`./${fileManager}/dist/assets`, './root/dist/assets', { recursive: true })

  console.log('Файлы успешно перенесы в root репозиторий')
}
catch (e) {
  console.error('Ошибка при переносе файлов билда')
  console.error(e)
  process.exit(1)
}
