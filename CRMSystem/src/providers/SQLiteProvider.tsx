import {useCallback, useEffect} from 'react';
import SQLite, {SQLiteDatabase} from 'react-native-sqlite-storage';
import {useBoolean} from '../hooks/use-boolean';
import MainLoading from '../ui/components/MainLoading';

declare global {
  var db: SQLiteDatabase;
}

type Props = {
  children: React.JSX.Element;
};

// This will initialize the db and allow it to accessed globally
const SQLiteProvider = (props: Props) => {
  const {isTrue, onFalse, onTrue} = useBoolean(false);

  // Function to create customer table if not exist
  const createCustomerTableIfNotExist = useCallback(
    async (db: SQLiteDatabase) => {
      await db.executeSql(`
      CREATE TABLE IF NOT EXISTS customers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        contactDetails TEXT,
        status TEXT
      );
    `);
    },
    [],
  );

  // Function to create opportunity table if not exist
  const createOpportunityTableIfNotExist = useCallback(
    async (db: SQLiteDatabase) => {
      await db.executeSql(`
      CREATE TABLE IF NOT EXISTS opportunities (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customerId INTEGER,
        name TEXT,
        status TEXT,
        FOREIGN KEY(customerId) REFERENCES customers(id)
      );
    `);
    },
    [],
  );

  useEffect(() => {
    if (!global.db) {
      global.db = SQLite.openDatabase(
        {name: 'crm-system'},
        async db => {
          try {
            await Promise.all([
              createCustomerTableIfNotExist(db),
              createOpportunityTableIfNotExist(db),
            ]);
            onTrue();
          } catch (e) {
            // Proper error handler need to be added.
            console.log(e);
            onFalse();
          }
        },
        e => {
          // Proper error handler need to be added.
          console.log(e);
          onFalse();
        },
      );
      SQLite.enablePromise(true);
      SQLite.DEBUG(__DEV__);
    }
  }, []);

  const {children} = props;
  return isTrue ? children : <MainLoading label="Initializing the db..." />;
};

export default SQLiteProvider;
