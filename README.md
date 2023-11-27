<p>Para criar o banco de dados</p>
<br>
<p>1. Execute a seguinte query no PostgreSQL como administrador</p>
<p>CREATE USER biblioteca WITH PASSWORD '1234';</p>
<p>CREATE DATABASE biblioteca WITH OWNER='biblioteca';</p>
<br>
<p>2. git clone https://github.com/kauan345developer/Biblioteca-virtual.git</p>
<p>3. cd ./Biblioteca-virtual/biblioteca-server</p>
<p>4. npm run createdb</p>
<br><br>
<p>Para rodar o banco de dados</p>
<p>1. cd ./biblioteca-server</p>
<p>2. npm run main</p>
