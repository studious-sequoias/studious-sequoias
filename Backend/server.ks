Sun Dec 11 17:44:50 PST 2016 : [33m[nodemon] 1.11.0[39m
Sun Dec 11 17:44:50 PST 2016 : [33m[nodemon] to restart at any time, enter `rs`[39m
Sun Dec 11 17:44:51 PST 2016 : [33m[nodemon] watching: *.*[39m
Sun Dec 11 17:44:51 PST 2016 : [32m[nodemon] starting `node server.js`[39m
Sun Dec 11 17:44:51 PST 2016 : { Error: ENOENT: no such file or directory, open '.env'
Sun Dec 11 17:44:51 PST 2016 : at Error (native)
Sun Dec 11 17:44:51 PST 2016 : at Object.fs.openSync (fs.js:640:18)
Sun Dec 11 17:44:51 PST 2016 : at Object.fs.readFileSync (fs.js:508:33)
Sun Dec 11 17:44:51 PST 2016 : at Object.config (/Users/Usman/Desktop/studious-sequoias/Backend/node_modules/dotenv/lib/main.js:30:37)
Sun Dec 11 17:44:51 PST 2016 : at Object.<anonymous> (/Users/Usman/Desktop/studious-sequoias/Backend/server.js:7:19)
Sun Dec 11 17:44:51 PST 2016 : at Module._compile (module.js:570:32)
Sun Dec 11 17:44:51 PST 2016 : at Object.Module._extensions..js (module.js:579:10)
Sun Dec 11 17:44:51 PST 2016 : at Module.load (module.js:487:32)
Sun Dec 11 17:44:51 PST 2016 : at tryModuleLoad (module.js:446:12)
Sun Dec 11 17:44:51 PST 2016 : at Function.Module._load (module.js:438:3)
Sun Dec 11 17:44:51 PST 2016 : at Module.runMain (module.js:604:10)
Sun Dec 11 17:44:51 PST 2016 : at run (bootstrap_node.js:394:7)
Sun Dec 11 17:44:51 PST 2016 : at startup (bootstrap_node.js:149:9)
Sun Dec 11 17:44:51 PST 2016 : at bootstrap_node.js:509:3 errno: -2, code: 'ENOENT', syscall: 'open', path: '.env' }
Sun Dec 11 17:44:51 PST 2016 : Yay, Node server is listening!
Sun Dec 11 17:44:51 PST 2016 : connection error: { MongoError: failed to connect to server [localhost:27017] on first connect
Sun Dec 11 17:44:51 PST 2016 : at Pool.<anonymous> (/Users/Usman/Desktop/studious-sequoias/Backend/node_modules/mongodb-core/lib/topologies/server.js:313:35)
Sun Dec 11 17:44:51 PST 2016 : at emitOne (events.js:96:13)
Sun Dec 11 17:44:51 PST 2016 : at Pool.emit (events.js:188:7)
Sun Dec 11 17:44:51 PST 2016 : at Connection.<anonymous> (/Users/Usman/Desktop/studious-sequoias/Backend/node_modules/mongodb-core/lib/connection/pool.js:271:12)
Sun Dec 11 17:44:51 PST 2016 : at Connection.g (events.js:291:16)
Sun Dec 11 17:44:51 PST 2016 : at emitTwo (events.js:106:13)
Sun Dec 11 17:44:51 PST 2016 : at Connection.emit (events.js:191:7)
Sun Dec 11 17:44:51 PST 2016 : at Socket.<anonymous> (/Users/Usman/Desktop/studious-sequoias/Backend/node_modules/mongodb-core/lib/connection/connection.js:165:49)
Sun Dec 11 17:44:51 PST 2016 : at Socket.g (events.js:291:16)
Sun Dec 11 17:44:51 PST 2016 : at emitOne (events.js:96:13)
Sun Dec 11 17:44:51 PST 2016 : at Socket.emit (events.js:188:7)
Sun Dec 11 17:44:51 PST 2016 : at emitErrorNT (net.js:1276:8)
Sun Dec 11 17:44:51 PST 2016 : at _combinedTickCallback (internal/process/next_tick.js:74:11)
Sun Dec 11 17:44:51 PST 2016 : at process._tickCallback (internal/process/next_tick.js:98:9)
Sun Dec 11 17:44:51 PST 2016 : name: 'MongoError',
Sun Dec 11 17:44:51 PST 2016 : message: 'failed to connect to server [localhost:27017] on first connect' }
