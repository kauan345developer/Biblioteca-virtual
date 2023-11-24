<p>Para criar o banco de dados</p>
<br>
<p>1. Execute a seguinte query no PostgreSQL como administrador</p>\
<p>CREATE USER biblioteca WITH PASSWORD '1234';</p>
<p>CREATE DATABASE biblioteca WITH OWNER='biblioteca';</p>
<br>
<p>2. git clone https://github.com/kauan345developer/Biblioteca-virtual.git</p>
<br>
<p>3. cd ./Biblioteca-virtual/biblioteca-server</p>
<br>
<p>4. npm run createdb</p>