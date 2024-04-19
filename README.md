# SE24Frontend

本项目为BUAA-2024春季软件工程团队大作业的前端仓库

**所有人从dev分支执行如下命令来添加自己的功能：**

```
git checkout dev     // 进入dev分支
git pull             // 拉取最新
git checkout -b feature/my_name    // 基于dev分支创建属于自己任务的分支

```

**任务提交，合并到dev分支：**
```
git checkout dev
git pull       // 拉取最新的 dev 


git add .
git commit -m "自己的注释【要按格式写】"

git checkout 自己的分支
git rebase dev    // rebase 当前分支到 dev，并且解决 rebase 带来的问题

git push     // rebase 完成后，将当前分支推到远端（TA注：请考虑一下这个推送的操作要在什么条件下进行）
```
在 GitHub 上发起一个到 dev 的 Pull Request，及时合并，防止更多冲突。











