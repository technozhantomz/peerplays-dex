Bitshares-UI
============================================

### EN: Instruction:

For a start you have to clone the repository.
You can do it via command line:

``git clone https://bitbucket.org/graphenelab/bitshares.git``

in case you have a bitbucket account:

``git clone https://<account name>@bitbucket.org/graphenelab/bitshares.git``

After this a folder with the project will be created. You’ll have to execute several commands there:

``npm install``

this command allows to install required packages and project’s dependencies (information for the installation will be contained in package.json)

``npm start``

this command will launch webpack build (utility for building the project) and local dev server with the https:// protocol. It is available via https://localhost:8080 address.

``npm run dev``

this command will launch webpack build (utility for building the project) and local dev server (available via https://localhost:8080 address).

The project was installed. You can see it via https://localhost:8080 address in any browser.

### You may counter the following problems:

* if the execution of `git clone` command failed you’ll have to install the latest version of [GIT](https://git-scm.com/) first.

* if the `npm install` command doesn’t work, it means you don’t have Node.js v.8.11 which contains package manager npm. You’ll have to download the distributive and Node.js and install them.

* during the `npm install` command execution there may be errors caused by the absence of the node-gyp package, which is necessary for the updating of the project’s dependencies and solving problems of the Unix systems compatibility. To solve this problem you’ll have to install [Python v.2.7.14](https://www.python.org/downloads/) on your local machine.
 
### RUS: Инструкция по развертыванию:

Для начала необходимо склонировать репозиторий.
Это можно сделать командой из консоли (командной строки):

``git clone https://bitbucket.org/graphenelab/bitshares.git``

если есть учетная запись:

``git clone https://<имя аккаунта>@bitbucket.org/graphenelab/bitshares.git``

После исполнения команды у вас создастся папка с проектом, внутри которой нобходимо выполнить несколько команд:

``npm install``

эта команда позволит скачать пакеты и установить все зависимости проекта (информацию для установки берет из файла package.json)

``npm start``

эта команда запустит сборку webpack (утилита для сборки проекта) и локальный dev сервер c https:// протоколом, доступный по адресу https://localhost:8080

``npm run dev``

эта команда запустит сборку webpack (утилита для сборки проекта) и локальный dev сервер, доступный по адресу http://localhost:8080

В целом, проект готов к работе.
Необходимо зайти в браузер и перейти по ссылке, чтобы увидеть развернутый проект.

### Возможные проблемы при установке:

* если команда `git clone` так же не прошла, требуется установить [GIT](https://git-scm.com/).

* если команда `npm install` не воспринимается командной строкой, значит на компьютере отсутствует предустановленная Node.js версии 8.11 stable, в которой так же поставляется и пакетный менеджер npm. Необходимо скачать дистрибутив и установить [Node.js](https://nodejs.org/en/download/), следуя указаниям установщика.

* во время исполнения команды `npm install` могут возникнуть ошибки, связанные с отсутствующим пакетом node-gyp, который необходим для обновления некоторых нужных проекту зависимостей и устранения проблем с совместимостью систем Unix. Для устранения требуется иметь на машине, на которой разворачивается проект, установленный [Python версии 2.7.14](https://www.python.org/downloads/)
