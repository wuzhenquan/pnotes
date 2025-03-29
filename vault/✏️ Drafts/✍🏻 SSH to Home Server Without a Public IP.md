---
draft: "true"
---
# SSH to Home Server Without a Public IP

Create Cloudflare Tunnel to my home server make me ssh to my home server without a Public IP. Just type `ssh <my_specify_ssh_domain_name>` (such as `ssh ssh.zhenquan.me`) . Then you ssh to the home server right now. It's free.
But free tools also bring some little trouble, it's now as fast and low 延时 as directly ssh to public IP. If you have a static public IP, sure you just use the ssh with Pubic IP way. But if my home server don't have a static public IP, it is dynamic. So it's another way to ssh my home server conveniently if I don't mind the network fast.

This article will introduce how to ssh to my home server with cloudflare tunnel.
my home server system: Ubuntu 22.04
## Create a Cloudflare Tunnel 

1. log in https://dash.cloudflare.com/
2. click zero trust → Networks → Tunnels → Click the button "Create a tunnel"
	![create tunnel button map](https://i.imgur.com/ZsWdwrs.png)
3. Select tunnel type -- 'Cloudflared'
	![select tunnel type](https://i.imgur.com/Mfg4zQ8.png)
4. **Name your tunnel**
	![Name your tunnel](https://i.imgur.com/4vclFo6.png)
5. **Save your Tunnel**
	![save you tunnel](https://i.imgur.com/iP5GUUy.png)
## Install tunnel connector in you home server

1️⃣ Install the Connector -- [[Cloudflared]]
1. Create Directory for Keyrings
	```sh
	sudo mkdir -p --mode=0755 /usr/share/keyrings
	```
2. Download and Save the GPG Key:
	```sh
	curl -fsSL https://pkg.cloudflare.com/cloudflare-main.gpg | sudo tee /usr/share/keyrings/cloudflare-main.gpg >/dev/null
	```
3. Add to apt repositories
```sh
echo "deb [signed-by=/usr/share/keyrings/cloudflare-main.gpg] https://pkg.cloudflare.com/cloudflared $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/cloudflared.list
```
4. Update Package List and Install cloudflared:
	```sh
	sudo apt-get update && sudo apt-get install cloudflared
	```


2️⃣ run Cloudflared
I directly copied the code indicated by the arrow in the following screenshot and ran it on my home server.
![install and run a connector](https://i.imgur.com/C1oOao4.png)




## Add a public hostname

My configuration: public host name: `ssh.zhenquan.me`,  Service Type → `SSH`, Service URL  → `localhost: 22`

Edit my tunnel: zero trust → Networks → Tunnels → Edit tunnel
![view tunnel info](https://i.imgur.com/lW4S4JT.png)

Add a public hostname
![add public host button](https://i.imgur.com/2XL0ll3.png)

Fill public hostname for my tunnel and save it
![fill public hostname](https://i.imgur.com/yxXpB4G.png) 

## Add my SSH Web Application
![click add application](https://i.imgur.com/Ggu2P82.png)
Select "Self hosted"
![select self hosted](https://i.imgur.com/TrEz0KN.png)
fill 
	![fill](https://i.imgur.com/lSbxCkH.png)

scroll down to bottom ,click next
![scroll down to bottom, click next](https://i.imgur.com/4mWzWsB.png)

Add my policy
![add my policy](https://i.imgur.com/cgMH6RQ.png)

Scroll down to "configure rules"
![scroll down to "configure rules"](https://i.imgur.com/85Ei5GA.png)

Click next and then scroll down to bottom and then click "click add application"
![](https://i.imgur.com/QtV7tma.png)
![](https://i.imgur.com/XjY5mnp.png)

# Open my terminal to connect it
1️⃣ Install `cloudflared` on macOS
`brew install cloudflared`
2️⃣ Get the path of `cloudflared` → `/opt/homebrew/bin/cloudflared` → run `which cloudflared`
3️⃣ Configure your SSH configuration file 👉🏻 `~/.ssh/config`
`vim ~/.ssh/config`
```
Host ssh.example.com
ProxyCommand /opt/homebrew/bin/cloudflared access ssh --hostname %h
```



## Last word
via the dashboard is the simplest way. If you want to mange many tunnels and hostnames. Via the configuration file way is a better choice.