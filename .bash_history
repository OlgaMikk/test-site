sudo apt -y install nginx
sudo systemctl status nginx
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT
sudo iptables-save
sudo iptables -A INPUT -p tcp--dport 443 -j ACCEPT
sudo iptables-save
sudo mkdir -p /var/www/lennar.ru/html
sudo chown -R www-data:www-data /var/www/lennar.ru/html
sudo chmod 755 /var/www/lennar.ru
sudo nano /var/www/lennar.ru/html/index.html
cp /etc/nginx/sites-available/default /etc/nginx/sites-available/lennar.ru
sudo nano /etc/nginx/sites-available/lennar.ru
sudo In -s /etc/nginx/sites-available/lennar.ru /etc/nginx/sites-enabled/lennar.ru
sudo nano /etc/nginx/nginx.conf
sudo nginx -t
sudo systemctl restart nginx
sudo mkdir -p /var/www/lennar.ru/html
sudo chown -R www-data:www-data /var/www/lennar.ru/html
sudo chmod 755 /var/www/lennar.ru
sudo nano /var/www/lennar.ru/html/index.html
sudo cp /etc/nginx/sites-available/default /etc/nginx/sites-available/lennar.ru
sudo nano /etc/nginx/sites-available/lennar.ru
sudo In -s /etc/nginx/sites-available/lennar.ru /etc/nginx/sites-enabled/lennar.ru
sudo ln -s /etc/nginx/sites-available/lennar.ru /etc/nginx/sites-enabled/lennar.ru
sudo nano /etc/nginx/nginx.conf
sudo nginx -t
sudo systemctl restart nginx
sudo apt update
apt list --upgradable
sudo apt install vsftpd
sudo systemctl status vsftpd
sudo systemctl enable vsftpd
sudo cp /etc/vsftpd.conf /etc/vsftpd.conf.original
sudo nano /etc/vsftpd.conf
sudo systemctl restart vsftpd
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/vsftpd.pem - out /etc/ssl/private/vsftpd.pem
help
sudo nano /tec/vsftpd.conf
sudo nano /etc/vsftpd.conf
sudo systemctl restart vsftpd
sudo nano /etc/vsftpd.userlist
sudo useradd -m user
sudo passwd lennaradmin
sudo useradd -m lennaradmin
sudo passwd lennaradmin
echo "user" | sudo tee -a /etc/vsftpd.userlist
sudo ufw allow 20/tcp
sudo ufw allow 21/tcp
sudo ufw allow OpenSSH
sudo ufw allow 990/tcp
sudo ufw allow 40000:50000/tcp
sudo ufw disable
sudo ufw enable
sudo ufw status
sudo ufw allow ftp
sudo ufw statuss
sudo ufw status
sudo systemctl status nginx
sudo iptablea -A INPUT -p tcp --dport 443 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT
SUDO IPTABLES-SAVE
sudo iptables-save
sudo apt -y install nginx
sudo systemctl status nginx
QUIT
sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT
sudo iptables-save
sudo pro status
sudo nginx -t
sudo systemctl restart nginx
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT
sudo iptables-save
sudo nano /etc/nginx/sites-available/lennar.ru
sudo apt update
sudo apt install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
sudo apt update
apt-cache policy docker-ce
sudo apt install docker-ce
sudo systemctl status docker
ip a
sudo nano /lib/systemd/system/docker.service
docker-compose up
docker compose-up
docker --help
docker COMMAND --help
sudo systemctl daemon-reload
sudo usermod -a -G dicker user
sudo usermod -a -G docker user
sudo usermod -a -G docker lennaradmin
su - lennaradmin
docker run
sudo nano /etc/nginx/sites-available/lennar.ru
sudo nano /etc/nginx/sites-available/lenner.ru
sudo nano /etc/nginx/sites-available/lennar.ru
sudo systemctl restart nginx
sudo nginx -t
sudo nano /etc/nginx/sites-available/lennar.ru
sudo systemctl restart nginx
sudo nginx -t
sudo nano /etc/nginx/sites-available/lennar.ru
sudo systemctl restart nginx
sudo nginx -t
sudo nano /etc/nginx/sites-available/lennar.ru
sudo systemctl restart nginx
sudo nano /etc/nginx/sites-available/lennar.ru
sudo systemctl restart nginx
sudo nano /etc/nginx/sites-available/lennar.ru
sudo systemctl restart nginx
sudo In -s /etc/nginx/sites-available/lennar.ru /etc/nginx/sites-enabled/lennar.ru
sudo ln -s /etc/nginx/sites-available/lennar.ru /etc/nginx/sites-enabled/lennar.ru
sudo nano /etc/nginx/nginx.conf
sudo nginx -t
sudo systemctl restart nginx
sudo nano /etc/nginx/sites-available/lennar.ru
sudo systemctl restart nginx
systemctl status nginx.service
sudo systemctl restart nginx
sudo systemctl start nginx
sudo nano /etc/nginx/sites-available/lennar.ru
sudo systemctl restart nginx
sudo mkdir -p /var/lennar.ru/html
sudo -R www-data:www-data /var/www/lennar.ru/html
sudo nano /var/www/lennar.ru/html/index.html
docker
sudo apt install docker-ce
sudo systemctl status docker
docker build
build
docker run
docker pull
sudo apt-get remove apache2 && sudo rm -rf /etc/apache2/
sudo nano /var/www/lennar.ru/html/index.html
sudo apt-get update
sudo apt-get install/
sudo apt-get installca-certificatescurlgnupglsb-release
docker pull node:18-alpine
docker run node:18-alpine
docker pull puthon:3.10.6-slim-buster
docker pull python:3.10.6-slim-buster
docker run
docker run -it --rm node:18-alpine sh
build stage
build
docker
docker start
#build
docker --version
docker run -d -p 80:80 nginx
docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=Ro9uxLwJBKRn5Sdj
version: '3'
services:
nginx^
image:nginx
docker compose
docker --file stringArray
sudo apt update
sudo apt install nginx
sudo ufw app list
sudo auf allow "Nginx HTTP"
sudo allow "Nginx HTTP"
sudo ufw  allow "Nginx HTTP"
sudo apt install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch-amd64] https://download.docker.com/linux/ubuntu focal stable"
sudo apt update
sudo apt install docker-ce
sudo systemctl status docker
sudo docker network create MyNetwork
sudo docker pull ghost
sudo docker run -dit --name site.lennar.ru --network MyNetwok ghost
sudo docker run -dit --name lennar.ru --network MyNetwok ghost
sudo docker run -dit --name lennar.ru
docker inspect lennr.ru | grep IPAddress
docker inspect lennar.ru | grep IPAddress
systemctl enable --now nginx
sudo systemctl status docker
uit
vim /etc/nginx/conf.d/lennar.ru.conf
docker
docker pull node:18-alpine
docker pull python:3.10.6-slaim-buster
docker pull python:3.10.6-slim-buster
docker run node:18-alpine
docker run pyton:3.10.6-slim-buster
docker run python:3.10.6-slim-buster
docker run -d -p 8080:80 node:18-alpine
docker run -d -p 8080:80 python:3.10.6-slim-buster
docker create --name my-node-container -p 3000:3000 node:18-alpine
docker start my-node-container
docker ps -a
docker-compose up -d
docker version
docker compose --version
sudo apt-get update
sudo apt-get install docker-compose
docker compose --version
sudo snap install docker-compose
docker-compose up
docker-compose up docker-compose.yml
docker compose up
docker-compose -f /path/to/c/Lennar
docker images
docker run
docker pull node:18-alpine
sudo systemctl status docker
sudo apt update
sudo apt install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add - 
sudo add-apt-repository "deb [arch+amd64] https://download.docker.com/linux/ubuntu bionic stable"
sudo apt update
apt-cache policy docker-ce
sudo apt install docker-ce
sudo systemctl status docker
sudo apt install docker-ce
sudo systemctl status docker
apt-cache policy docker-ce
sudo apt install docker-ce
sudo systemctl status docker
sudo systemctl start docker
systemctl status docker.service
sudo apt install nodejs
sudo apt install npmmm
sudo apt instaall npm
sudo apt install npm
nodejs -v
npm -v
sudo apt-get install nginx
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT
sudo iptables-save
sudo systemctl status docker
sudo apt installlll docker-ce
sudo apt install docker-ce
sudo systemctl status docker
sudo apt update
sudo apt install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add-
sudo add-apt-repository "deb [arch-amd64] https://download.docker.com/linux/ubuntu bionic stable"
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
sudo apt update
apt-cache policy docker-ce
sudo apt install docker-ce
sudo systemctl status docker
sudo apt install docker-ce
docker restart
docker restart --help
sudo systemctl status docker
sudo systemcti  status docker
sudo journalctl -u docker
sudo apt-get update
sudo apt-get upgrade
sudo systemctl status nginx
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT
sudo iptables-save
sudo mkdir -p /var/www/lennar.ru
sudo mkdir -p /var/www/lennar.ru/html
sudo chown -R www-data:www-data /var/www/lennar.ru/html
sudo chmod 755 /var/www/lennar.ru
sudo nano /var/www/lennar.ru/html/index.html
sudo cp /etc/nginx/sites-available/default /etc/nginx/sites-available/lennar.ru
sudo nano /etc/nginx/sites-available/lennar.ru
sudo ln -s /etc/nginx/sites-available/lennar.ru /etc/nginx/sites-enabled/lennar.ru
sudo nano /etc/nginx/nginx.conf
sudo nginx -t
sudo restart nginx
sudo systemctl restart nginx
sudo apt update
sudo apt install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
sudo apt update
apt-cache policy docker-ce
sudo apt install docker-ce
sudo systemctl status docker
sudo docker --debug
sudo systemctl status docker
