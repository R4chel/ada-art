function Connection(on_data){
    this.serial = new p5.SerialPort();
    this.latestData = "waiting for connection";
    
    this.gotData = function(){
        let currentString = this.serial.readLine();
        trim(currentString);
        if (!currentString) return;
        this.latestData = currentString;
        on_data(this.latestData);
    }
        
    this.serverConnected = function() {
        print("Connected to Server");
    }

    this.gotList = function(thelist) {
        print("List of Serial Ports:");

        for (let i = 0; i < thelist.length; i++) {
            print(i + " " + thelist[i]);
        }
    }

    this.gotOpen = function() {
        print("Serial Port is Open");
    }

    this.gotClose = function () {
        print("Serial Port is Closed");
        this.latestData = "Serial Port is Closed";
    }

    this.gotError = function(theerror) {
        console.log("error:", theerror);
        print(theerror);
    }
}

var connectionSetup = function(connection, port){
    connection.serial.list();
    connection.serial.open(port);
    connection.serial.on("connected", () => connection.serverConnected());
    connection.serial.on("list", (thelist) => connection.gotList(thelist));
    connection.serial.on("data", () => connection.gotData() );
    connection.serial.on("error", (theerror) => connection.gotError(theerror) );
    connection.serial.on("open", () => connection.gotOpen());
    connection.serial.on("close", () => connection.gotClose());
}
