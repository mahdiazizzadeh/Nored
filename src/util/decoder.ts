class Decoder {
    private result: string = "";
    private response: any = [];
    private error: any = false;


    get getResponse() { return this.response };
    get getError() { return this.error };

    decodeResult(data: string): any {
        this.result = data;

        const firstByte: string = data.slice(0, 1);

        switch (firstByte) {
            case "+":
                this.simpleString();
                break;

            case "-":
                this.respError();
                break;

            case ":":
                this.respInteger();
                break;

            case "$":
                this.bulkString();
                break;

            case "*":
                this.respArray();
                break;

            default: this.error = null; this.response = null;
                break;
        }
    }

    private simpleString() {
        this.error = null;
        this.response = this.result.slice(1);
    }

    private respError() {
        this.error = {
            error: true,
            errorMessage: this.result.slice(1)
        }
        this.response = null;
    }

    private respInteger() {
        this.error = null;
        this.response = +this.result.slice(1);
    }

    private bulkString() {
        const bulkString = this.result.split("\r\n");
        bulkString.pop();
        if (bulkString[0] === "$-1") {
            this.error = null;
            this.response = null;
        } else {
            bulkString.shift();
            this.error = null;
            this.response = bulkString.shift();
        }
    }

    private respArray() {
        this.response = [];
        const arr = this.result.split("\r\n");
        arr.pop();
        if (+arr[0].slice(1) === 0 || +arr[0].slice(1) === -1) {
            this.error = null;
            this.response = null;
        } else {
            for (let i = 1; i < arr.length && this.response.length < +arr[0].slice(1); i++) {
                if (arr[i].slice(0, 3) === "$-1") {
                    this.response.push(null);
                } else if (arr[i].slice(0, 1) === ":") {
                    this.response.push(+arr[i].slice(1));
                } else if (arr[i].slice(0, 1) === "+") {
                    this.response.push(arr[i].slice(1));
                }
                else if (arr[i].slice(0, 1) === "-") {
                    this.response.push({ error: true, errorMessage: arr[i].slice(1) });
                }
                else if (arr[i + 1] === undefined) break;
                else this.response.push(arr[++i]);
            }
        }
    }
}

export default Decoder;
