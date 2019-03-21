from abc import ABC, abstractmethod
from enum import Enum

_head = _attr = 0
_tail = _type = 1
_row = lambda f, t : f.format(t[_head][_attr], t[_head][_type])

def sumdict(table):
    """
    Map the schema dict item to a SQL query string. It must validate that each
    key is a string and each value is in the SQLTypes enum. Each attribute must
    be delimited by a comma except for the last attribute,
    """
    if len(table) == 1:
        return _row("{} {}", table)
    return _row("{} {},", table) + sumdict(table[_tail:])


class SQLTypes(Enum):
    """
    This is a non exhaustive list of sql key types that are used in the 
    database. It is represented by an enumeration as it allows for future
    validation of the keys (which are final).
    """
    primary_key = 'serial primary key'
    foreign_key = 'foreign key'
    integer = 'integer'
    # varchar is non-unique due to being a function, it has no 'value' attr.
    varchar = lambda maxlen : "varchar({})".format(maxlen)

    
    def __str__(self):
        return self.value if hasattr(self, 'value') else self



class Model(ABC):
    """
    Model is an abstract class, all subclasses require a schema field. It can 
    construct a create table schema for a model so long as that model 
    implements the schema field with fields from the SQLTypes enum.
    """
    def __init__(self):
        pass

    @property
    @staticmethod
    @abstractmethod
    def schema():
        raise NotImplementedError

    @property
    @staticmethod
    @abstractmethod
    def tablename():
        raise NotImplementedError

    @classmethod
    def table_prototype(cls):
        query = "create table if not exists {} (".format(cls.tablename)

        table_schema = cls.schema
        query += sumdict([ (k, v) for k, v in table_schema.items() ])

        query += ")"
        return query




class Match(Model):
    """
    This is the top level model that describes any match on a given day.
    """
    tablename = 'matches'
    schema = {
        'id': SQLTypes.primary_key,
        'home_team': SQLTypes.varchar(20),
        'away_team': SQLTypes.varchar(20),
        'win': SQLTypes.integer,
        'draw': SQLTypes.integer,
        'loss': SQLTypes.integer,
        'home_score': SQLTypes.integer,
        'away_score': SQLTypes.integer,
    }