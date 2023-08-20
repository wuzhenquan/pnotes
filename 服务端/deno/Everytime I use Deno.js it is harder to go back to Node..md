https://www.reddit.com/r/node/comments/xumtg9/everytime_i_use_denojs_it_is_harder_to_go_back_to/

A lot of devs think that Deno does not bring much to the table which is actually not true. The usecase for Deno is getting stronger release after release. I have been using Deno professionally in my team for quite some time and everytime I work in a Deno project it gets harder and harder to get back to Node.js because Deno is actually a significant upgrade over Node.js.

Deno is batteries included and has a very big standard library (heavily inspired by golang), great web compatibility API support, compiles to binary (like golang), less need for third-party npm libraries for everything etc.

Basically, if you use Deno then you get below for free:

1] Deno **runs Typescript files without needing ANY extra** library/installation/package.json .... nothing. Just execute "deno run file.ts" and you are good to go.

2] **No need to install and configure Eslint** as deno comes with linter baked in.

3] **No need to install and configure prettier** as deno comes with formatter baked in exactly like in Golang.

4] **No need to setup tsconfig and configure eslint/prettier/TS** to work well in harmony as Deno does all of this for you without needing any dev to create a single config file which you need to do in Node.js ecosystem. All the errors are just hidden behind Deno errors and not one line showing three errors "eslint", "prettier" and "TS error" which is prevalent in Node.js codebase. You only see "Deno" error be it formatting, linting or TS as everything is deeply integrated in Deno and abstracted from developer.

5] **No need to install jest** (or mocha/chai/sinon) as Deno comes with all the bells and whistles to do proper testing which requires third party modules in Node.js world.

6] **No need to install nodemon** as "deno watch" will already do the reloading for you on flie changes and run typescript files directly.

7] **No need to install ts-node/ts-jest** and configure it to make typescript tests work well with jest as deno inbuilt testing covers all of that for you.

8] **No need to install [socket.io](https://socket.io/) or any websocket library** like you do in Node.js as Deno comes with built in support for websocket. [In Node.js there is no inbuilt support for websocket.](https://github.com/nodejs/node/issues/19308)

9] **No need to install commander npm module** (for the most part) like you need in Node.js as Deno already supports confirm/prompt and all the api's which browsers already supports.

10] Deno compiles to single executable binary with "deno compile" command (again exactly like golang) so containarising deno apps is extremely easy and its perfectly suitable to create CLI apps as you can easily distribute the binary and no extra need to install anything on the user device. In Node.js you would need to install either "nexe" or "pkg" third party module and configure them to achieve the same which deno compile give you for free out of the box.

11] **Top level await, fetch etc**. just works. In Node.js fetch API (similar to browser) is added but to use top level await a file extension needs to be either ".mjs (or .mts)" or one needs to create a package.json file in the same folder where the file with top level await exists and add "type": "module" entry in package.json if you don't want to use .mjs extension.

12] **Web API compatibality** with as many of the same API's which work in browser (including localstorage/sessionStorage/crypto etc.) and has kept the same function signature in Deno.js where as in Node.js either many of those web api have no equivalent and don't exist or they need a lot of workaround to get it implemented (ex renaming to ".mjs" to get top level await working or their difficulties implementing proper "ESM" support etc.)

13] **import works smoothly** and no messing with module/common.js resolutions etc.

14] **ALL the Deno api's are modern** and built with async/await from the ground's up so no need for "fs/promises" or "promisify" anything. Moreover, all the api's feel very modern in syntax and easier to use than Node equivalent including their http server, reading from command line etc.

15] *Recently Deno announced that "**the next release of Deno will include a new HTTP server. It is the fastest JavaScript web server ever built.**" So Deno.js HTTP server will be faster and lighter than Node.js and Bun.js according to them. Source* [*here*](https://deno.com/blog/changes) *on their official blog post.*

16] *In the same update they also mentioned "**We've been working on some updates that will allow Deno to easily import npm packages and make the vast majority of npm packages work in Deno within the next three months".** *Source* [*here*](https://deno.com/blog/changes) *on their official blog post.*

17] Their latest [release](https://deno.com/blog/v1.26) comes with bunch of performance improvements, npm compatibility, improved DX, [Cache API](https://developer.mozilla.org/en-US/docs/Web/API/Cache) implementation in Deno as well and support for latest typescript. so they are very exciting.

18] [Deno deploy](https://deno.com/deploy) and their support for cloud/edge function looks pretty sleek to get up and running quickly without much effort.



There are more nitty-gritties but the above are the high level list of what I think Deno.js brings to the table based on my usage and they are NOT AT ALL minor improvements. The fastest/lightest HTTP flash server from Deno alone would be a HUGE bump for so many projects let alone everything else it brings to the table.

Have you guys tried Deno and if yes what was your experience.