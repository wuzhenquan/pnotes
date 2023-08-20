https://youtu.be/l-kE11fhfaQ?t=570

> 💬 write a Dockerfile for nodejs application

得到结果后，你甚至可以继续问你不懂的部分。

比如，我对结果中的 Dockerfile 中的代码 `WORKDIR` 不了解是什么意思，那我可以问 ⬇️

> explain exactly what WORKDIR directive means in dockerfile

ChatGPT 会 Explains it with an example

接下来我想 use yarn instead of npm

> use yarn instead of npm

其中有一条命令是 `COPY ./app` ，它会将所有的文件都复制到 docker image 中。但其实我不想要 copy 所有文件（比如 `.gitignore` `node_modules` `tests` ），现在我想要求 ChatGPT 只 copy relevant files。

> now only copy relevant application files, not everything to the app images.

会发现 Dockerfile 里的这一行 `COPY ./app` 变成了 `COPY ./app --exclude-from=.dockerignore`

接下来我想 use multi-stage builds

> use multi-stage build

接下来我想优化一下

> adjust the multi-stage build to use yarn, exclude app files from dockerignore file when copying them into docker image and provide docker command examples with a specific image tag of 1.0