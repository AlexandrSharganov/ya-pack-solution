FROM python:3.8-slim

RUN mkdir /yapack

COPY requirements.txt /yapack

RUN pip3 install -r /yapack/requirements.txt --no-cache-dir

COPY yapack/ /yapack

WORKDIR /yapack

CMD ["gunicorn", "yapack.wsgi:application", "--bind", "0:8000" ] 