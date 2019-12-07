import * as SQLite from 'expo-sqlite';

export default class Database {
    static db = SQLite.openDatabase("wajda_dawid_4ic2.db");

    static createTable() {
        this.db.transaction(tx => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS table1 (id integer primary key not null, time text, turn text, days text);"
            );
        });
    }

    static add(time, turn, days) {
        this.db.transaction(tx => {
            tx.executeSql(
                `INSERT INTO table1 (time, turn, days) values ('${time}', '${turn}', '${days}');`
            )
        });
    }

    static getAll() {
        const query = "SELECT * FROM table1;";
        return new Promise((resolve, reject) => this.db.transaction((tx) => {
            tx.executeSql(query, [], (tx, results) => {
                resolve(JSON.stringify(results));
            }, function (tx, error) {
                reject(error);
            });
        }))
    }

    static remove(id) {
        this.db.transaction(tx => {
            tx.executeSql(
                `DELETE FROM table1 WHERE (id = ${id});`
            )
        })
    }

    static removeAll() {
        this.db.transaction(tx => {
            tx.executeSql(
                "DELETE FROM table1 ;"
            );
        });
    }
}

