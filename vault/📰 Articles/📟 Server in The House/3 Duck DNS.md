---
date: "20240322"
draft: false
---
# Dynamic IP Solutions - Duck DNS Setup

My home server’s public IP address changes over time. Therefore, I decided to use the DDNS service to track my server’s public IP should it change. To avoid the need to track changing IP addresses manually.

I found that Duck DNS is free and easy to set up. The installation was completed in just ten minutes from scratch.

## Step 1: Creating a Duck DNS account

Go to https://www.duckdns.org and sign in.

![duck dns home page](https://i.imgur.com/DzY8lFF.png)

## Step 2: Create a subdomain name

Think of your own subdomain name, and then click the "add domain" button. (The following screenshot shows an example of the subdomain named "myhomeserver".)


![domain add](https://i.imgur.com/o8nFqHJ.png)

## Step 3: Create a script

Create directory `~/duckdns` and file `~/duckdns/duck.sh` : 
```sh
mkdir ~/duckdns
cd ~/duckdns
touch duck.sh
```

Actually, I would like to put this script at `~/usr/local/bin/duckdns/duck.sh`. But for a simpler demonstration, I will use `~/duckdns/duck.sh` instead.

![duck update script](https://i.imgur.com/BpJBdN3.png)
## Step 4: Edit the script

Visit the [Duck DNS - install](https://www.duckdns.org/install.jsp) webpage, sign in, and click the "choose subdomain" to select a subdomain of you choice.

![sumdomain](https://i.imgur.com/wvLW1Wt.png)

Next, copy the provided code from the webpage [Duck DNS - install](https://www.duckdns.org/install.jsp),  paste it into the `~/duckdns/duck.sh` file, and then save the file.

![update script](https://i.imgur.com/GJ0zg6z.png)

## Step 5: Make the script executable

Run the following command on your home server to make `~/duckdns/duck.sh` executable:

```sh
chmod 700 ~/duckdns/duck.sh
```

## Step 6: Run and Test the script 

Run the script:

```sh
~/duckdns/duck.sh
```

Test the script:

```sh
cat ~/duckdns/duck.log
```
 
 If the output contains `OK`, the public IP has been successfully updated on Duck DNS.
 
 ![](https://i.imgur.com/EjBw61E.png)

## Step 7: use cron to run the script automatically

Run the following command to edit the cron file:

```sh
crontab -e
```

It will open the default text editor with the contents of your user's crontab file.

Add the code below: 

```sh
*/5 * * * * ~/duckdns/duck.sh >/dev/null 2>&1
```

Save and exit the file after making your changes. Now, the `~/duckdns/duck.sh` file will be scheduled to run every 5 minutes.

## Summary

Below are the brief steps outlined previously:
1. Create a DuckDNS account.
2. Create update script `~/duckdns/duck.sh`.
3. Use cron utility to run the update script automatically.

## Troubleshooting VPN Connection Issues

I have set up a VPN on my home server before, then I noticed that the updated IP on my Duck DNS account does not match my actual public IP. This is because the Duck DNS API request is proxied through my VPN service. Configuring the proxy rules should solve the issue.

Here’s a solution for my [ShellCrash](https://github.com/juewuy/ShellCrash) service:
1. Edit the Crash configuration file `config.yaml`.
2. Insert `DOMAIN-SUFFIX,duckdns.org,DIRECT` below the `rules:` line, then save the file and exit. ![Screenshot of Clash configuration file](https://i.imgur.com/U7iWnib.png)
## Q & A

Q: What is DNS?
A: It's an internet's phonebook. Translate domain names into static IP addresses.

Q: What is DDNS?
A: It's also an internet's phonebook. But the IP address is frequently auto changing.

Q: What is a subdomain?
A: The `duckdns.com` is a root domain. The `myhomeserver.duckdns.com` is a subdomain for `duckdns.com`.

Q: What is cron?
A: It's a Linux utility used to run scripts at scheduled times.