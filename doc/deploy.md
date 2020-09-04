# 部署

## Docker 手动部署流程

> 见 Dockerfile 文件

```bash
# 构建应用镜像
docker build -t meituan-server-node .

# 拉取 MongoDB 镜像
docker pull mongo

# 创建网络
docker network create mongo-network

# 运行 MongoDB 服务，并绑定网络
docker run -d \
  --network mongo-network \
  --network-alias mongo \
  -v mongo-data-db:/var/lib/mongo/data/db \
  mongo

# 运行应用服务，并绑定网络
docker run -d \
  -p 4000:4000 \
  --network mongo-network \
  -e MONGO_HOST=mongo \
  -e MONGO_PORT=27017 \
  meituan-server-node
```

## Docker Compose 自动化部署

Docker 手动部署流程较为繁琐，而且命令参数过多，极易写错，所以推荐使用 Docker Compose 进行自动化部署：

> 见 docker-compose.yml 文件

```
docker-compose up -d --build
```
