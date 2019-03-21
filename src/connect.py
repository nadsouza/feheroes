import psycopg2
import sys


def main():
    #Define our connection string
    conn_string = "dbname='postgres' host='k52n' user='postgres' port='5432'"

    # print the connection string we will use to connect
    print("Connecting to database\n	->%s" % (conn_string))

    # get a connection, if a connect cannot be made an exception will be raised here
    conn = psycopg2.connect(conn_string)
    
    # conn.cursor will return a cursor object, you can use this cursor to perform queries
    cursor = conn.cursor()

    print("Cursor connected!")

    # execute our Query
    cursor.execute("select tablename from pg_catalog.pg_tables WHERE schemaname = 'public'")

    # retrieve the records from the database
    records = cursor.fetchall()

    # print out the records using pretty print
    # note that the NAMES of the columns are not shown, instead just indexes.
    # for most people this isn't very useful so we'll show you how to return
    # columns as a dictionary (hash) in the next example.
    print(records)

    colnames = [desc[0] for desc in cursor.description]
    print(colnames)

if __name__ == "__main__":
    main()
