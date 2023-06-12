import csv
import sqlite3
from pathlib import Path
import datetime


path_to_db = Path('db.sqlite3')
conn = sqlite3.connect(path_to_db)
cur = conn.cursor()


path_to_data = Path('data', 'sku.csv')

with open(
    path_to_data,
    'r',
    encoding='UTF-8'
) as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    header = next(csv_reader)
    for row in csv_reader:
        cur.execute(
            "INSERT INTO orders_sku(sku_number,dimension_a,dimension_b,dimension_c) VALUES (?,?,?,?)",
            (
                str(row[1]),
                str(row[2]),
                str(row[3]),
                str(row[4]),
            )
        )
    conn.commit()


path_to_data = Path('data', 'carton.csv')

with open(
    path_to_data,
    'r',
    encoding='UTF-8'
) as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    header = next(csv_reader)
    for row in csv_reader:
        cur.execute(
            "INSERT INTO orders_carton(name,length,width,height) VALUES (?,?,?,?)",
            (
                str(row[0]),
                str(row[1]),
                str(row[2]),
                str(row[3]),
            )
        )
    conn.commit()
    
path_to_data = Path('data', 'data.csv')

with open(
    path_to_data,
    'r',
    encoding='UTF-8'
) as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    header = next(csv_reader)
    id = []
    for row in csv_reader:
        if str(row[2]) in id :
            continue
        else:
            cur.execute(
                "INSERT INTO orders_order(order_key) VALUES (?)",
                (
                    str(row[2]),
                )
            )
            id.append(str(row[2]))
    conn.commit()

path_to_data = Path('data', 'order_sku_amount.csv')

with open(
    path_to_data,
    'r',
    encoding='UTF-8'
) as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    header = next(csv_reader)
    for row in csv_reader:
        cur.execute(
            "INSERT INTO orders_skuinorderamount(order_id,sku_id,amount) VALUES (?,?,?)",
            (
                str(row[0]),
                str(row[1]),
                str(row[2]),
            )
        )
    conn.commit()
    
    
path_to_data = Path('data', 'order_sku_amount.csv')

with open(
    path_to_data,
    'r',
    encoding='UTF-8'
) as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    header = next(csv_reader)
    for row in csv_reader:
        cur.execute(
            "INSERT INTO orders_skuinorderamount(order_id,sku_id,amount) VALUES (?,?,?)",
            (
                str(row[0]),
                str(row[1]),
                str(row[2]),
            )
        )
    conn.commit()
