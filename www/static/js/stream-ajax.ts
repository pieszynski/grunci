
module Ajax {

    export interface IStreamAjaxCallback {
        (...arguments : any[]) : void;
    }

    export class StreamAjax {

        private _url : string;
        private _method : string;
        private _onError : IStreamAjaxCallback;
        private _onProgress : IStreamAjaxCallback;
        private _onSuccess : IStreamAjaxCallback;

        private static NopFunc() : void {}

        constructor(url : string, method? : string) {

            this._method = method || 'post';
            this._url = url;

            this._onError = StreamAjax.NopFunc;
            this._onProgress = StreamAjax.NopFunc;
            this._onSuccess = StreamAjax.NopFunc;

        }

        public error(callback : IStreamAjaxCallback) : StreamAjax {

            this._onError = callback;

            return this;

        }

        public progress(callback : IStreamAjaxCallback) : StreamAjax {

            this._onProgress = callback;

            return this;

        }

        public success(callback : IStreamAjaxCallback) : StreamAjax {

            this._onSuccess = callback;

            return this;

        }

        public execute(data? : any) : StreamAjax {

            var _this = this;
            var xhr = new XMLHttpRequest();
            xhr.open(this._method, this._url, true);
            xhr.onerror = function () {

                _this._onError.apply(this, arguments);

            };
            xhr.onprogress = function () {

                _this._onProgress.apply(this, arguments);

            };
            xhr.onreadystatechange = function () {

                if (4 === this.readyState)
                    _this._onSuccess.apply(this, arguments);

            };

            // ToDo: Convert "data" to send() parameter
            xhr.send();

            return this;
        }

        public static post(url : string, data? : any) : StreamAjax {

            var response : StreamAjax = new StreamAjax(url);

            return response.execute(data);

        }

    }
}
