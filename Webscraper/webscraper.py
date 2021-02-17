import requests
from bs4 import BeautifulSoup
import time
import psycopg2

time.sleep(5)

conn = psycopg2.connect(
        host="postgres",
        database="amddata",
        user="postgres",
        password="docker")

cur = conn.cursor()


def scrape():
    while True:
        r = requests.get("https://finance.yahoo.com/quote/AMD/")
        soup = BeautifulSoup(r.text, 'html.parser')
        try:
            price = soup.find_all('div',{'class':'My(6px) Pos(r) smartphone_Mt(6px)'})[0].find('span').text
        except:
            continue
        data = [int(time.time()), float(price)]
        cur.execute(f"""INSERT INTO data VALUES ({data[0]}, {data[1]})""")
        conn.commit()
        time.sleep(1)


def createtable():
    command = (
        """
        CREATE TABLE data (
            time INTEGER PRIMARY KEY,
            price FLOAT NOT NULL
        )
        """)
    cur.execute("select exists(select * from information_schema.tables where table_name=%s)", ('data',))
    exists = cur.fetchone()[0]
    if not exists:
        cur.execute(command)
        conn.commit()


if __name__ == '__main__':
    if conn != None:
        print("Connected Successfully")
    createtable()
    scrape()

        

