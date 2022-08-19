import { Injectable } from '@angular/core';
import { DatabaseService } from 'src/app/Services/Database/database.service';
import { DatabaseModel } from '../Models/DatabaseModel';
import { ServerModel } from '../Models/ServerModel';


@Injectable({
    providedIn: 'root'
})

export class DatabaseProvider {
    database: DatabaseModel[] = [];

    constructor(private databaseService: DatabaseService) {
    }

    getDatabase(): void {
        this.databaseService.getDatabaseList().subscribe(
            (data) => {
                this.database = data as DatabaseModel[];
            }
        )
    }

    add(addDatabaseModel: DatabaseModel): void {
        this.databaseService.addDatabase(addDatabaseModel).subscribe(
            (data) => {
                if (!addDatabaseModel.Id) {
                    this.database.push(data as DatabaseModel);
                }
            }
        )
    }
}