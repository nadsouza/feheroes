import psycopg2
from models import Match
 
def create_tables():
    """ create tables in the PostgreSQL database"""
    commands = (
        Match.create_schema(),
    )
    conn = None
    try:
        #Define our connection string
        conn_string = "dbname='postgres' host='k52n' user='postgres' port='5432'"

        # print the connection string we will use to connect
        print("Connecting to database ->%s" % (conn_string))

        # get a connection, if a connect cannot be made an exception will be raised here
        conn = psycopg2.connect(conn_string)

        cur = conn.cursor()
        # create table one by one
        for command in commands:
            cur.execute(command)
        # close communication with the PostgreSQL database server
        cur.close()
        # commit the changes
        conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()
 
 
if __name__ == '__main__':
    create_tables()