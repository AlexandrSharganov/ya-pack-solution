# ya-pack-solution


## how to start backend

### 1 Установить интерпретатор python
- [Ссылка на установку](https://www.python.org/ftp/python/3.8.10/python-3.8.10-amd64.exe)
- ПРИ УСТАНОВКЕ ПОСТАВИТЬ ГАЛОЧКУ НА ПЕРВОМ ЭКРАНЕ УСТАНОВЩИКА "Добавить в PATH"
- Перезагрузить комп

### 2 Клонировать репозиторий

### 3 Переключиться на ветку backend

### 4 В окне терминала переключиться на папку backend

### 5 Выполнить поочереди следующие комманды
```
python -m venv venv

source venv/Scripts/activate

python -m pip install --upgrade pip

pip install django==3.2

pip install djangorestframework==3.12

pip install drf_yasg

pip install django-cors-headers

```

### 6 Перейти в папку yapack в которой есть файл manage.py и выполнить команду
```
python manage.py runserver
```


## Не забывайте находясь в папке backend выполнять команду:
```
source venv/Scripts/activate
```
## Чтобы в терминале рядом с ником юзера была надпись - (venv)


### Коммит