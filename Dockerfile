FROM node:latest

# 设置工作目录
WORKDIR /usr/src/app

# 拷贝 package.json 和 package-lock.json 到工作目录
COPY package*.json ./

# 安装依赖
RUN npm install

# 拷贝应用程序代码到工作目录
COPY . .

EXPOSE 4399

# 启动应用程序
CMD ["npm", "run", "dev", "--host"]
