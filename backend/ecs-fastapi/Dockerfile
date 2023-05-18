FROM python:3.7.5

WORKDIR /app
COPY . /app

RUN pip install cmake
RUN pip install uvicorn
RUN pip install -r requirements.txt

#CMD ["python3", "-u", "-m", "flask", "run", "--host=0.0.0.0"]
CMD ["uvicorn", "main:app", "--reload", "--host=0.0.0.0", "--port=5000"]
