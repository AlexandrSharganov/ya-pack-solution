FROM python:3.8.10-slim

RUN mkdir /ds_models

COPY requirements.txt /ds_models

RUN python -m pip install --upgrade pip

RUN pip3 install -r /ds_models/requirements.txt --no-cache-dir

COPY . /ds_models

WORKDIR /ds_models

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8080"] 