是一个：web server software


Nginx 可以用来做什么：
- Web Server
- [[正向代理和反向代理#反向代理 reverse proxy|反向代理]] 
- 负载均衡（Load Balancer）
- HTTP Cache
- Security
- SSL/TLS
- Mail Proxy
- Media Streaming

# Installation

[How To Install Nginx on Ubuntu 22.04](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-22-04) 

# 命令：

- 查看版本：`./nginx -v`
- 启动：`./nginx`
- 关闭：`./nginx -s stop`(推荐) 或 `./nginx -s quit`
- 重新加载 nginx 配置：`./nginx -s reload`

# 配置文件

consists of three sections:

- Global Block (Main Context):
- Events Block (Events Context):
- Http Block (Http Context):

# 语法

```nginx.conf
server {
    listen 80;
    server_name example.com;
	location = / {
		root /var/www/example;
		index index.html;
	}
}
```

# The `location` directive in NGINX

The syntax is as follows:

```nginx.conf
#modifier 可以是 =, ^~, ~, ~*
location [modifier] /uri/ {  }
```

```nginx.conf
server {
    listen 80;
    server_name example.com;
	#精确匹配 (exact match)
	location = /specific-path/ {
        alias /var/www/specific;
    }
	#前缀匹配 (prefix match)
    location ^~ /assets/ {
        root /var/www/example;
        expiry 30d;
    }
    #区分大小写 (case-sensitive regular expression match)
    location ~ \.(gif|jpg|png)$ {
        root /var/www/images;
    }
	#不区分大小写(case-insensitive regular expression match)
	location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
        root /var/www/static;
    }
}
```








