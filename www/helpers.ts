
/// <reference path="./../tsd/node.d.ts"/>

module Helpers {

    export interface IPlainCallback {
        (callback : () => void) : void;
    }

    export interface IFileSystem {

        exists(path: string, callback?: (exists: boolean) => void): void;
        readdir(path: string, callback?: (err: NodeJS.ErrnoException, files: string[]) => void): void;
        readFile(filename: string, callback: (err: NodeJS.ErrnoException, data: Buffer) => void ): void;
        readFile(filename: string, encoding: string, callback: (err: NodeJS.ErrnoException, data: string) => void ): void;

    }

    export interface IPath {

        normalize(p: string): string;
        resolve(...pathSegments: any[]): string;

    }

    export interface IRouteMethod {

        (req : any, res : any, next : any) : void;

    }

    export interface IExpressBase {

        use(fn : any);
        get(route : any, fn : IRouteMethod);
        post(route : any, fn : IRouteMethod);
        all(fn : IRouteMethod);
        all(fn : IExpressRouter);
        all(route : any, fn : IRouteMethod);
        all(route : any, router : IExpressRouter);

    }

    export interface IExpress extends IExpressBase {

        disable(option : string);
        listen(port : number, fn : any);

    }

    export interface IExpressRouter extends IExpressBase {}

    export interface IConfig {

        port : number;
        goAway : string;
        projects : string;

    }

    export class Node {

        private static _express : any = require('express');
        private static _fs : IFileSystem = require('fs');
        private static _path : IPath = require('path');
        private static _compression : any = require('compression');

        public static GetFileSystem() : IFileSystem {

            return Node._fs;

        }

        public static GetFullPath(relativePath : string) : string {

            var p = Node._path.resolve(relativePath);
            return p;
        }

        public static NormalizePath(givenPath : string) : string {

            var p = Node._path.normalize(givenPath);
            return p;
        }

        public static GetExpress() : IExpress {

            var express = Node._express;
            return express();

        }

        public static GetExpressRouter() : IExpressRouter {

            var router = Node._express.Router();
            return router;

        }

        public static UseExpressCompression() : any {

            return Node._compression();

        }

        public static UseExpressStatic(relativePath : string) : any {

            return Node._express.static(__dirname + relativePath);

        }
    }

    export class SimpleAsync {

        private _count : number;
        private _actions : IPlainCallback[];
        private _callback : any;

        private tryFinnish() : void {

            this._count--;

            if (this._count == 0)
                this._callback();

        }

        constructor(callback : any) {

            this._count = 0;
            this._actions = [];
            this._callback = callback;

        }

        public Push (action : IPlainCallback) : void {

            this._count++;
            this._actions.push(action);

        }

        public Start() {

            for(var i = 0; i < this._actions.length; i++)
                this._actions[i](() => this.tryFinnish());

        }
    }

    export class Log {

        public static info(...args : any[]) : boolean {

            console.log.apply(console, arguments);

            return true;

        }

        public static error(err : NodeJS.ErrnoException, ...args : any[]) : boolean {

            console.log.apply(console, arguments);

            return true;

        }
    }
}
