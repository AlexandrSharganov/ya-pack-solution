FROM python:3.8.10-slim


COPY . .

RUN pip3 install -r requirements.txt --no-cache-dir

WORKDIR /yapack

CMD ["gunicorn", "yapack.wsgi:application", "--bind", "0:8000"]

# CMD ["python", "manage.py", "runserver", "0:8000"] 