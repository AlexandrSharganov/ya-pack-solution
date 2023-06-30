# ya-pack-solution


## how to start backend

### 1 Установить интерпретатор python
- [Ссылка на установку](https://www.python.org/ftp/python/3.8.10/python-3.8.10-amd64.exe)
- ПРИ УСТАНОВКЕ ПОСТАВИТЬ ГАЛОЧКУ НА ПЕРВОМ ЭКРАНЕ УСТАНОВЩИКА "Добавить в PATH"
- Перезагрузить комп

### 2 Клонировать репозиторий

### 3 В окне терминала переключиться на папку backend

### 4 Выполнить поочереди следующие комманды
```
python -m venv venv

source venv/Scripts/activate

python -m pip install --upgrade pip

pip install -r requirements.txt

```
### 5 Перейти в папку yapack в которой есть файл manage.py и выполнить команду
```
python manage.py runserver
```
- тестовая база данных уже заполнена и прикреплена, все миграции выполнены
### Данные админки
- пользователь: admin
- пароль: 123


