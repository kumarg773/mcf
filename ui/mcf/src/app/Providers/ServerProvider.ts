import { Injectable } from '@angular/core';
import { ServerService } from 'src/app/Services/Server/server.service';
import { ServerModel } from '../Models/ServerModel';


@Injectable({
    providedIn: 'root'
})

export class ServerProvider {
    server: ServerModel[] = [];

    constructor(private serverService: ServerService) {
    }

    getServers(): void {
        this.serverService.getServerList().subscribe(
            (data) => {
                this.server = data as ServerModel[];
            }
        )
    }

    addServer(addServerModel: ServerModel): void {
        this.serverService.addServer(addServerModel).subscribe(
            (data) => {
                if (!addServerModel.Id) {
                    this.server.push(data as ServerModel);
                }
            }
        )
    }
}