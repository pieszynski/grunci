
/// <reference path="./../tsd/node.d.ts"/>

module Controllers {

    export class Global {

        //constructor() {}

        public register(router : any) : void {

        }

        public execute(req : any, res : any, fallback : any) : void {

            fallback();

        }

    }

}

