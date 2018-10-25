##### 安装 Node.js

1.安装 Node.js

   https://github.com/nodesource/distributions 

	```
	# Using Ubuntu
	curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
	sudo apt-get install -y nodejs
	```

   2. in order for some `npm` packages to work (such as those that require compiling code from source), you will need to install the `build-essential` package(我现在故意没装，看看会不会发生什么问题)

  ```
  sudo apt-get install build-essential
  ```

   3. install [PM2](https://pm2.io/), which is a process manager for Node.js applications.

  ```
  sudo npm install -g pm2
  ```

   4. `pm2 start hello.js`

   5. 修改 Nginx configuration `sudo nano /etc/nginx/sites-available/default`

      ```
      location / {
              proxy_pass http://localhost:8080;
              proxy_http_version 1.1;
              proxy_set_header Upgrade $http_upgrade;
              proxy_set_header Connection 'upgrade';
              proxy_set_header Host $host;
              proxy_cache_bypass $http_upgrade;
          }
      ```
    6. 重启 nginx `sudo systemctl restart nginx` 或者 `service nginx restart`

##### 安装 mongodb

https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/
https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-16-04
安装后启动 mongodg `sudo systemctl start mongod` 遇到了这个问题 

```
Failed to start mongod.service: Unit mongod.service not found.
```
解决方法 https://askubuntu.com/questions/770054/mongodb-3-2-doesnt-start-on-lubuntu-16-04-lts-as-a-service

- 启动 mongo:`sudo systemctl start mongod`

- 查看 mongo 运行状态: `sudo systemctl status mongod`




​      

[How To Install Node.js on Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-16-04)

[How To Set Up a Node.js Application for Production on Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04)

