---
date: "20231201"
publish: true
---
# WSL 2 Setup for SSH Remote Access
 
[WSL 2](https://en.wikipedia.org/wiki/Windows_Subsystem_for_Linux#WSL_2) is an abbreviation for [Windows Subsystem for Linux](https://en.wikipedia.org/wiki/Windows_Subsystem_for_Linux). Using WSL 2 for development would be a good way to ensure a stable environment. If you want to try WSL as a mini Linux server, this article might serve as a guide for you.

## Reinstalling SSH

### Uninstall and Reinstall SSH

- Uninstall: `sudo apt remove openssh-server`
- Reinstall: `sudo apt install openssh-server`

### Configuring SSH

- Open SSH config file: `sudo vi /etc/ssh/sshd_config`
- Change `#Port 22` to `Port 22` to enable the default port.
- Change `#PasswordAuthentication yes` to `PasswordAuthentication yes` to enable password authentication.

### Restarting the SSH Service

```shell
sudo service ssh restart
```

### Testing SSH Connection

```shell
sudo service ssh restart
```

## Setting Up Port Forwarding for Remote Access

### Run Network Shell Port Forwarding Command

What we need to do is to configure the Windows system to listen on a specific port and redirect incoming traffic from that port to a different port. Run the following command in PowerShell. 
```powershell
netsh interface portproxy add v4tov4 `
  listenaddress=<windows_host_ip> `
  listenport=<your_windows_listen_port_number> ` # Any unused port number
  connectaddress=<wsl_internal_ip> `
  connectport=<ssh_service_port_number>
```

### Questions and Answers

Q: Why is setting up port forwarding on Windows necessary?
A: 
	- Because the WSL 2 VM has its own separate network adapter. 
	- Because the WSL 2 VM IP address is only reachable from the Windows host machine, not reachable from other devices on your local network.
	- Because the network settings and IP addresses you see on the Windows vEthernet adapter associated with WSL 2 are not exposed to the local network through the same subnet as your physical network.

Q: How to find my Windows IP address?
A: 
	Open PowerShell and run the command `ipconfig`. Look for the `IPv4 Address` associated with your active network adapter.
 
Q: Do you have any listen port number suggestion?
A:
	Port `2222` can be used an example for SSH or other services, though you may select any available port number above `1024` and below `65535` to avoid conflicts with system and well-know ports.

Q: How to find my WSL Internal IP?
A:
	1. Open your WSL terminal.
	2. Run the command `ip addr | grep eth0` .
	3. Look for the network interface (usually `eth0`) and note the IP address following `inet`.

## Enabling Inbound Rules for SSH in Windows Firewall

After setting up port forwarding, it will expose a service running on a private network to a public network. The Windows Firewall will protect its system and network by controlling inbound and outbound network traffic. So the Windows Fire wall is not configured to allow incoming connection on the port you're forwarding. 

Run the following command in PowerShell to enable Inbound Rules within the port:
```powershell
netsh advfirewall firewall add rule `
name="<any_name>" `
dir=in `
action=allow `
protocol=TCP `
localport=<your_windows_listen_port_number>
```

Explanation:
	- `name=WSL2` is the rule name. You can rename as needed.
	- `dir=in` specifies the **dir**ection of the rule as **in**bound, meaning it allows connections from outside into the local machine.
	- `action=allow` specifies the action for the connections that match this rule; here, it allows those connections.
	- `protocol=TCP` specifies the protocol type that the rule applies to.
	- `localport=2222` specifies the local port number that the rule applies to.

## Connecting to WSL via SSH

### From Local Area Network (LAN)

Run following command in the terminal on a different device within the LAN to verify connectivity:
```shell
ssh <wsl_username>@<windows_ip> -p <windows_protproxy_listenport>
```

You will see a successful content message after running the command, indicating that port forwarding has been set up successfully! 🥳🥳🥳

### From Wide Area Network (WAN)

To connect to a device within a local network form a WAN, you my need to configure port forwarding on the router. The route services as the gateway between the internal an external networks.

Run the following SSH command in the terminal from a device on a different network to verify connectivity:
```shell
ssh <wsl_username>@<public_wan_ip> -p <external_ssh_port>
```

Explanation:
	- `<public_wan_ip>`: The public WAN IP address of your network.
	- `<external_ssh_port>`: The external port number designated for SSH in your router’s port forwarding settings.

## Summary

The content above covered the steps and some explanations. Now let's briefly go over all the action steps for quick guidance.

### Step 1: Reinstalling SSH on WSL 2

Remove SSH: 
```shell
sudo apt remove openssh-server
```

Install SSH:
```shell
sudo apt install openssh-server
```

### Step 2: Configuring SSH on WSL 2

Edit SSH config:
```shell
sudo vi /etc/ssh/sshd_config, enable Port 22 and PasswordAuthentication yes
```

Restart SSH:
```shell
sudo service ssh restart
```

### Step 3: Configuring Port Forwarding on Windows

Run in PowerShell:
```powershell
netsh interface portproxy add v4tov4 `
  listenaddress=<windows_host_ip> `
  listenport=<your_windows_listen_port_number> ` # Any unused port number
  connectaddress=<wsl_internal_ip> `
  connectport=<ssh_service_port_number>
```

### Step 4: Enabling Inbound Rule on Windows Firewall

Execute in PowerShell:

```powershell
netsh advfirewall firewall add rule `
name="<any_name>" `
dir=in `
action=allow `
protocol=TCP `
localport=<your_windows_listen_port_number>
```

### Step 5: Configuring Port Forwarding on Router (For WAN)

Forward external port to `<your_listen_port>` on your Windows machine’s IP.

### Step 6: Verifying SSH to WSL

Verifying on a Local Area Network
```shell
ssh <wsl_username>@<windows_ip> -p <listen_port_on_windows_ssh_proxy_setting>
```

Verifying on a Wide Area Network
```shell
ssh <wsl_username>@<public_wan_ip> -p <external_ssh_port_on_router_settings>
```